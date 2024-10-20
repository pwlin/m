/*
The MIT License (MIT)

Copyright (c) 2023 pwlin/MReader contributors - pwlin05@gmail.com

https://github.com/pwlin/m/

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
 * Controller class to handle user interactions for the MReader application.
 */
import { config } from './config.js';
import { feeds } from './feeds.js';
import { model } from './model.js';
import { router } from './router.js';
import { view } from './view.js';

class Controller {
    /**
     * Creates an instance of Controller.
     */
    constructor() {
        this.currentFeed = null;
        this.initialSidebarSet = false;
        this.mode = 'DEV';
    }

    /**
     * Initializes the controller by loading the configuration and feeds,
     * setting up event listeners, and updating the document title.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    async init() {
        await config.loadConfig(this.mode); // Load configuration
        await feeds.loadFeeds(this.mode); // Load feeds

        this.toggleFeedsButton(); // Setup the toggle button for the feeds

        // Setup routes
        const routes = [
            {path: '/', callback: this.handleHomeRoute.bind(this)},
            {path: '/about', callback: this.handleAboutRoute.bind(this)},
            {path: '/feeds/:feedSlug', callback: this.handleFeedRoute.bind(this)}
        ];

        router.addRoutes(routes); // Add routes to the router
        router.add404NotFound(this.handleNotFoundRoute.bind(this)); // Add 404 route

        // Handle the initial route
        router._handleRoute();
    }

    /**
     * Handles the home route.
     * @returns {void}
     */
    handleHomeRoute() {
        this.initialSidebarSet = false;
        const categories = Object.keys(feeds.getFeeds());
        const feed = feeds.getFeeds()[categories[0]][0];
        window.location.hash = `#/feeds/${feed.feedSlug}`; // Redirect to the first feed
    }

    /**
     * Handles the about route by rendering the about page.
     * @returns {void}
     */
    handleAboutRoute() {
        view.renderAboutPage();
    }

    /**
     * Sets the sidebar based on the current feed slug.
     * @param {string} slug - The slug of the feed.
     * @returns {boolean} - Returns true when the sidebar is set.
     */
    setSidebar(slug) {
        const categories = Object.keys(feeds.getFeeds());
        this.currentFeed = feeds.getFeedBySlug(slug) || feeds.getFeeds()[categories[0]][0];
        if (this.initialSidebarSet === true) {
            this.setSidebarCommon();
            return true;
        }
        this.initialSidebarSet = true;
        view.renderCategories(feeds.getFeeds()); // Render categories in the sidebar
        view.categorySelect.addEventListener('change', (e) => this.handleCategoryChange(e)); // Setup event listener for category change
        view.renderFeeds(feeds.getFeeds()[this.currentFeed.feedCategory]); // Render feeds of the selected category
        this.setSidebarCommon();
        window.addEventListener('resize', () => {
            if (view.sideBarContainer.style.display === 'none') {
                view.sideBarContainer.removeAttribute('style');
            }
        }, false);

        return true;
    }

    /**
     * Common function to set sidebar elements.
     * @returns {void}
     */
    setSidebarCommon() {
        view.categorySelect.value = this.currentFeed.feedCategory; // Set the selected category
        this.updateSelectedFeed(); // Update the selected feed
        this.updateDocumentTitle(); // Update the document title
    }

    /**
     * Handles the feed route by fetching and rendering the feed content based on the slug.
     * @param {string} slug - The slug of the feed.
     * @returns {Promise<void>} A promise that resolves when the feed content is fetched and rendered.
     */
    async handleFeedRoute(slug) {
        this.setSidebar(slug); // Set the sidebar for the feed
        view.setLoadingState(this.currentFeed.feedName); // Show loading state with feed name
        const content = await model.fetchFeed(this.currentFeed); // Fetch feed content
        view.renderFeedContent(this.currentFeed, content); // Render feed content
        if (config.get('redirlinks_enabled') === true && this.currentFeed.linksNeedRedirect === true) {
            await this.getRedirLinks(); // Fetch and render redirected links if needed
        }
    }

    /**
     * Fetches and updates redirected links for feed items.
     * @returns {Promise<void>} A promise that resolves when redirected links are updated.
     */
    async getRedirLinks() {
        const linkItems = view.mainContent.querySelectorAll('.linkItem');
        linkItems.forEach(async(item) => {
            const originalUrl = item.querySelector('a').getAttribute('href');
            let redirUrls = localStorage.getItem('MReader-redirUrls');
            redirUrls = redirUrls ? JSON.parse(redirUrls) : {};
            if (redirUrls[originalUrl]) {
                item.querySelector('a').href = redirUrls[originalUrl].finalUrl;
                item.querySelector('.domainName').innerHTML = `[${redirUrls[originalUrl].domainName}]`;
            } else {
                const revRedirServer = `${config.get('api_url')}${config.get('revredir_endpoint').replace('__URL__', encodeURIComponent(originalUrl)).replace('__API_KEY__', config.get('api_key'))}`;
                const response = await fetch(revRedirServer);
                const content = await response.json();
                this.parseRedirLink(item, content, originalUrl);
            }
        });
    }

    /**
     * Parses and updates a single redirected link.
     * @param {HTMLElement} item - The feed item element.
     * @param {Object} content - The content object containing the final URL.
     * @param {string} originalUrl - The original URL of the feed item.
     * @returns {void}
     */
    parseRedirLink(item, content, originalUrl) {
        const domainName = content.finalUrl.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
        item.querySelector('a').href = content.finalUrl;
        item.querySelector('.domainName').innerHTML = `[${domainName}]`;
        let redirUrls = localStorage.getItem('MReader-redirUrls');
        redirUrls = redirUrls ? JSON.parse(redirUrls) : {};
        redirUrls[originalUrl] = {
            //'originalUrl': originalUrl,
            'finalUrl': content.finalUrl,
            'domainName': domainName
        };
        localStorage.setItem('MReader-redirUrls', JSON.stringify(redirUrls));
    }

    /**
     * Handles the not found route by rendering the 404 page.
     * @param {string} requestedUrl - The URL that was not found.
     * @returns {void}
     */
    handleNotFoundRoute(requestedUrl) {
        view.renderNotFoundPage(requestedUrl);
    }

    /**
     * Updates the document title based on the configuration.
     * @returns {void}
     */
    updateDocumentTitle() {
        const siteName = config.get('site_name');
        const feedName = this.currentFeed.feedName;
        document.title = `${siteName} - ${feedName}`; // Set the document title
    }

    /**
     * Handles the category change event by rendering the feeds for the selected category.
     * Automatically selects the first feed from the selected category.
     * @param {Event} event - The change event.
     * @returns {void}
     */
    handleCategoryChange(event) {
        const category = event.target.value;
        view.renderFeeds(feeds.getFeeds()[category]); // Render feeds for the selected category
        this.updateSelectedFeed(); // Update the selected feed
    }

    /**
     * Updates the selected feed item in the sidebar.
     * Adds "selected" class to the clicked feed item and removes it from any other.
     * @returns {void}
     */
    updateSelectedFeed() {
        let feedElement = view.feedList.querySelector(`a[href="#/feeds/${this.currentFeed.feedSlug}"]`);
        const selectedItem = feedElement ? feedElement : null;
        //console.log('sel', selectedItem);
        const feedItems = view.feedList.querySelectorAll('li a');
        feedItems.forEach(item => {
            item.classList.remove('selected');
            item.classList.add('regular');
        });
        if (selectedItem) {
            selectedItem.classList.remove('regular');
            selectedItem.classList.add('selected'); // Mark the clicked feed as selected
        }
    }

    /**
     * Toggles the visibility of the feeds button.
     * @returns {void}
     */
    toggleFeedsButton() {
        document.querySelector('a.feeds-link').addEventListener('click', (e) => {
            e.preventDefault();
            if (view.sideBarContainer.style.display === 'inline') {
                view.sideBarContainer.style.display = 'none';
            } else {
                view.sideBarContainer.style.display = 'inline';
            }
        });
    }
}

const controller = new Controller();
controller.init(); // Initialize the controller

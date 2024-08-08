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
 * Class representing the view for the MReader application.
 * Handles all DOM manipulations.
 */
class View {
    /**
     * Creates an instance of View.
     */
    constructor() {
        this.categorySelect = document.getElementById('categorySelect');
        this.sideBarContainer = document.getElementById('sidebar');
        this.feedList = document.getElementById('feedList');
        this.mainContent = document.getElementById('mainContent');
    }

    /**
     * Renders the feed categories in the dropdown menu.
     * @param {Object} categories - The categories object containing feed categories.
     * @returns {void}
     */
    renderCategories(categories) {
        this.categorySelect.innerHTML = ''; // Clear existing options
        for (const category in categories) {
            if (Object.prototype.hasOwnProperty.call(categories, category)) {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                this.categorySelect.appendChild(option); // Add new option to the dropdown
            }
        }
    }

    /**
     * Renders the feeds in the sidebar.
     * Only feeds with enabled set to true or not set are rendered.
     * @param {Array} feeds - The array of feeds to render.
     * @returns {void}
     */
    renderFeeds(feeds) {
        this.feedList.innerHTML = ''; // Clear existing feeds
        feeds.forEach(feed => {
            // Only render feeds that are enabled
            if (feed.enabled !== false) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#/feeds/${feed.feedSlug}`;
                a.textContent = feed.feedName;
                if (feed.feedFavIcon) {
                    // Set favicon as background if available
                    a.style = `background-image:url('${feed.feedFavIcon}');background-repeat:no-repeat;background-size:16px 16px;`;
                } else {
                    a.classList.add('noIcon'); // Add class if no icon available
                }
                li.appendChild(a);
                this.feedList.appendChild(li); // Add feed to the list
            }
        });
    }

    /**
     * Sets the main content area to display a loading message.
     * @param {string} feedName - The name of the feed being fetched.
     * @returns {void}
     */
    setLoadingState(feedName) {
        this.mainContent.removeAttribute('style'); // Reset main content styles
        this.mainContent.innerHTML = `<ul class="items"><li>Loading ${feedName} ...</li></ul>`;
        this.stretchMainContent(); // Adjust the height if necessary
    }

    /**
     * Renders the feed content in the main content area.
     * @param {Object} feed - The feed object containing feed metadata.
     * @param {Array<Object>} content - An array of normalized feed entries.
     * @returns {void}
     */
    renderFeedContent(feed, content) {
        this.emptyMainContent(); // Clear the main content area
        const feedItems = document.createElement('ul');
        feedItems.setAttribute('class', 'items');
        const feedItemHeader = document.createElement('li');
        if (content.length === 0) {
            // Show message if no items are found
            feedItemHeader.innerHTML = `No items found for <a class="feedWebUrl" rel="noreferrer noopener nofollow" target="_blank" href="${feed.webUrl}">${feed.feedName}</a> or the feed is invalid. Please try again later.`;
        } else {
            // Show header with the feed name and link to the website
            feedItemHeader.innerHTML = `Latest Entries In <a class="feedWebUrl" rel="noreferrer noopener nofollow" target="_blank" href="${feed.webUrl}">${feed.feedName}</a>:`;
        }
        feedItems.appendChild(feedItemHeader);
        content.forEach(item => {
            const feedItem = document.createElement('li');
            feedItem.setAttribute('class', 'linkItem');
            let feedItemContent = '';
            feedItemContent += `<a rel="noreferrer noopener nofollow" target="_blank" href="${item.link}">&#187; ${item.title}`;
            if (item.domain_name !== '') {
                feedItemContent += `<span class="domainName">[${item.domain_name}]</span>`;
            }
            feedItemContent += `</a><span class="extraContent">${item.extraContent}</span></li>`;
            feedItem.innerHTML = feedItemContent;
            feedItems.appendChild(feedItem);
        });
        this.mainContent.appendChild(feedItems);
        this.stretchMainContent(); // Adjust the height if necessary
    }

    /**
     * Adjusts the main content height to match the sidebar height if needed.
     * @returns {void}
     */
    stretchMainContent() {
        if (this.mainContent.offsetHeight < this.sideBarContainer.offsetHeight) {
            this.mainContent.style.height = this.sideBarContainer.offsetHeight + 'px';
        }
    }

    /**
     * Clears the main content area.
     * @returns {void}
     */
    emptyMainContent() {
        this.mainContent.removeAttribute('style'); // Reset main content styles
        this.mainContent.innerHTML = ''; // Clear main content
    }

    /**
     * Renders the 404 not found page in the main content area.
     * @param {string} requestedUrl - The URL that was not found.
     * @returns {void}
     */
    renderNotFoundPage(requestedUrl) {
        console.log(`${requestedUrl} not found.`);
        this.mainContent.innerHTML = '<ul class="items"><li><p>404 Not Found</p></li></ul>';
    }

    /**
     * Renders the about page in the main content area.
     * @returns {void}
     */
    renderAboutPage() {
        console.log('from view: about page');
        this.mainContent.innerHTML = ''
            + '<ul class="items">'
            + '<li>'
            + '<p>About MReader</p>'
            + '<p>This is a simple feed reader with the help of <a target="_blank" href="#">XML2JSON REST API</a>.</p>'
            + '<p>The complete source code of this app is <a target="_blank" href="#">hosted on GitHub</a>.</p>'
            + '</li>'
            + '</ul>';
    }
}

export const view = new View();

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
/* eslint-disable no-magic-numbers */
/**
 * Class representing the feeds for the MReader application.
 */

import {config} from './config';
import utils from './utils';

class Feeds {
    constructor() {
        this.feeds = null;
    }

    /**
     * Loads the feeds from the appropriate feeds.json file based on the application mode.
     * @param {string} mode - The mode of the application ('DEV' or 'PROD').
     * @returns {Promise<void>} A promise that resolves when the feeds are loaded.
     */
    async loadFeeds(mode) {
        let feedsUrl = './feeds.json'; // Default URL for feeds
        let feedsResponse = false; // Variable to hold the response from the first request

        if (mode === 'DEV') {
            try {
                // Attempt to load feeds.json
                const response = await fetch(`${feedsUrl}?${utils.ts()}`);
                if (response.status !== 200) {
                    throw new Error('feeds.json not found'); // Error if status is not 200
                }
                // Parse and store the response if successful
                feedsResponse = await response.json();
            } catch {
                // If feeds.json not found, load feeds.example.json and log a warning
                console.warn('feeds.json not found. Loading feeds.example.json. Please rename feeds.example.json to feeds.json and configure it.');
                feedsUrl = './feeds.example.json'; // Update URL to example feeds
            }
        } else if (mode === 'PROD') {
            // In PROD mode, directly try to fetch feeds.json
            const response = await fetch(`${feedsUrl}?${utils.ts()}`);
            if (response.status !== 200) {
                // Show an alert if feeds.json is not found and throw an error
                alert('feeds.json not found. Please create and configure a feeds.json file based on feeds.example.json.');
                throw new Error('feeds.json not found');
            }
            // Parse and store the response if successful
            feedsResponse = await response.json();
        }

        if (feedsResponse) {
            // Use the parsed response if available
            this.feeds = this.normalizeFeeds(feedsResponse);
        } else {
            try {
                // If the first response was unsuccessful, try loading the feeds from the updated URL
                const response = await fetch(`${feedsUrl}?${utils.ts()}`);
                if (response.status !== 200) {
                    throw new Error('Failed to load feeds'); // Error if status is not 200
                }
                // Parse and store the response if successful
                //this.feeds = await response.json();
                feedsResponse = await response.json();
                this.feeds = this.normalizeFeeds(feedsResponse);
            } catch (error) {
                // Log an error if the second fetch also fails
                console.error('Error loading feeds:', error);
            }
        }

        //console.log('this.feeds', this.feeds);
    }

    /**
     * Gets the feeds object.
     * @returns {Object} The feeds object containing all feed categories and their feeds.
     */
    getFeeds() {
        return this.feeds; // Return the feeds object
    }

    /**
     * Gets a feed object by its URL.
     * @param {string} feedUrl - The URL of the feed.
     * @returns {Object|null} The feed object if found, otherwise null.
     */
    getFeedByUrl(feedUrl) {
        for (const category in this.feeds) {
            if (Object.prototype.hasOwnProperty.call(this.feeds, category)) {
                const feed = this.feeds[category].find(fd => fd.feedUrl === feedUrl);
                if (feed) {
                    return feed;
                }
            }
        }
        return null; // Return null if the feed is not found
    }

    /**
     * Gets a feed object by its Slug.
     * @param {string} feedSlug - The slug of the feed.
     * @returns {Object|null} The feed object if found, otherwise null.
     */
    getFeedBySlug(feedSlug) {
        for (const category in this.feeds) {
            if (Object.prototype.hasOwnProperty.call(this.feeds, category)) {
                const feed = this.feeds[category].find(fd => fd.feedSlug === feedSlug);
                if (feed) {
                    return feed;
                }
            }
        }
        return null; // Return null if the feed is not found
    }

    normalizeFeeds(data) {
        /*for (const category in feeds) {
            if (Object.prototype.hasOwnProperty.call(feeds, category)) {
                feeds[category] = feeds[category].map(feed => ({
                    ...feed,
                    // Add feed slug
                    feedSlug: feed.feedSlug || this.createFeedSlug(feed.feedName)
                }));
            }
        }
        return feeds;
        */
        return Object.fromEntries(
            Object.entries(data).map(([key, feeds]) => [
                key,
                feeds
                    .filter(feed => feed.enabled !== false) // Filter out disabled feeds
                    .map(feed => ({
                        ...feed,
                        feedSlug: feed.feedSlug || utils.generateSlug(feed.feedName), // Add feedSlug
                        feedCategory: key, // Add feedCategory
                        feedFavIcon: (() => {
                            if (config.get('favicons_enabled') !== true) {
                                return false;
                            }
                            if (typeof feed.feedFavIcon === 'undefined') {
                                return `${config.get('api_url')}${config.get('favicon_endpoint').replace('__URL__', encodeURIComponent(feed.feedUrl)).replace('__API_KEY__', config.get('api_key'))}`;
                            }
                            return feed.feedFavIcon;

                        })()
                        //feedFavIcon: feed.feedFavIcon || `${config.get('api_url')}${config.get('favicon_endpoint').replace('__URL__', encodeURIComponent(feed.feedUrl)).replace('__API_KEY__', config.get('api_key'))}`
                    }))
            ])
        );
    }
}

export const feeds = new Feeds();
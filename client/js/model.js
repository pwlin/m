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

import {config} from './config.js';
import FeedNormalizer from './feedNormalizer.js';
import utils from './utils.js';

/**
 * Model class to handle data fetching and processing for the MReader application.
 */
class Model {

    /**
     * Fetches the feed data from the given URL.
     * @param {Object} feed - The feed object containing feed metadata.
     * @returns {Promise<Array>} A promise that resolves to the normalized feed data.
     */
    async fetchFeed(feed) {
        const apiKey = config.get('api_key');
        const serviceUrl = `${config.get('api_url')}${config.get('xml2json_endpoint').replace('__URL__', encodeURIComponent(feed.feedUrl)).replace('__TS__', utils.ts())}`;
        const response = await fetch(serviceUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const content = await response.json();

        // Normalize the general structure of the feed entries
        let items = FeedNormalizer.normalizeFeedEntries(content[0]);

        // Further normalize the feed entries based on the specific feed
        items = FeedNormalizer.normalizeFeedContentPerFeed(feed, items);

        return items;
    }
}

export const model = new Model();



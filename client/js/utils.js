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
 * Utility class providing various helper functions.
 */
class Utils {

    /**
     * Get the current timestamp in milliseconds.
     * @returns {string} The current timestamp.
     */
    static ts() {
        // Get current timestamp as a string
        return `${new Date().valueOf()}`;
    }

    /**
     * Generate a URL-friendly slug from a feed name.
     * @param {string} feedName - The name of the feed.
     * @returns {string} The generated slug.
     */
    static generateSlug(feedName) {
        // Convert to lowercase, replace non-alphanumeric characters with hyphens,
        // and remove leading/trailing hyphens
        return feedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    /**
     * Convert an array to an object with alternating keys and values.
     * @param {Array} arr - The array to convert.
     * @returns {Object} The resulting object.
     */
    static arrayToObject(arr) {
        const obj = {};
        // Iterate over the array in steps of 2 to extract key-value pairs
        for (let i = 0; i < arr.length; i += 2) {
            const key = arr[i];
            const value = arr[i + 1] || null; // Default to null if value is undefined
            obj[key] = value;
        }
        return obj;
    }

}

export default Utils;

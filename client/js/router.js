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
import utils from './utils';

/**
 * Router class to handle client-side routing.
 */
class Router {
    /**
     * Creates an instance of Router.
     * @param {Array} routes - Initial set of routes.
     */
    constructor(routes = []) {
        this.routes = []; // Store routes and their callbacks
        this.notFoundCallback = null; // Store 404 callback

        // Register initial routes
        routes.forEach(route => this.addRoute(route.path, route.callback));

        // Listen to hash change events
        window.addEventListener('hashchange', this._handleRoute.bind(this));
    }

    /**
     * Register a route and its callback.
     * @param {string} path - The path pattern to match.
     * @param {function} callback - The callback function to execute.
     * @returns {void}
     */
    addRoute(path, callback) {
        const paramNames = [];
        // Convert path pattern to regex and extract parameter names
        const regexPath = path.replace(/:[^\s/]+/g, (match) => {
            paramNames.push(match.slice(1));
            return '([^/]+)';
        });
        this.routes.push({regex: new RegExp(`^${regexPath}$`), callback, paramNames});
    }

    /**
     * Register multiple routes.
     * @param {Array} routes - Array of route objects.
     * @returns {void}
     */
    addRoutes(routes) {
        routes.forEach(route => this.addRoute(route.path, route.callback));
    }

    /**
     * Register a 404 route and its callback.
     * @param {function} callback - The callback function to execute for 404.
     * @returns {void}
     */
    add404NotFound(callback) {
        this.notFoundCallback = callback;
    }

    /**
     * Handle the route based on the current hash.
     * @returns {void}
     */
    _handleRoute() {
        const hashPath = window.location.hash.slice(1) || '/'; // Get current hash path
        let routeFound = false;
        for (const route of this.routes) {
            const match = hashPath.match(route.regex); // Match the hash path against registered routes
            if (match) {
                const params = match.slice(1); // Extract parameters from the match
                if (route.paramNames.length > 0) {
                    route.callback(...params); // Call the route callback with params if any
                } else {
                    route.callback(utils.arrayToObject(params)); // Convert params to object and call callback
                }
                routeFound = true;
                break; // Exit loop after finding the route
            }
        }
        if (!routeFound) {
            this._handle404(hashPath); // Handle 404 if no route matched
        }
    }

    /**
     * Handle 404 - route not found.
     * @param {string} requestedUrl - The URL that was not found.
     * @returns {void}
     */
    _handle404(requestedUrl) {
        if (this.notFoundCallback) {
            this.notFoundCallback(requestedUrl); // Call the 404 callback if registered
        } else {
            console.error('Route not found: ' + requestedUrl); // Log error if no 404 callback
        }
    }
}

export const router = new Router();

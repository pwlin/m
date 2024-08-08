/* eslint-disable no-magic-numbers */
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
 * Class representing the configuration for the MReader application.
 */
import utils from './utils';

class Config {
    constructor() {
        this.config = null;
        this.defaultConfig = {
            'xml2json_endpoint': '/xml2json?url=__URL__&_t=__TS__',
            'favicon_endpoint': '/favicon?url=__URL__&api_key=__API_KEY__',
            'revredir_endpoint': '/revredir?url=__URL__&api_key=__API_KEY__'
        };
    }

    /**
     * Loads the configuration from the config.json file.
     * @param {string} mode - The mode of the application ('DEV' or 'PROD').
     * @returns {Promise<void>} A promise that resolves when the config is loaded.
     */
    async loadConfig(mode) {
        let configUrl = './config.json'; // Default URL for config
        let configResponse = false; // Variable to hold the response from the first request

        if (mode === 'DEV') {
            try {
                // Attempt to load config.json
                const response = await fetch(`${configUrl}?${utils.ts()}`);
                if (response.status !== 200) {
                    throw new Error('config.json not found'); // Error if status is not 200
                }
                // Parse and store the response if successful
                configResponse = await response.json();
            } catch {
                // If config.json not found, load config.example.json and log a warning
                console.warn('config.json not found. Loading config.example.json. Please rename config.example.json to config.json and configure it.');
                configUrl = './config.example.json'; // Update URL to example config
            }
        } else if (mode === 'PROD') {
            // In PROD mode, directly try to fetch config.json
            const response = await fetch(`${configUrl}?${utils.ts()}`);
            if (response.status !== 200) {
                // Show an alert if config.json is not found and throw an error
                alert('config.json not found. Please create and configure a config.json file based on config.example.json.');
                throw new Error('config.json not found');
            }
            // Parse and store the response if successful
            configResponse = await response.json();
        }

        if (configResponse) {
            // Use the parsed response if available
            this.config = configResponse;
        } else {
            try {
                // If the first response was unsuccessful, try loading the config from the updated URL
                const response = await fetch(`${configUrl}?${utils.ts()}`);
                if (response.status !== 200) {
                    throw new Error('Failed to load config'); // Error if status is not 200
                }
                // Parse and store the response if successful
                this.config = await response.json();
            } catch (error) {
                // Log an error if the second fetch also fails
                console.error('Error loading config:', error);
            }
        }
        this.config = Object.assign({}, this.config, this.defaultConfig);
    }

    /**
     * Gets a configuration value by key.
     * @param {string} key - The key of the configuration value.
     * @returns {*} The configuration value associated with the given key.
     */
    get(key) {
        return this.config[key];
    }
}

export const config = new Config();

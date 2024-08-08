/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* global process */
/*
The MIT License (MIT)

Copyright (c) 2023 pwlin - pwlin05@gmail.com

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
import {promises as fs} from 'fs';
import path from 'path';
import {defineConfig} from 'vite';
import {createHtmlPlugin} from 'vite-plugin-html';

/**
 * Custom plugin to copy files after build based on conditions.
 *
 * @returns {import('vite').Plugin} Vite plugin configuration
 */
function copyFilesAfterBuild() {
    return {
        name: 'copy-files-after-build',

        /**
         * Hook into the closeBundle step to copy files after build.
         */
        closeBundle: async() => {
            // Define source and destination paths
            const appDir = './client'; // Source directory where original files are located
            const distDir = './dist'; // Destination directory where files should be copied to

            // Define files to be copied with their fallback sources
            const filesToCopy = [{
                source: path.join(appDir, 'config.json'),
                fallback: path.join(appDir, 'config.example.json'),
                destination: path.join(distDir, 'config.json')
            }, {
                source: path.join(appDir, 'feeds.json'),
                fallback: path.join(appDir, 'feeds.example.json'),
                destination: path.join(distDir, 'feeds.json')
            }
            ];

            // Copy each file based on the existence of the source
            for (const file of filesToCopy) {
                try {
                    // Check if the source file exists
                    await fs.access(file.source);
                    await fs.copyFile(file.source, file.destination);
                    console.log(`Copied ${file.source} to ${file.destination}`);
                } catch {
                    // If source file does not exist, fallback to alternative file
                    if (file.fallback) {
                        await fs.copyFile(file.fallback, file.destination);
                        console.log(`Copied ${file.fallback} to ${file.destination}`);
                    }
                }
            }

            // Read the LICENSE file
            const licensePath = path.join(process.cwd(), 'LICENSE');
            let licenseContent = '';

            try {
                licenseContent = await fs.readFile(licensePath, 'utf-8');
            } catch (err) {
                console.error(`Could not read LICENSE file: ${err.message}`);
                return;
            }

            // Append LICENSE content to HTML, JS, and CSS files
            const outputFiles = await fs.readdir(distDir);
            for (const file of outputFiles) {
                const filePath = path.join(distDir, file);
                const ext = path.extname(file);

                const fileContent = await fs.readFile(filePath, 'utf-8');
                let updatedContent = '';
                // Check if the file is JS or CSS
                if (ext === '.js' || ext === '.css') {
                    updatedContent = `/*\n${licenseContent.trim()}\n*/\n${fileContent}\n`;
                } else if (ext === '.html') {
                    updatedContent = fileContent.replace('<html lang="en">', `<html lang="en">\n<!--\n${licenseContent.trim()}\n-->\n`);
                }
                if (updatedContent !== '') {
                    try {
                        await fs.writeFile(filePath, updatedContent);
                        console.log(`Appended LICENSE to ${filePath}`);
                    } catch (err) {
                        console.error(`Could not update ${filePath}: ${err.message}`);
                    }
                }
            }


        },

        // Ensure this plugin only runs in build mode
        apply: 'build'
    };
}

/**
 * Custom plugin to replace specific code during the build process.
 *
 * @param {string} mode - Current Vite mode
 * @returns {import('vite').Plugin} Vite plugin configuration
 */
function replaceModePlugin(mode) {
    return {
        name: 'replace-mode',

        /**
         * Transform code before bundling.
         *
         * @param {string} code - Source code to transform
         * @param {string} id - Identifier for the source file
         * @returns {{ code: string, map: null } | null} Transformed code and source map
         */
        transform(code, id) {
            if (mode === 'production') {
                // Replace 'this.mode = 'DEV';' with 'this.mode = 'PROD';' in the controller.js file
                if (id.endsWith('/js/controller.js')) {
                    const transformedCode = code.replace('this.mode = \'DEV\';', 'this.mode = \'PROD\';');
                    return {
                        code: transformedCode,
                        map: null
                    };
                }
            }
            return null;
        }
    };
}

/**
 * Custom middleware to force 404 on not found resources.
 *
 * @returns {import('vite').Plugin} Vite plugin configuration
 */
function force404Middleware() {
    return {
        name: 'force-404',

        /**
         * Configure the Vite server to use custom middleware.
         *
         * @param {import('vite').ViteDevServer} server - The Vite development server instance
         */
        configureServer(server) {
            server.middlewares.use(async(req, res, next) => {
                // Remove query parameters from URL
                const url = req.url.split('?')[0];

                // Proceed if URL starts with '/@' (internal Vite requests)
                if (url.startsWith('/@')) {
                    next();
                } else {
                    // Resolve the file path
                    const filePath = path.join(server.config.root, url);

                    try {
                        // Check if file exists
                        await fs.access(filePath);
                        next();
                    } catch (err) {
                        if (err.code === 'ENOENT') {
                            // If file does not exist
                            res.statusCode = 404; // Set response status to 404
                            res.end('404 Not Found'); // End the response with a 404 message
                        } else {
                            next(err); // Pass any other errors to the next middleware
                        }
                    }
                }
            });
        }
    };
}

/**
 * Vite configuration.
 *
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({
    mode
}) => {
    return {
        // Specify the base public path for assets
        base: './',

        // Specify the root directory for Vite to watch
        root: './client',

        // Build-specific configurations
        build: {
            // Custom path for the dist folder
            outDir: '../dist',

            // Empty the output directory before building
            emptyOutDir: true,

            rollupOptions: {
                output: {
                    // Ensure that all assets are placed at the root level with a hash in the filename
                    assetFileNames: '[name]-[hash][extname]',
                    chunkFileNames: '[name]-[hash].js',
                    entryFileNames: '[name]-[hash].js'
                }
            }
        },

        // Vite server configurations
        server: {
            // Prevent clearing the console screen on each build
            clearScreen: false
        },

        // Plugins to extend Vite functionality
        plugins: [
            // Apply this plugin only for the build process
            copyFilesAfterBuild(),
            replaceModePlugin(mode),
            force404Middleware(),
            createHtmlPlugin({
                minify: true // Enable HTML minification
            }), {
                name: 'log-requests',

                /**
                 * Configure the Vite server to use custom middleware.
                 *
                 * @param {import('vite').ViteDevServer} server - The Vite development server instance
                 */
                configureServer(server) {
                    // Middleware to log each incoming request
                    server.middlewares.use((req, res, next) => {
                        // Log the request method and URL if it doesn't start with '/@'
                        if (!req.url.startsWith('/@')) {
                            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
                        }
                        // Proceed to the next middleware
                        next();
                    });
                }
            }
        ]
    };
});

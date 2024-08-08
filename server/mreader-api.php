<?php
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

namespace MReader {
    class Main
    {
        public static function setConfig()
        {
            $routes = [
                [
                    'uri' => '/',
                    'func' => '\MReader\Main::index',
                    'format' => 'html',
                    'args' => [
                        'access_level_needed' => 0
                    ]
                ],
                [
                    'uri' => '/xml2json',
                    'func' => '\MReader\Controllers\Xml2Json::index',
                    'format' => 'json',
                    'args' => [
                        'url' => @$_GET['url'],
                        'api_key' => @$_GET['api_key'],
                        'access_level_needed' => 1
                    ]
                ],
                [
                    'uri' => '/revredir',
                    'func' => '\MReader\Controllers\RevRedir::index',
                    'format' => 'json',
                    'args' => [
                        'url' => @$_GET['url'],
                        'api_key' => @$_GET['api_key'],
                        'context' => @$_GET['context'],
                        'access_level_needed' => 1
                    ]
                ],
                [
                    'uri' => '/favicon',
                    'func' => '\MReader\Controllers\FavIcon::index',
                    'format' => 'png',
                    'args' => [
                        'url' => @$_GET['url'],
                        'api_key' => @$_GET['api_key'],
                        'access_level_needed' => 1
                    ]
                ]

            ];

            $routeNotFound = [
                'func' => '\Salad\API\Controllers\NotFound::index',
                'format' => 'json',
                'args' => [
                    'access_level_needed' => 0
                ]
            ];

            $apiKeys = [
                [
                    'key1' => 'dev-api-key',
                    'access_level' => 1,
                    'enabled' => true
                ]
            ];

            return [
                'routes' => $routes,
                'route_not_found' => $routeNotFound,
                'auth_api_keys_enabled' => true,
                'api_keys' => $apiKeys,
                'cache_type' => 'file',
                'cache_path' => './cache',
                'cache_ttl' => 15,
                'enable_cors_headers' => true,
                'fetch_favicons' => true,
                'mreader_enable_redirlinks' => true,
                'mreader_enable_favicons' => true,
            ];
        }

        public static function index($salad, $args)
        {
            $salad->view->content['html']['body'] = "";
            return $salad->view->content;
        }
    }
}

namespace MReader\Controllers {

    /**
     * Class Xml2Json
     * Handles the conversion of XML data to JSON format.
     */
    class Xml2Json
    {
        /**
         * Main entry point for the Xml2Json controller.
         *
         * @param object $salad The main application object containing various services.
         * @param array $args Arguments passed to the function, including access level and URL.
         * @return array The JSON representation of the XML data or an authentication failure message.
         */
        public static function index($salad, $args)
        {
            // Authenticate the user
            if (!$salad->auth->login([
                'access_level_needed' => @$args['access_level_needed'],
                'api_key' => @$args['api_key']
            ])) {
                return $salad->response->generateAuthFailedMessage();
            }

            // Get the URL from the arguments
            $url = @$args['url'];
            // Initialize a default JSON structure
            $json = json_decode('{"channel":{"item":[]}}');

            // Check if the URL is valid
            if (!empty($url) || $salad->utils->isValidUrl($url)) {
                // Create a cache key for the URL
                $cacheKey = $salad->cache->makeCacheKey($url, 'mreader/xml2json-');
                // Attempt to retrieve cached feed
                $cachedFeed = $salad->cache->get($cacheKey);
                if (!empty($cachedFeed)) {
                    // Use cached feed if available
                    $json = $cachedFeed;
                } else {
                    // Fetch the XML data from the URL
                    $simpleXml = $salad->utils->fetch($url, 'xml');
                    if (!empty($simpleXml)) {
                        // If XML data is fetched, assign it to JSON
                        $json = $simpleXml;
                    }
                    // Cache the fetched JSON data
                    $salad->cache->set($cacheKey, $json);
                }
            }

            // Return the JSON data wrapped in an array
            return [
                'array' => [
                    $json
                ]
            ];
        }
    }

    /**
     * Class RevRedir
     * Handles the redirection of URLs and fetching final URLs.
     */
    class RevRedir
    {
        /**
         * Fetches the final Google News link from the provided URL.
         *
         * @param object $salad The main application object.
         * @param string $url The original URL to fetch the final link from.
         * @return string The final URL or the original URL if not found.
         */
        private static function getGoogleNewsLink($salad, $url)
        {
            // Fetch the data from the URL
            $data = $salad->utils->fetch($url, 'text');
            // Use regex to find all anchor tags and extract href attributes
            preg_match_all('/<a[^>]+href=([\'"])(?<href>.+?)\1[^>]*>/i', $data, $result);
            if (!empty($result['href'][0])) {
                return $result['href'][0]; // Return the first found href
            }
            return $url; // Return the original URL if no href found
        }

        /**
         * Main entry point for the RevRedir controller.
         *
         * @param object $salad The main application object.
         * @param array $args Arguments passed to the function, including access level and URL.
         * @return array The original URL, final URL, and context.
         */
        public static function index($salad, $args)
        {
            // Authenticate the user
            if (!$salad->auth->login([
                'access_level_needed' => @$args['access_level_needed'],
                'api_key' => @$args['api_key']
            ])) {
                return $salad->response->generateAuthFailedMessage();
            }

            // Get the URL and context from the arguments
            $url = @$args['url'];
            $context = $salad->request->getParam('context');

            // Check if redirection links are enabled
            if ($salad->config->get('mreader_enable_redirlinks') !== true) {
                return [
                    'array' => [
                        'originalUrl' => $url,
                        'finalUrl' => $url,
                        'context' => $context
                    ]
                ];
            }
            $finalUrl = '';

            // Check if the URL is valid
            if (!empty($url) || $salad->utils->isValidUrl($url)) {
                // Create a cache key for the URL
                $cacheKey = $salad->cache->makeCacheKey($url, 'mreader/revredir-');
                // Attempt to retrieve cached URL
                $cachedUrl = $salad->cache->get($cacheKey);
                if (!empty($cachedUrl)) {
                    // Use cached URL if available
                    $finalUrl = $cachedUrl;
                } else {
                    // Determine the final URL based on the original URL
                    if (str_contains($url, 'news.google.com')) {
                        $finalUrl = self::getGoogleNewsLink($salad, $url);
                    } else {
                        // Fetch headers to find the final URL
                        $headers = @get_headers($url, 1);
                        if (is_array($headers['Location'])) {
                            $finalUrl = end($headers['Location']); // Get the last location if multiple
                        } else {
                            $finalUrl = $headers['Location']; // Get the single location
                        }
                        // Check if the final URL is relative
                        if (strpos($finalUrl, '/') === 0) {
                            if (is_array($headers['Location'])) {
                                $finalUrl2 = $headers['Location'][count($headers['Location']) - 2];
                            } else {
                                $finalUrl2 = $url;
                            }
                            // Construct the absolute URL
                            $finalUrl2 = preg_replace('/^(https?:\/\/[^\/]+)(\/[^\/]+).*$/', '$1', $finalUrl2);
                            $finalUrl = $finalUrl2 . $finalUrl;
                        }
                    }
                    // Cache the final URL
                    $salad->cache->set($cacheKey, $finalUrl, -1);
                }
            }
            // Return the original URL, final URL, and context
            return [
                'array' => [
                    'originalUrl' => $url,
                    'finalUrl' => $finalUrl,
                    'context' => $context
                ]
            ];
        }
    }

    /**
     * Class FavIcon
     * Handles fetching of favicons from URLs.
     */
    class FavIcon
    {
        /**
         * Main entry point for the FavIcon controller.
         *
         * @param object $salad The main application object.
         * @param array $args Arguments passed to the function, including access level and URL.
         * @return array The binary data of the favicon or a default favicon.
         */
        public static function index($salad, $args)
        {
            // Authenticate the user
            if (!$salad->auth->login([
                'access_level_needed' => @$args['access_level_needed'],
                'api_key' => @$args['api_key']
            ])) {
                return $salad->response->generateAuthFailedMessage();
            }
            // Set cache headers for the response
            $salad->utils->setCacheHeaders(10000);
            // Check if favicons are enabled
            if ($salad->config->get('mreader_enable_favicons') !== true) {
                // Return a default favicon if not enabled
                $defaultFavicon = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8yMC8yNKUJNogAAAAhdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDQuMOomJ3UAAAKjSURBVHicpZNNTxNhFIWfwszQTtuhZfqRIhRbG8QoGkkxRHRhDMa4YAcLF34sWOHPgYU2utQEdpi4YQ0SaDFqTFCxYtES2uK0pWXKTOu4UCZi3HnW9573ufe+x2FZFv8jAcDhcDAxMefaNYqB0WR82DSa01pZT1aqDQ+A4nXW/D5XWuoQZpfS2bWwFCzNz0/qlmXhsCyLycl5V83UuhP94ala/XA8EVND0XiXapgtJLGdWFRlcXFjbyunFRSvtLD5oZjyiP783NyELgDsGsXAhdMnpg705u1z5yO9sT4VtywxNNhD/cCgr1shHg2obzfy6tNnGU8iEeT1x51ZYLsNYDQZH67WGuP37w73xvpUAAyzxcr6F3vWkCojiu3cu3Opt1I/HB9NxocB2gCMw+b0yV5/aORi1G4wzRam2cLfKQNQ15uUKzr+ThfRE/5Qo2FO2wZaWU+OjQ2odb15bMPXr/SjuAUA3C6B06dCZHPfuXnzjKppetK+QqWqe8IBBcUt4JYleiI+eiI+uxmgvQ12S/sAhAMK1arusQkA3LIEwMjQSb7ulDHM4zRHEsV2AI5+j3B052yupESCURS3wI2rCZYyOd7/LopHA0SCMtdGYpTKDd5/KqB4nTWboMsvpxcXN/b+fGlwoJtCqUahVGNlfYvVN3kAAj4nz5+/2+vyyWnbQBSFma2cVljK5P6JDfBtp0zrByxlcuR3K4UOpzhjGyyvZ9OKV1pIPXm5fWSiuAUGB7qPEa28yvEwtbzt83QsLK9n0/YOwlKwtPmhmEr0B3n0eHn8xYt3oVu3zqqm2UKrHGAYLdKrK3vb+XLB5+1Y2NwspsJSsAT8ysKfYbo8FE8eGuYDTdOT1f2Gx7IsFK+zpnbJa7JTmFlNf850/h2m/9FP01chchV8TiUAAAAASUVORK5CYII=';
                return [
                    'bin-data' => base64_decode($defaultFavicon)
                ];
            }
            // Fetch the favicon from the specified URL
            $favicon = \Salad\API\Controllers\Posts\FavIcon::index(
                $salad,
                [
                    'url' => @$args['url'],
                    'skip_auth' => true,
                    'skip_url_check' => true
                ]
            );
            // Return the binary data of the fetched favicon
            return [
                'bin-data' => $favicon['bin-data']
            ];
        }
    }
}

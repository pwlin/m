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
 * FeedNormalizer class to handle specific feed normalization for the MReader application.
 */
class FeedNormalizer {
    /**
     * Normalizes the feed entries based on the specific feed.
     * @param {Object} feed - The feed object containing feed metadata.
     * @param {Array} items - The array of feed items to normalize.
     * @returns {Array} The normalized array of feed items.
     */
    static normalizeFeedContentPerFeed(feed, items) {
        let tmpContent = '';
        const isMobileUser = Array.isArray(navigator.userAgent.match(/Android|iPhone/i));
        switch (feed.feedName) {
        case 'HN':
            items = items.map(item => ({
                ...item,
                extraContent: item.description.replace(/<a href/ig, '<a rel="noreferrer noopener nofollow" target="_blank" href'),
                domain_name: item.link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '')
            }));
            break;
        case 'TechMeme':
            items = items.map(item => {
                let comments = item.link,
                    title = item.title.replace(/\((.*)\)$/i, ''),
                    link = item.description.match(/(https?:\/\/[^\s]+)/ig)[0].replace(/^"/, '').replace(/">(.*)$/ig, ''),
                    extraContent = '<a rel="noreferrer noopener nofollow" target="_blank" href="' + comments + '">More Sources</a>',
                    domain_name = link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
                return {
                    ...item,
                    comments: comments,
                    title: title,
                    link: link,
                    extraContent: extraContent,
                    domain_name: domain_name
                };
            });
            break;
        case 'The Register':
            items = items.map(item => ({
                ...item,
                link: item.link.replace('go.theregister.com/feed/', '')
            }));
            break;
        case 'Liliputing':
            items = items.filter(function(item) {
                if (item.title.includes('Daily Deals (')) {
                    return false;
                }
                return true;
            }).map(item => ({
                ...item
            }));
            break;
        case 'Trusted Reviews':
            /*items = items.map(item => ({
                ...item,
                link: item.link.replace(/\?(.*)$/, '')
            }));*/
            break;
        case 'TF':
            /*items = items.map(item => ({
                ...item,
                comments: String(item.comments).replace(/#respond(.*)$/, '')
            }));*/
            break;

        case 'Google News':
            /*items = items.map(item => {
                let link = String(item.link).replace(/(.*)&url=/, ''),
                    domain_name = link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
                return {
                    ...item,
                    link: link,
                    domain_name: domain_name
                };
            });*/
            break;

        case 'iFixit':
            /*items = items.map(item => ({
                ...item,
                title: String(item.title).replace(/#\w\w+\s?/g, '')
            }));*/
            break;

        case '/r/JavaScript':
        case '/r/CSS':
        case '/r/PHP':
        case '/r/WebDev':
        case '/r/Node':
        case '/r/ShutupAndTakeMyMoney':
        case '/r/Startups':
        case '/r/StartupFeedback':
        case '/r/Ubuntu':
        case '/r/Debian':
            items = items.map(item => {
                tmpContent = item.content.match(/<a[^>]*>([\s\S]*?)<\/a>/ig);
                if (tmpContent) {
                    tmpContent.forEach(content => {
                        if (content.match(/comments\]<\/a>|comment\]<\/a>/i)) {
                            item.commentLink = content.match(/href="(.*)">/i)[1].replace(/^http:\/\//, 'https://').replace(/www./, 'old.');
                            item.extraContent = `<a rel="noreferrer noopener nofollow" target="_blank" href="${item.commentLink}${isMobileUser ? '.i' : ''}">Comments</a>`;
                        }
                        if (content.match(/\[link\]<\/a>/i)) {
                            item.link = content.match(/href="(.*)">/i)[1];
                            if (item.link.startsWith('/r') || item.link.startsWith('/user/')) {
                                item.link = `https://www.reddit.com${item.link}`;
                            }
                            item.domain_name = item.link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
                            if (isMobileUser && item.domain_name.includes('reddit.com')) {
                                item.link = item.link.replace(/\/$/, '/.i');
                                item.domain_name = 'reddit.com';
                            } else if (item.domain_name.includes('reddit.com')) {
                                item.link = item.link.replace(/www./, 'old.');
                                item.domain_name = 'reddit.com';
                            }
                        }
                    });
                    if (item.domain_name === 'reddit.com' && item.link === item.commentLink) {
                        item.domain_name = '';
                        item.extraContent = '';
                    }
                } else {
                    if (isMobileUser) {
                        item.link = item.link.replace(/\/$/, '/.i');
                    } else if (item.domain_name.includes('reddit.com')) {
                        item.link = item.link.replace(/www./, 'old.');
                    }
                }
                return item;
            });
            break;

        case 'JavaScript Weekly':
        case 'Frontend Focus':
        case 'NodeJS Weekly':
        case 'React Status':
            items = items.map(item => {
                tmpContent = document.createElement('div');
                item.description = item.description.replace(/<img[^>]*>/g, '');
                item.description = item.description.replace(/style="[^"]*"/g, '');
                item.description = item.description.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
                item.description = item.description.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
                item.description = item.description.replace(/<link[^>]*>/g, '');
                item.description = item.description.replace(/<meta[^>]*>/g, '');
                item.description = item.description.replace(/<canvas[^>]*>[\s\S]*?<\/canvas>/g, '');
                item.description = item.description.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/g, '');
                //console.log(item.description);
                tmpContent.innerHTML = item.description;
                let tmpAllAnchors = Array.from(tmpContent.getElementsByTagName('a'));
                if (tmpAllAnchors.length === 0) {
                    tmpAllAnchors = Array.from(tmpContent.querySelectorAll('a[href^="http"]'));
                }

                const tmpEntriesHrefs = [];
                const tmpItems = [];

                tmpAllAnchors.forEach(anchor => {
                    if (
                        !anchor.href.startsWith('http') ||
                        !anchor.title ||
                        anchor.parentNode.parentNode.parentNode.innerHTML.includes('sponsor')
                    ) {
                        return;
                    }

                    const tmpDomainName = anchor.href.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
                    tmpEntriesHrefs.push(anchor.href);
                    tmpItems.push({
                        link: anchor.href.replace(/\/(web|rss)$/, ''),
                        title: anchor.text.trim(),
                        extraContent: '',
                        domain_name: tmpDomainName
                    });
                });

                return tmpItems;
            }).flat();

            break;

        default:
            // Default normalization for other feeds
            /*items = items.map(item => ({
                ...item,
                title: item.title,
                link: item.link,
                extraContent: item.content || '',
                domain_name: ''
            }));*/
            break;
        }
        //console.log(items);
        return items;
    }

    /**
     * Normalizes the general structure of feed entries.
     * @param {Object} content - The feed content object.
     * @returns {Array} The normalized array of feed items.
     */
    static normalizeFeedEntries(content) {
        if (!content.items) {
            content.items = [];
        }
        if (content.channel) {
            content.items = content.channel.item;
        } else if (content.entry) {
            content.items = content.entry;
        }

        if (typeof content.items === 'undefined' || content.items.length === 0) {
            return [];
            /*return [{
                'title': '',
                'link': '#',
                'extraContent': 'No Items Found or Invalid Feed.',
                'domain_name': ''
            }];*/
        }

        content.items = content.items.map(item => {
            let description = '',
                link = '';

            if (item.description) {
                if (item.description.toString() === '[object Object]') {
                    description = '';
                } else {
                    description = item.description.trim();
                }
            } else if (item.content) {
                description = item.content.trim();
            }

            link = item.link['@attributes'] ? item.link['@attributes'].href : item.link;
            link = link.replace(/&?utm=[^&]+/g, '');

            return {
                ...item,
                extraContent: '',
                domain_name: '',
                description: description,
                title: (Array.isArray(item.title) ? item.title[0] : item.title).replace(['<', '>'], ['&lt;', '&gt;']),
                link: link
            };
        });

        return content.items;
    }
}

export default FeedNormalizer;

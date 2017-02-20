/*exported normalizeFeedEntries */
/*global $, inArray, inArrayPartial, isArray, normalizeEntryLink */
window.normalizeEntryLink = function(entry) {
    'use strict';
    if (entry.origLink) {
        if (entry.origLink.href) {
            entry.link = entry.origLink.href;
        } else if (entry.origLink.content) {
            entry.link = entry.origLink.content;
        } else {
            entry.link = entry.origLink;
        }
    } else if (entry.link.href) {
        entry.link = entry.link.href;
    } else if (entry.link.content) {
        entry.link = entry.link.content;
    }
    if (!entry.link.match(/^http/)) {
        entry.link = 'http://' + entry.link;
    }
};

window.normalizeFeedEntries = function(feed, response) {
    'use strict';
    var entries,
        i,
        k,
        isMobileUser = isArray(navigator.userAgent.match(/Android|iPhone/i)),
        tmpEntries = [],
        tmpEntriesHrefs = [],
        tmpAllAnchors = [],
        tmpContent = '',
        tmpRemoveDomains = [],
        tmpRemovePartialDomains = [],
        tmpDomainName = '',
        x,
        y;
    if (typeof response.query === 'undefined' || response.query.count === 0) {
        return [];
    }
    //console.log(response);
    entries = response.query.results.rss ? response.query.results.rss.channel.item : response.query.results.feed.entry;
    //isMobileUser = true;
    //console.log(feed, response);
    for (i = 0, k = entries.length; i < k; i++) {
        normalizeEntryLink(entries[i]);
        entries[i].extraContent = '';
        entries[i].domain_name = '';
        if (isArray(entries[i].title)) {
            entries[i].title = entries[i].title[0];
        }
    }

    switch (feed.feedName) {
    case 'HN':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].extraContent = entries[i].description.replace(/<a href/ig, '<a target="_blank" href');
            //console.log(entries[i].extraContent);
            if (isMobileUser === true) {
                entries[i].extraContent = entries[i].extraContent.replace(/https:\/\/news\.ycombinator\.com\/item\?id=/, 'https://app.hackerwebapp.com/#/item/');
            }
            entries[i].domain_name = entries[i].link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
        }
        break;

    case 'TechMeme':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].comments = entries[i].link;
            entries[i].link = entries[i].description.match(/<A HREF="(.*)">/ig);
            if (entries[i].link[2]) {
                entries[i].link = entries[i].link[2];
            } else {
                entries[i].link = entries[i].link[1];
            }
            entries[i].link = entries[i].link.replace(/^<A HREF="|">$/ig, '');
            entries[i].extraContent = '<a target="_blank" href="' + entries[i].comments + '">Comments</a>';
            entries[i].domain_name = entries[i].link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
        }
        break;

    case 'DN':
        for (i = 0, k = entries.length; i < k; i++) {
            if (entries[i].description.match(/^http/)) {
                entries[i].extraContent = '<a target="_blank" href="' + entries[i].link.replace(/\/click/, '') + '">Comments</a>';
                entries[i].link = entries[i].description;
            } else {
                entries[i].link = entries[i].link.replace(/\/click/, '');
            }
        }
        break;

    case 'Trusted Reviews':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].link = entries[i].link.replace(/\?source=rss$/, '');
        }
        break;

    case 'TF':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].comments = (String(entries[i].comments)).replace(/#respond(.*)$/, '');
        }
        break;

    case 'Google News':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].link = (String(entries[i].link)).replace(/(.*)&url=/, '');
            entries[i].domain_name = entries[i].link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
        }
        break;

    case '/r/JavaScript':
    case '/r/CSS':
    case '/r/PHP':
    case '/r/WebDev':
    case '/r/ShutupAndTakeMyMoney':
    case '/r/Startup':
    case '/r/Startups':
    case '/r/StartupFeedback':
    case '/r/RealProblemsSolvers':
        for (i = 0, k = entries.length; i < k; i++) {
            tmpContent = entries[i].content.content.match(/<a[^>]*>([\s\S]*?)<\/a>/ig);
            //console.log(tmpContent);
            if (tmpContent) {
                for (x = 0, y = tmpContent.length; x < y; x++) {
                    if (tmpContent[x].match(/comments\]<\/a>|comment\]<\/a>/i)) {
                        entries[i].extraContent = String('<a target="_blank" href="' + tmpContent[x].match(/href="(.*)">/i)[1].replace(/^http:\/\//, 'https://'));
                        if (isMobileUser === true) {
                            console.log(true);
                            entries[i].extraContent += '.compact';
                        }
                        entries[i].extraContent += '">Comments</a>';
                    }
                    if (tmpContent[x].match(/\[link\]<\/a>/i)) {
                        entries[i].link = tmpContent[x].match(/href="(.*)">/i)[1];
                        entries[i].domain_name = entries[i].link.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
                        if (isMobileUser === true && entries[i].domain_name === 'reddit.com') {
                            entries[i].link = entries[i].link.replace(/\/$/, '/.compact');
                        }
                    }
                }
                if (entries[i].domain_name === 'reddit.com') {
                    entries[i].extraContent = '';
                }
            } else {
                if (isMobileUser === true) {
                    entries[i].link = entries[i].link.replace(/\/$/, '/.compact');
                }
            }
        }
        break;

    case 'JavaScript Weekly':
    case 'Mobile Web Weekly':
    case 'HTML5 Weekly':
    case 'NodeJS Weekly':
    case 'WebOps Weekly':
        tmpEntries = [];
        tmpRemoveDomains = [
            document.location.host,
            'javascriptweekly.com',
            'mobilewebweekly.co',
            'html5weekly.com',
            'frontendfocus.co',
            'nodeweekly.com',
            'webopsweekly.com',
            'manning.com',
            'cooperpress.s3.amazonaws.com',
            'booking.cooperpress.com',
            'cooperpress.com',
            'twitter.com',
            'myemail.constantcontact.com',
            'hired.com',
            'go.pluralsight.com',
            'go.rangle.io',
            'joyent.com',
            'toptal.com',
            'ibm.biz',
            'welcome.linode.com',
            'go.npm.me',
            'frontenddeveloperjob.com',
            'frontendmasters.com',
            'centralway.com'
        ];
        tmpRemovePartialDomains = [
            'breezy.hr',
            'ads.'
        ];

        for (i = 0, k = entries.length; i < k; i++) {
            if (i !== 0) {
                break;
            }
            tmpContent = document.createElement('div');
            entries[i].description = entries[i].description.replace(/<img[^>]*>/g, '');
            tmpContent.innerHTML = entries[i].description;
            //console.log(tmpContent.innerHTML);
            tmpAllAnchors = $('a[target="_blank"]', tmpContent);
            for (x = 0, y = tmpAllAnchors.length; x < y; x++) {
                //console.log(tmpAllAnchors[x].href);
                if (!tmpAllAnchors[x].href.match(/^http/i)) {
                    continue;
                }
                tmpDomainName = tmpAllAnchors[x].href.match(/:\/\/(.[^/]+)/)[1].replace(/^www\./, '');
                if (inArray(tmpRemoveDomains, tmpDomainName) || inArrayPartial(tmpRemovePartialDomains, tmpDomainName)) {
                    continue;
                }

                tmpAllAnchors[x].href = tmpAllAnchors[x].href.replace(/&utm(.*)|\?utm(.*)/ig, '').trim();
                if (tmpAllAnchors[x].text.trim() === '' || inArray(tmpEntriesHrefs, tmpAllAnchors[x].href)) {
                    continue;
                }
                tmpEntriesHrefs.push(tmpAllAnchors[x].href);
                //console.log(tmpAllAnchors[x].href);
                tmpEntries.push({
                    link: tmpAllAnchors[x].href,
                    title: tmpAllAnchors[x].text.trim(),
                    extraContent: '',
                    domain_name: tmpDomainName
                });
            }
        }
        entries = tmpEntries;
        break;

    default:
        break;

    }

    return entries;

};
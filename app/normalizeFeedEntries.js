/*exported normalizeFeedEntries */
/*global $, inArray */
function normalizeEntryLink(entry) {
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
}

function normalizeFeedEntries(feed, response) {
    'use strict';
    var entries = response.query.results.rss ? response.query.results.rss.channel.item : response.query.results.feed.entry,
        i,
        k,
        isMobileUser = navigator.userAgent.match(/Android|iPhone/i) ? true : false,
        tmpEntries = [],
        tmpEntriesHrefs = [],
        tmpAllAnchors = [],
        tmpContent = '',
        tmpRemoveDomains = [],
        tmpDomainName = '',
        x,
        y;
    //isMobileUser = true;
    for (i = 0, k = entries.length; i < k; i++) {
        normalizeEntryLink(entries[i]);
        entries[i].extraContent = '';
        entries[i].domain_name = '';
    }

    switch (feed.feedName) {
    case 'HN':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].extraContent = entries[i].description.replace(/<a href/ig, '<a target="_blank" href');
            //console.log(entries[i].extraContent);
            if (isMobileUser === true) {
                entries[i].extraContent = entries[i].extraContent.replace(/https:\/\/news\.ycombinator\.com\/item\?id=/, 'http://cheeaun.github.io/hackerweb/#/item/');
            }
            entries[i].domain_name = (entries[i].link.match(/:\/\/(.[^\/]+)/)[1]).replace(/^www\./, '');
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
            entries[i].comments = (entries[i].comments + '').replace(/#respond(.*)$/, '');
        }
        break;

    case '/r/JavaScript':
    case '/r/CSS':
    case '/r/PHP':
    case '/r/WebDev':
    case '/r/ShutupAndTakeMyMoney':
        for (i = 0, k = entries.length; i < k; i++) {
            tmpContent = entries[i].content.content.match(/<a[^>]*>([\s\S]*?)<\/a>/ig);
            //console.log(tmpContent);
            if (tmpContent) {
                for (x = 0, y = tmpContent.length; x < y; x++) {
                    if (tmpContent[x].match(/comments\]<\/a>|comment\]<\/a>/i)) {
                        entries[i].extraContent = '<a target="_blank" href="' + tmpContent[x].match(/href="(.*)">/i)[1].replace(/^http:\/\//, 'https://') + '';
                        if (isMobileUser === true) {
                            entries[i].extraContent += '.compact';
                        }
                        entries[i].extraContent += '">Comments</a>';
                    }
                    if (tmpContent[x].match(/\[link\]<\/a>/i)) {
                        entries[i].link = tmpContent[x].match(/href="(.*)">/i)[1];
                        entries[i].domain_name = (entries[i].link.match(/:\/\/(.[^\/]+)/)[1]).replace(/^www\./, '');
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
            'go.npm.me'
        ];
        for (i = 0, k = entries.length; i < k; i++) {
            if (i !== 0) {
                break;
            }
            tmpContent = document.createElement('div');
            entries[i].description = (entries[i].description).replace(/<img[^>]*>/g, '');
            tmpContent.innerHTML = entries[i].description;
            //console.log(tmpContent.innerHTML);
            tmpAllAnchors = $('a[target="_blank"]', tmpContent);
            for (x = 0, y = tmpAllAnchors.length; x < y; x++) {
                //console.log(tmpAllAnchors[x].href);
                if (!tmpAllAnchors[x].href.match(/^http/i)) {
                    continue;
                }
                tmpDomainName = (tmpAllAnchors[x].href.match(/:\/\/(.[^\/]+)/)[1]).replace(/^www\./, '');
                if (inArray(tmpRemoveDomains, tmpDomainName)) {
                    continue;
                }
                tmpAllAnchors[x].href = tmpAllAnchors[x].href.replace(/\&utm(.*)|\?utm(.*)/ig, '').trim();
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



    case 'OpenHunt':
        for (i = 0, k = entries.length; i < k; i++) {
            entries[i].extraContent = '<div class="short-description">' + entries[i].description + '</div>';
            //console.log(entries[i].extraContent);
            //console.log(entries[i].link);
            entries[i].domain_name = (entries[i].link.match(/:\/\/(.[^\/]+)/)[1]).replace(/^www\./, '');
        }
        break;


    }

    return entries;

}
/*jslint browser: true, devel: true, node: true, sloppy: true, plusplus: true, regexp: true*/
/*global $, MReader*/

function handleExtraContent(feed, entry) {
    if (entry.origLink) {
        entry.link = entry.origLink;
    } else if (entry.link.href) {
        entry.link = entry.link.href;
    }
    entry.extraContent = '';
    entry.domain_name = '';
    var isMobileUser = navigator.userAgent.match(/Android|iPhone/i) ? true : false;
    //isMobileUser = true;
    switch (feed.feedName) {
    case 'HN':
        entry.extraContent = entry.description;
        entry.extraContent = entry.extraContent.replace(/<a href/ig, '<a target="_blank" href');
        if (isMobileUser === true) {
            // entry.extraContent = entry.extraContent.replace(/https:\/\/news\.ycombinator\.com\/item\?id=/, 'http://ihackernews.com/comments/');
            //entry.extraContent = entry.extraContent.replace(/https:\/\/news\.ycombinator\.com\/item\?id=/, 'http://hn.premii.com/#/comments/');
            entry.extraContent = entry.extraContent.replace(/https:\/\/news\.ycombinator\.com\/item\?id=/, 'http://cheeaun.github.io/hackerweb/#/item/');
        }
        entry.domain_name = (entry.link.match(/:\/\/(.[^\/]+)/)[1]).replace(/^www\./, '');
        break;

    case 'DN':
        if (entry.description.match(/^http/)) {
            entry.extraContent = '<a target="_blank" href="' + entry.link.replace(/\/click/, '') + '">Comments</a>';
            entry.link = entry.description;
        } else {
            entry.link = entry.link.replace(/\/click/, '');
        }
        break;

    case '/r/JavaScript':
    case '/r/CSS':
    case '/r/PHP':
    case '/r/ShutupAndTakeMyMoney':
        if (isMobileUser === true) {
            entry.link = entry.link.replace(/\/$/, '/.compact');
        }
        break;

    case 'Liliputing':
        entry.link = entry.description.match(/<a rel="nofollow" href="([^"]*)">(.*)<\/a>/i)[1];
        break;

    }
    return entry;
}

function parseFeedCallback(response) {
    //console.log(response);
    var feedKey = MReader.currentFeedKey,
        feed = MReader.feeds[feedKey],
        content = '',
        entries = response.query.results.rss ? response.query.results.rss.channel.item : response.query.results.feed.entry,
        i,
        k,
        entry;
    content += '<ul class="items">';
    content += '<li>Latest Entries In ' + feed.feedName + ':</li>';
    for (i = 0, k = entries.length; i < k; i++) {
        entry = handleExtraContent(feed, entries[i]);
        content += '<li><a target="_blank" href="' + entry.link + '">&#187; ' + entry.title;
        if (entry.domain_name !== '') {
            content += '<span class="domainName">[' + entry.domain_name + ']</span>';
        }
        content += '</a><span class="extraContent">' + entry.extraContent + '</span></li>';
    }
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = ($('section#sidebar').offsetHeight) + 'px';
    }
}
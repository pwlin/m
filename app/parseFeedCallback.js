function parseFeedCallback(feedKey, response) {
    //console.log(response);
    var feed = MReader.feeds[feedKey];
    var textColor = feed['textColor'] || '#000000';
    var content = '';
    content += '<ul class="items">';
    content += '<li style="color:' + textColor + ';">Latest Entries In ' + feed['feedName'] + ':</li>';
    var entries = response['feed']['entries'];
    for (var i = 0, k = entries.length; i < k ; i++) {
        var entry = handleExtraContent(feed, entries[i]);
        content += '<li><a style="color:' + textColor + ';" href="' + entry['link'] + '">&#187; ' + entry['title'];
        if (entry['domain_name'] != '') {
            content += '<span class="domainName">' + entry['domain_name'] + '</span>';
        }; 
        content += '</a><span class="extraContent">' + entry['extraContent'] + '</span></li>';
    };
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = ($('section#sidebar').offsetHeight) + 'px';    
    };
};

function handleExtraContent(feed, entry) {
    entry['extraContent'] = '';
    entry['domain_name'] = '';
    var isMobileUser = navigator.userAgent.match(/Android|iPhone/i) ? true : false;
    switch(feed['feedName']) {
        case 'HN':
            entry['extraContent'] = entry['content'];
            if (isMobileUser === true) {
                entry['extraContent'] = entry['extraContent'].replace(/https:\/\/news\.ycombinator\.com\/item\?id=/, 'http://ihackernews.com/comments/');    
            };
            entry['domain_name'] = (entry['link'].match(/:\/\/(.[^/]+)/)[1]).replace(/^www\./, '');
        break;
        
        case '/r/JavaScript':
        case '/r/CSS':
        case '/r/PHP':
        case '/r/ShutupAndTakeMyMoney':
            if (isMobileUser === true) {
                entry['link'] = entry['link'].replace(/\/$/, '/.compact');    
            };
        break;
    
    };
    
    return entry;
};
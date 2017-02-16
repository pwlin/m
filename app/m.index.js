/*global m, qs, $, normalizeFeedEntries */
m.prototype.indexInit = function() {
    'use strict';
    window.addEventListener('resize', function () {
        if ($('section#sidebar').style.display === 'none') {
            $('section#sidebar').removeAttribute('style');
        }
    }, false);

    this.indexSidebarFeeds();

    var pageName = qs('page'),
        feedKey = qs('feed');

    if (pageName) {
        this.indexPageCallback(pageName);
    } else {
        if (!feedKey || !this.feeds[feedKey]) {
            feedKey = '0';
        }
        this.currentFeed = this.feeds[feedKey];
        document.title += ' :: ' + this.currentFeed.feedName;
        $('article#maincolumn').innerHTML = '<ul class="items"><li>Loading ' + this.currentFeed.feedName + ' ...</li></ul>';
        this.getFeed(this.currentFeed.feedUrl);
    }
};


m.prototype.indexSidebarFeeds = function () {
    'use strict';
    var sidebarContent = '',
        i,
        k,
        favIcon,
        cssSelectedClass;
    sidebarContent += '<ul class="list-feeds">';
    for (i = 0, k = this.feeds.length; i < k; i++) {
        if (i === 0 && !qs('feed') && !qs('page')) {
            cssSelectedClass = ' class="selected" ';
        } else if (i === parseInt(qs('feed'), 10)) {
            cssSelectedClass = ' class="selected" ';
        } else {
            cssSelectedClass = '';
        }
        if (this.feeds[i].favIcon) {
            if (this.feeds[i].favIcon === 'default') {
                favIcon = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC';
            } else {
                favIcon = this.feeds[i].favIcon;
            }
        } else {
            favIcon = 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + encodeURIComponent(this.feeds[i].webUrl);
        }
        sidebarContent += '<li><a ' + cssSelectedClass + 'style="background-image : url(\'' + favIcon + '\');" href="?feed=' + i + '">' + this.feeds[i].feedName + '</a></li>';
    }
    sidebarContent += '</ul>';
    $('section#sidebar').innerHTML = sidebarContent;
};

m.prototype.indexFeedCallback = function(response) {
    'use strict';
    var entries = normalizeFeedEntries(this.currentFeed, response),
        i,
        k,
        content = '';
	//console.log(entries);
    content += '<ul class="items">';
    content += '<li>Latest Entries In <a class="feedWebUrl" target="_blank" href="' + this.currentFeed.webUrl + '">' + this.currentFeed.feedName + '</a>:</li>';
    for (i = 0, k = entries.length; i < k; i++) {
        content += '<li><a target="_blank" href="' + entries[i].link + '">&#187; ' + entries[i].title;
        if (entries[i].domain_name !== '') {
            content += '<span class="domainName">[' + entries[i].domain_name + ']</span>';
        }
        content += '</a><span class="extraContent">' + entries[i].extraContent + '</span></li>';
    }
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = ($('section#sidebar').offsetHeight) + 'px';
    }
};

m.prototype.indexToggleFeedsLink = function() {
    'use strict';
    if ($('section#sidebar').style.display === 'inline') {
        $('section#sidebar').style.display = 'none';
    } else {
        $('section#sidebar').style.display = 'inline';
    }
};

m.prototype.indexPageCallback = function(pageName) {
    'use strict';
    switch (pageName) {
    case 'about':
        this.indexAboutPage();
        break;
    }
};

m.prototype.indexAboutPage = function() {
    'use strict'; 
    var content = '';
    content += '<ul class="items">';
    content += '<li><p>About MReader</p><p>This is a simple feed reader with the help of <a target="_blank" href="https://developer.yahoo.com/yql/">Yahoo\'s YQL Service</a>.</p>';
    content += '<p>The complete source code of this app is <a target="_blank" href="https://github.com/pwlin/m">hosted on GitHub</a>.</p></li>';
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = ($('section#sidebar').offsetHeight) + 'px';
    }
};

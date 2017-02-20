/*global m, qs, $, normalizeFeedEntries, forEach, navigate */
m.prototype.indexInit = function() {
    'use strict';
    var pageName = qs('page'),
        feedKey = qs('feed'),
        feedCategory = qs('category');
    window.addEventListener('resize', function() {
        if ($('section#sidebar').style.display === 'none') {
            $('section#sidebar').removeAttribute('style');
        }
    }, false);

    if (!feedCategory || !this.feeds[feedCategory]) {
        feedCategory = this.currentCateogry;
    }
    if (!feedKey || !this.feeds[feedCategory][feedKey]) {
        feedKey = this.currentFeedIndex;
    }

    this.currentCateogry = feedCategory;
    this.currentFeedIndex = parseInt(feedKey, 10);
    this.currentFeedObject = this.feeds[this.currentCateogry][this.currentFeedIndex];

    this.indexSidebarFeeds();

    if (pageName) {
        this.indexPageCallback(pageName);
    } else {
        document.title += ' :: ' + this.currentFeedObject.feedName;
        $('article#maincolumn').innerHTML = '<ul class="items"><li>Loading ' + this.currentFeedObject.feedName + ' ...</li></ul>';
        this.getFeed(this.currentFeedObject.feedUrl);
    }
};

m.prototype.indexSidebarFeeds = function() {
    'use strict';
    var self = this,
        content = '',
        favIcon,
        cssSelectedClass;

    content += '<ul class="list-feeds">';
    content += this.indexDropDownCategory();

    forEach(this.feeds[this.currentCateogry], function(i, v) {
        if (i === 0 && !qs('feed') && !qs('page')) {
            cssSelectedClass = ' class="selected" ';
        } else if (i === self.currentFeedIndex) {
            cssSelectedClass = ' class="selected" ';
        } else {
            cssSelectedClass = '';
        }
        if (v.favIcon) {
            if (v.favIcon === 'default') {
                favIcon = 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC';
            } else {
                favIcon = v.favIcon;
            }
        } else {
            favIcon = 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + encodeURIComponent(v.webUrl);
        }
        content += '<li><a ' + cssSelectedClass + 'style="background-image : url(\'' + favIcon + '\');" href="?';
        if (Object.keys(self.feeds).length > 1) {
            content += 'category=' + encodeURIComponent(self.currentCateogry) + '&';
        }
        content += 'feed=' + i + '">' + v.feedName + '</a></li>';
    });

    content += '</ul>';
    $('section#sidebar').innerHTML = content;
    this.indexDropDownCategorySetOnChange();

};

m.prototype.indexDropDownCategory = function() {
    'use strict';
    var self = this,
        content = '';
    if (Object.keys(this.feeds).length === 1) {
        return '';
    }
    content += '<li><select id="category-selector">';
    forEach(this.feeds, function(k) {
        content += '<option ';
        if (k === self.currentCateogry) {
            content += ' selected="selected ';
        }
        content += ' value="' + k + '">' + k + '</option>';
    });
    content += '</select></li>';
    return content;
};

m.prototype.indexDropDownCategorySetOnChange = function() {
    'use strict';
    if (Object.keys(this.feeds).length === 1) {
        return;
    }
    $('#category-selector').addEventListener('change', function(evt) {
        navigate('./?category=' + encodeURIComponent(evt.target.value));
    });
};

m.prototype.indexFeedCallback = function(response) {
    'use strict';
    var entries = normalizeFeedEntries(this.currentFeedObject, response),
        content = '';
    //console.log(entries);
    content += '<ul class="items">';
    content += '<li>Latest Entries In <a class="feedWebUrl" target="_blank" href="' + this.currentFeedObject.webUrl + '">' + this.currentFeedObject.feedName + '</a>:</li>';
    if (entries.length === 0) {
        content += '<li>Ouch, something went wrong. <a class="feedWebUrl" href="#" onclick="document.location.reload(true);return false;">Please try again</a>.</li>';
    } else {
        forEach(entries, function(i, v) {
            content += '<li><a target="_blank" href="' + v.link + '">&#187; ' + v.title;
            if (v.domain_name !== '') {
                content += '<span class="domainName">[' + v.domain_name + ']</span>';
            }
            content += '</a><span class="extraContent">' + v.extraContent + '</span></li>';
        });
    }
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = $('section#sidebar').offsetHeight + 'px';
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
    default:
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
        $('article#maincolumn').style.height = $('section#sidebar').offsetHeight + 'px';
    }
};

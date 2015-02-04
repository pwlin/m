/*jslint browser: true, devel: true, node: true, sloppy: true, plusplus: true*/
/*global inc, qs, $*/

var m = function (params) {
    this.params = params || {};
    this.apiUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0';
    this.run = function () {
        if (document.location.protocol === 'file:') {
            this.apiUrl = 'https:' + this.apiUrl;
        }
        window.addEventListener('resize', function () {
            if ($('section#sidebar').style.display === 'none') {
                $('section#sidebar').removeAttribute('style');
            }
        }, false);
        this.sidebarFeeds();

        var pageName = qs('page'),
            feedKey = qs('feed');

        if (pageName) {
            window[this.params.showPageCallback](pageName);
        } else {
            if (!feedKey || !this.feeds[feedKey]) {
                feedKey = '0';
            }
            document.title += ' :: ' + this.feeds[feedKey].feedName;
            this.getFeed(feedKey, this.apiUrl);
        }
    };

    this.sidebarFeeds = function () {
        var sidebarContent = '',
            i,
            k,
            favIcon,
            favIconUrlPrefix,
            cssSelectedClass;
        sidebarContent += '<ul class="list-feeds">';
        favIconUrlPrefix = document.location.protocol === 'file:' ? 'https://' : '//';
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
                favIcon = favIconUrlPrefix + 's2.googleusercontent.com/s2/favicons?domain_url=' + encodeURIComponent(this.feeds[i].webUrl);
            }
            sidebarContent += '<li><a ' + cssSelectedClass + 'style="background-image : url(\'' + favIcon + '\');" href="?feed=' + i + '">' + this.feeds[i].feedName + '</a></li>';
        }
        sidebarContent += '</ul>';
        $('section#sidebar').innerHTML = sidebarContent;
    };

    this.getFeed = function (feedKey, apiUrl) {
        apiUrl += '&q=' + encodeURIComponent(this.feeds[feedKey].feedUrl);
        apiUrl += '&callback=' + this.params.parseFeedCallback;
        apiUrl += '&context=' + feedKey;
        apiUrl += '&num=50';
        apiUrl += '&_=' + new Date().valueOf();
        //console.log('loading ', apiUrl);
        $('article#maincolumn').innerHTML = '<ul class="items"><li>Loading ' + this.feeds[feedKey].feedName + ' ...</li></ul>';
        inc(apiUrl);
    };

    this.toggleFeedsLink = function () {
        if ($('section#sidebar').style.display === 'inline') {
            $('section#sidebar').style.display = 'none';
        } else {
            $('section#sidebar').style.display = 'inline';
        }
    };

};
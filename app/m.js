var m = function(params) {
    this.params = params || {}; 
    this.apiUrl = '//ajax.googleapis.com/ajax/services/feed/load?v=1.0';
    this.run = function() {
        if (document.location.protocol == 'file:') {
            this.apiUrl = 'https:' + this.apiUrl;
        }
        window.addEventListener('resize', function() {
            if ($('section#sidebar').style.display == 'none') {
                $('section#sidebar').removeAttribute('style');    
            };
        }, false);
        this.sidebarFeeds();
        
        var pageName = qs('page');
        if (pageName) {
            window[this.params['showPageCallback']](pageName);
        } else {
            var feedKey = qs('feed');
            if (!feedKey || !this.feeds[feedKey]) {
                feedKey = '0';
            };
            document.title += ' :: ' + this.feeds[feedKey]['feedName'];
            this.getFeed(feedKey, this.apiUrl);    
        };
    };
    
    this.sidebarFeeds = function() {
        var sidebarContent = '';
        sidebarContent += '<ul class="list-feeds">';
        for (var i = 0, k = this.feeds.length; i < k ; i++) {
            var textColor = this.feeds[i]['textColor'] || '#000000';
            var favicon = this.feeds[i]['favIcon'] || 'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACiElEQVQ4EaVTzU8TURCf2tJuS7tQtlRb6UKBIkQwkRRSEzkQgyEc6lkOKgcOph78Y+CgjXjDs2i44FXY9AMTlQRUELZapVlouy3d7kKtb0Zr0MSLTvL2zb75eL838xtTvV6H/xELBptMJojeXLCXyobnyog4YhzXYvmCFi6qVSfaeRdXdrfaU1areV5KykmX06rcvzumjY/1ggkR3Jh+bNf1mr8v1D5bLuvR3qDgFbvbBJYIrE1mCIoCrKxsHuzK+Rzvsi29+6DEbTZz9unijEYI8ObBgXOzlcrx9OAlXyDYKUCzwwrDQx1wVDGg089Dt+gR3mxmhcUnaWeoxwMbm/vzDFzmDEKMMNhquRqduT1KwXiGt0vre6iSeAUHNDE0d26NBtAXY9BACQyjFusKuL2Ry+IPb/Y9ZglwuVscdHaknUChqLF/O4jn3V5dP4mhgRJgwSYm+gV0Oi3XrvYB30yvhGa7BS70eGFHPoTJyQHhMK+F0ZesRVVznvXw5Ixv7/C10moEo6OZXbWvlFAF9FVZDOqEABUMRIkMd8GnLwVWg9/RkJF9sA4oDfYQAuzzjqzwvnaRUFxn/X2ZlmGLXAE7AL52B4xHgqAUqrC1nSNuoJkQtLkdqReszz/9aRvq90NOKdOS1nch8TpL555WDp49f3uAMXhACRjD5j4ykuCtf5PP7Fm1b0DIsl/VHGezzP1KwOiZQobFF9YyjSRYQETRENSlVzI8iK9mWlzckpSSCQHVALmN9Az1euDho9Xo8vKGd2rqooA8yBcrwHgCqYR0kMkWci08t/R+W4ljDCanWTg9TJGwGNaNk3vYZ7VUdeKsYJGFNkfSzjXNrSX20s4/h6kB81/271ghG17l+rPTAAAAAElFTkSuQmCC';
            sidebarContent += '<li><a style="background-image : url(\'' + favicon + '\');background-color:' + this.feeds[i]['bgColor'] + ';color:' + textColor + ';" href="?feed=' + i +'">' + this.feeds[i]['feedName'] + '</a></li>';    
        };
        sidebarContent += '</ul>';
        $('section#sidebar').innerHTML = sidebarContent;
    };
    
    this.getFeed = function(feedKey, apiUrl) {
        var feed = this.feeds[feedKey];
        var textColor = feed['textColor'] || '#000000';
        apiUrl += '&q=' + encodeURIComponent(feed['feedUrl']);
        apiUrl += '&callback=' + this.params['parseFeedCallback'];
        apiUrl += '&context=' + feedKey;
        apiUrl += '&num=50';
        apiUrl += '&_=' + new Date().valueOf();
        console.log('loading ', apiUrl);
        $('article#maincolumn').setAttribute('style', 'background-color: ' + feed['bgColor'] + ';');
        $('article#maincolumn').innerHTML = '<ul class="items"><li style="color:' + textColor + ';">Loading ' + feed['feedName'] + ' ...</li></ul>';
        inc(apiUrl);
    };
    
    this.toggleFeedsLink = function() {
        if ($('section#sidebar').style.display == 'inline') {
            $('section#sidebar').style.display = 'none';
        } else {
            $('section#sidebar').style.display = 'inline';
        };
    };
    
};
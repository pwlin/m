/*global m, normalizeFeedEntries, $, forEach, triggerEvent */
m.prototype.sidebarInit = function() {
    'use strict';
    this.currentCateogry = 'Technology';
    this.currentFeedIndex = '0';
    try {
        this.currentCateogry = localStorage.getItem('sidebar-selected-category') || 'Technology';
        this.currentFeedIndex = localStorage.getItem('sidebar-selected-feed') || '0';
    } catch(e) {
        //
        console.log(e);
    }
    this.currentFeedObject = this.feeds[this.currentCateogry][parseInt(this.currentFeedIndex, 10)];
    this.sidebarDropDownCategory();
    this.sidebarDropDownFeed();
    this.sidebarDropDownCategorySetOnChange();
    this.sidebarDropDownFeedSetOnChange();
    $('#category-selector [value="' + this.currentCateogry + '"]').selected = true;
    $('#feed-selector [value="' + this.currentFeedIndex + '"]').selected = true;
    $('#entries').innerHTML = '<li>Loading...</li>';
    this.getFeed(this.currentFeedObject.feedUrl);
};

m.prototype.sidebarDropDownCategory = function() {
    'use strict';
    var content = '';
    forEach(this.feeds, function(k) {
        content += '<option value="' + k + '">' + k + '</option>';
    });
    $('#category-selector').innerHTML = content;
};

m.prototype.sidebarDropDownFeed = function() {
    'use strict';
    var content = '';
    forEach(this.feeds[this.currentCateogry], function(k, v) {
        content += '<option value="' + k + '">' + v.feedName + '</option>';
    });
    $('#feed-selector').innerHTML = content;
};

m.prototype.sidebarDropDownCategorySetOnChange = function() {
    'use strict';
    var self = this;
    $('#category-selector').addEventListener('change', function(evt) {
        try {
            localStorage.setItem('sidebar-selected-category', evt.target.value);
        } catch(e) {
            //
        }
        self.currentCateogry = evt.target.value;
        self.sidebarDropDownFeed();
        triggerEvent($('#feed-selector'), 'change');
    });
};

m.prototype.sidebarDropDownFeedSetOnChange = function() {
    'use strict';
    var self = this;
    $('#feed-selector').addEventListener('change', function(evt) {
        try {
            localStorage.setItem('sidebar-selected-feed', evt.target.value);
        } catch(e) {
            //
        }
        self.currentFeedIndex = parseInt(evt.target.value, 10);
        self.currentFeedObject = self.feeds[self.currentCateogry][self.currentFeedIndex];
        $('#entries').innerHTML = '<li>Loading...</li>';
        self.getFeed(self.currentFeedObject.feedUrl);
    });
};

m.prototype.sidebarFeedCallback = function(response) {
    'use strict';
    var entries = normalizeFeedEntries(this.currentFeedObject, response),
        content = '';
    //console.log(entries);
    forEach(entries, function(k, v) {
        content += '<li><a title="' + v.title + ' [' + (v.domain_name || 'self') + ']" target="_blank" href="' + (v.comments || v.link) + '">&#187; ' + v.title + '</a></li>';
    });
    $('#entries').innerHTML = content;
};
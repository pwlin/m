/*global m, normalizeFeedEntries, $, forEach, triggerEvent */
m.prototype.sidebarInit = function() {
    'use strict';
    try {
        this.currentCateogry = localStorage.getItem('sidebar-selected-category') || this.currentCateogry;
        this.currentFeedIndex = localStorage.getItem('sidebar-selected-feed') || this.currentFeedIndex;
    } catch(e) {
        //
    }
    this.currentFeedIndex = parseInt(this.currentFeedIndex, 10);
    if (!this.feeds[this.currentCateogry]) {
        this.currentCateogry = Object.keys(this.feeds)[0];
    } else if (!this.feeds[this.currentCateogry][this.currentFeedIndex]) {
        this.currentFeedIndex = 0;
    }
    this.currentFeedObject = this.feeds[this.currentCateogry][this.currentFeedIndex];
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
    if (Object.keys(this.feeds).length === 1) {
        $('#category-selector').style.display = 'none';
        return;
    }
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
    if (Object.keys(this.feeds).length === 1) {
        return;
    }
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
    if (entries.length === 0) {
        content += '<li class="ouch"><div>Ouch, something went wrong.</div><div><a href="#" onclick="document.location.reload(true);return false;">Please try again</a>.</div></li>';
    } else {
        forEach(entries, function(k, v) {
            content += '<li>' + v.extraContent.replace(/Comments/, '[C] ');
            content += '<a title="' + v.title.replace(/"/g, '\'');
            if (v.domain_name !== '') {
                content += ' [' + v.domain_name + ']';
            }
            content += '" target="_blank" href="' + v.link + '">&#187; ' + v.title + '</a></li>';
        });
    }
    $('#entries').innerHTML = content;
};
/*exported m */
/*global jsInclude */
window.m = function(params) {
    'use strict';
    this.params = params || {};
    this.apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url=\'') + '|||FEED_URL|||' + encodeURIComponent('\'') + '&format=json&env=' + encodeURIComponent('store://datatables.org/alltableswithkeys');
    this.currentCategory = '';
    this.currentFeedIndex = '';
    this.currentFeedObject = {};

    this.run = function() {
        this[this.params.initFunction]();
    };

    this.getFeed = function(url) {
        url = this.apiUrl.replace('|||FEED_URL|||', encodeURIComponent(url));
        url += '&callback=' + this.params.feedCallback;
        url += '&_=' + new Date().valueOf();
        jsInclude(url);
    };
};
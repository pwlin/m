/*exported m */
/*global jsInclude */
window.m = function(params) {
    'use strict';
    this.params = params || {};
    // https://developer.yahoo.com/yql/guide/
    this.apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url=\'') + '|||FEED_URL|||' + encodeURIComponent('\'') + '&format=json&env=' + encodeURIComponent('store://datatables.org/alltableswithkeys');
    this.currentCateogry = Object.keys(this.feeds)[0];
    this.currentFeedIndex = 0;
    this.currentFeedObject = {};

    this.getFeed = function(url) {
        url = this.apiUrl.replace('|||FEED_URL|||', encodeURIComponent(url));
        url += '&callback=' + this.params.feedCallback;
        //url += '&_maxage=1800';
        //url += '&diagnostics=true&debug=true';
        url += '&_=' + new Date().valueOf();
        jsInclude(url);
    };
};
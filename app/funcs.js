/*exported $, inArray, jsInclude, qs, navigate, forEach, triggerEvent, isArray */
/*global qsCached, isArray */
window.$ = function(query, doc) {
    'use strict';
    doc = doc || document;
    query = doc.querySelectorAll(query);
    if (query.length === 1) {
        return query[0];
    }
    return query;
};

window.inArray = function(arr, obj) {
    'use strict';
    return arr.indexOf(obj) !== -1;
};

window.isArray = function(mix) {
    'use strict';
    return Array.isArray(mix);
};

window.inArrayPartial = function(arr, str) {
    'use strict';
    var i,
        k;
    if (!str || str.trim() === '') {
        return false;
    }
    for (i = 0, k = arr.length; i < k; i++) {
        if (str.indexOf(arr[i]) > -1) {
            return true;
        }
    }
    return false;
};

window.jsInclude = function(url) {
    'use strict';
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scriptElement);
};

window.qsCached = {};
window.qs = function(key, loc) {
    'use strict';
    var match;
    if (typeof qsCached[key] !== 'undefined') {
        return qsCached[key];
    }
    loc = loc || window.location.search;
    match = new RegExp('[?&]' + key + '=([^&]*)').exec(loc);
    if (isArray(match)) {
        match = decodeURIComponent(match[1].replace(/\+/g, ' '));
        qsCached[key] = match;
    } else {
        qsCached[key] = match;
    }
    return match;
};

window.navigate = function(url) {
    'use strict';
    document.location.replace(url);
};

window.forEach = function(obj, cb) {
    'use strict';
    var i,
        l,
        k;
    if (/String|Array/.test(Object.prototype.toString.call(obj))) {
        for (i = 0, l = obj.length; i < l; i++) {
            if (cb) {
                cb(i, obj[i]);
            }
        }
    } else {
        for (k in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                if (cb) {
                    cb(k, obj[k]);
                }
            }
        }
    }
};

window.triggerEvent = function(element, eventName) {
    'use strict';
    var evt;
    if ('createEvent' in document) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, false, true);
        element.dispatchEvent(evt);
    } else {
        element.fireEvent('on' + eventName);
    }
};

/*exported $, inArray, jsInclude, qs, navigate */
function $(query, doc) {
    'use strict';
    doc = doc || document;
    query = doc.querySelectorAll(query);
    if (query.length === 1) {
        return query[0];
    }
    return query;
}

function inArray(arr, obj) {
    'use strict';
    return (arr.indexOf(obj) !== -1);
}

function jsInclude(url) {
    'use strict';
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scriptElement);
}

function qs(key, loc) {
    'use strict';
    loc = loc || window.location.search;
    var match = new RegExp('[?&]' + key + '=([^&]*)').exec(loc);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function navigate(url) {
    'use strict';
    document.location.replace(url);
}

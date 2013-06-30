function $(q) {
    var query = document.querySelectorAll(q);
    if (query.length == 1) {
        return query[0];
    } else {
        return query;        
    }
};

function inc(url) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scriptElement);
};

function qs(key, loc) {
    loc = loc || window.location.search;
    var match = RegExp('[?&]' + key + '=([^&]*)').exec(loc);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

function navigate(url) {
    document.location.replace(url);
};

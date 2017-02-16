function $(query, doc) {
    doc = doc || document;
    query = doc.querySelectorAll(query);
    if (query.length === 1) {
        return query[0];
    } else {
        return query;
    }
}

function inArray(arr, obj) {
    return (arr.indexOf(obj) !== -1);
}

function JSInclude(url) {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scriptElement);
}

function qs(key, loc) {
    loc = loc || window.location.search;
    var match = new RegExp('[?&]' + key + '=([^&]*)').exec(loc);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function navigate(url) {
    document.location.replace(url);
}

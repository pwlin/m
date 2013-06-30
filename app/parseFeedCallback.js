function parseFeedCallback(feedKey, response) {
    //console.log(response);
    var feed = MReader.feeds[feedKey];
    var textColor = feed['textColor'] || '#000000';
    var content = '';
    content += '<ul class="items">';
    content += '<li style="color:' + textColor + ';">Latest Entries In ' + feed['feedName'] + ':</li>';
    var entries = response['feed']['entries'];
    for (var i = 0, k = entries.length; i < k ; i++) {
        content += '<li><a style="color:' + textColor + ';" href="' + entries[i]['link'] + '">&rsaquo;&rsaquo; ' + entries[i]['title'] + '</a></li>';
    };
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = ($('section#sidebar').offsetHeight) + 'px';    
    };
};
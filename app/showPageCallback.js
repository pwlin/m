/*jslint browser: true, devel: true, node: true, sloppy: true, plusplus: true, regexp: true*/
/*global $*/

function showAboutPage() {
    var content = '';
    content += '<ul class="items">';
    content += '<li><p>About MReader</p><p>This is a simple feed reader with the help of Google Feed API.</p>';
    content += '<p>The complete source code of this app is <a target="_blank" href="https://github.com/pwlin/m">hosted on GitHub</a>.</p></li>';
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
    if ($('article#maincolumn').offsetHeight < $('section#sidebar').offsetHeight) {
        $('article#maincolumn').style.height = ($('section#sidebar').offsetHeight) + 'px';
    }
}

function showPageCallback(pageName) {
    switch (pageName) {
    case 'about':
        showAboutPage();
        break;
    }
}
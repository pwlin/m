function showPageCallback(pageName) {
    switch(pageName) {
        case 'about' : 
            showAboutPage();
        break;
    };
};

function showAboutPage() {
    var content = '';
    content += '<ul class="items">';
    content += '<li>This is a simple Feed Reader with the Help of Google Feed API.</li>';
    content += '<li>The complete source code of this app is <a href="https://github.com/pwlin/m">hosted on GitHub</a>.</li>';
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
};
function showPageCallback(pageName) {
    switch(pageName) {
        case 'about' : 
            showAboutPage();
        break;
    };
    
};

function showAboutPage() {
    content = '';
    content += '<ul class="items">';
    content += '<li>This is a simple Feed Reader with the Help of Google Feed API.</li>';
    content += '<li>The complete source code of this app is <a href="#">hosted on Github</a>.</li>';
    content += '</ul>';
    $('article#maincolumn').innerHTML = content;
};
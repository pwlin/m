m.prototype.sidebarInit = function() {
	this.sidebarShowFeedsDropDown();
};

m.prototype.sidebarShowFeedsDropDown = function() {
	var i,
		k,
		content = '',
		self = this,
		selectedFeedKey;
	for (i = 0, k = this.feeds.length; i < k; i++) {
 		content += '<option value="' + i + '">' + this.feeds[i]['feedName'] + '</option>';
 	};
 	$('#feed-selector').innerHTML = content;
 	$("#feed-selector").addEventListener("change", function() {
 		try {
 			localStorage.setItem('sidebar-selected-feed', this.value);
 		} catch(e) {};
 		self.currentFeed = self.feeds[parseInt(this.value, 10)];
 		$('#entries').innerHTML = '<li>Loading...</li>';
 		self.getFeed(self.currentFeed.feedUrl);
 	});
 	try {
 		selectedFeedKey = parseInt((localStorage.getItem('sidebar-selected-feed') || '0'), 10);
 		$('#feed-selector [value="' + selectedFeedKey + '"]').selected = true; 
 	} catch(e) {
 		selectedFeedKey = 0;
 	};
 	this.currentFeed = this.feeds[selectedFeedKey];
 	$('#entries').innerHTML = '<li>Loading...</li>';
 	this.getFeed(self.currentFeed.feedUrl);
};

m.prototype.sidebarFeedCallback = function(response) {
	var entries = normalizeFeedEntries(this.currentFeed, response),
		i,
		k,
		content = '';
	//console.log(entries);
	for (i = 0, k = entries.length; i < k; i++) {
        content += '<li><a title="' + entries[i].title + '" target="_blank" href="' + (entries[i].comments || entries[i].link) + '">&#187; ' + entries[i].title + '</a></li>';
    };
    $('#entries').innerHTML = content;
};
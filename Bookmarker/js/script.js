// Listen for Form submit.
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

// Save Bookmarks
function saveBookmarks(e) {
	// Get Form Values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;
	
	if(!validateForm(siteName, siteURL)){
		return false;
	}
	
	var bookmark = {
					name: siteName, 
					url: siteURL
					}
	
	/*
		// Local Storage Test
		localStorage.setItem('test', 'Hooray! You did it. Now, You cannot retrieve it.');
		console.log(localStorage.getItem('test'));
		localStorage.removeItem('test');
	*/
	
	// Test if bookmarks is Null
	if(localStorage.getItem('bookmarks') === null){
		var bookmarks = [];
		// Add to Array
		bookmarks.push(bookmark);
		// Set to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmarks to Array
		bookmarks.push(bookmark);
		// Re-set back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	
	//Clear Form
	document.getElementById("myForm").reset();
	
	//Re-fetch Bookmarks
	fetchBookmarks();
	
	// Prevent Form from Submitting.
	e.preventDefault();
}

// Delete Bookmarks
function deleteBookmark(url) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through Bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			// Remove from Array
			bookmarks.splice(i, 1);
		}
	}
	// Re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	
	//Re-fetch Bookmarks
	fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Get Output ID
	var bookmarksResults = document.getElementById('bookmarksResults');
	// Build Output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;	
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class="well">'+'<h3>'+name+
		' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
		' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a> '+
		'</h3>'+'</div>';
	}
}

// Validate Form
function validateForm(siteName, siteURL) {
	if(!siteName || !siteURL){
		alert('Please fill in the form.');
		return false;
	}
	
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if(!siteURL.match(regex)){
		alert('Please used the valid URL.');
		return false;
	}
	
	return true;
}
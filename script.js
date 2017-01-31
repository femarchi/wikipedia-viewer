$(document).ready(function() {

	$("#random-btn").on("click", function(){
		loadResults("Random", 1);
	});

	// Search
	$("#search-btn").on("click", function(){
		query = $("#search-bar-txt").val();
		loadResults(query, 0);
	});

	$(document).keypress(function(event){
    if(event.which === 13){
    	event.preventDefault();
     $('#search-btn').click();
     //pressing enter functions as as click on search btn
    }
});
	
	goToURL = function(elem) {
		url = 'https://en.wikipedia.org/?curid=' + elem.id;
		window.location.href=url;
	}

	function loadResults (userQuery, isRandom){
		
		$("#search-app-wrapper").css("top", "5%");
		$("#app-title").css("visibility", "hidden");

		if(isRandom){
			dataURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=random&exsentences=1&exlimit=10&exintro=1&explaintext=1&exsectionformat=plain&grnnamespace=0&grnlimit=10";
								
		}else{
			dataURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&uselang=fr&prop=extracts&list=&titles="
								+ userQuery 
								+"&generator=search&exsentences=1&exlimit=10&exintro=1&explaintext=1&exsectionformat=plain&gsrsearch=" 
								+ userQuery;	
		}
		
		$.ajax({
	    url: dataURL,
	    queryData: userQuery,
	    type: 'GET',
	    dataType: 'jsonp',
	    headers: { 'USER123': 'USER123/1.0' },
	    success: function(data) {
	       // do something with data
	      $("#search-results").html("");
	      $("#search-results").css("margin-top", "160px");

	      $.each(data.query.pages, function(i, item) {
	       			$("#search-results").append('<div class="wiki-link row" id="'
	       																	+ item.pageid + '" onclick="goToURL(this)"><h2 class="wiki-title col-xs-12">'
	       																	+ item.title +'</h2><p class="wiki-content col-xs-12">' 
	       																	+ item.extract + '</p></a></div>');
	       			$("#search-results").css("visibility", "visible");
	        });
	    }

		}); //end of $.ajax

	}//end of loadResults

});//end of document.ready
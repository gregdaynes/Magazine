window.addEvent('domready', function() {
	
	var fetch_pages = function(pages) {
		pages.each(function(el) {
			fetch_page(el);
		});
	};
	
	var fetch_page = function(page) {
	
		if (page > 0) {
			page_content = new Request.HTML({
				method: 'get',
				url: '../../folder_iterator/clean_page.php',
				onComplete: function(response) {
					$(document).getElement('[id='+page+']').adopt(response);
				},
				onFailure: function() {
					$(document).getElement('[id='+page+']').addClass('disabled');
				}
			}).send('z='+config.zoom+'&p='+ page);		
		};
	}
					
	fetch_pages(new Array(config.page.left, config.page.right));
	
});
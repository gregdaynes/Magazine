window.addEvent('domready', function() {
	
	// initial vars
	var vars = new Object;
		vars.page		= 1, // page start
	    vars.zoom		= 0, // zoom level
		vars.layout		= 1; // layout
	
	// fixed elements
	var fixed_elements = new Object;
		fixed_elements.wrapper = $(document).getElement('[class=wrapper]');
	
	// navigation elements
	var nav_elements = new Object;
		nav_elements.prev = $('prev');
		nav_elements.next = $('next');
	
	// dynamic elements
	var dynamic_elements = new Object;
		dynamic_elements.page = new Element('div', {
			'class': 'page'
		});
		
	// initial layout
	var get_page = function() {
		
		for(i=0;i<vars.layout;i++) {
			clone_page = dynamic_elements.page.clone();
			
			if (i==0) {
				clone_page.addClass('left');
			} else {
				clone_page.addClass('right');
			}
			
			// clone_page needs content
			// ajax call to clean_page with params
			page_content = new Request.HTML({
				url: '../../folder_iterator/clean_page.php',
				onComplete: function(response) {
					clone_page.adopt(response);
				}
			}).get({
				'p': vars.page,
				'z': vars.zoom
			});
			
			fixed_elements.wrapper.empty();
			fixed_elements.wrapper.adopt(clone_page);		
		}
	}
	// execute ajax load
	get_page();
	
	// next page
	nav_elements.next.addEvent('click', function() {
		vars.page = vars.page + 1;
		get_page();
	});
	
	// prev page
	nav_elements.prev.addEvent('click', function() {
		vars.page = vars.page - 1;
		get_page();
		
	});
	
});
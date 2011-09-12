var sizeObject = {
	'-0': { x: 2048, y: 2669 },
	'-1': { x: 1638, y: 2135 },
	'-2': { x: 1310, y: 1708 },
	'-3': { x: 1048, y: 1366 },
	'-4': { x:  838, y: 1093 },
	'-5': { x:  670, y:  874 },
	'-6': { x:  536, y:  699 },
	'-7': { x:  429, y:  559 },
	'-8': { x:  343, y:  447 },
	'-9': { x:  274, y:  358 },
};

var pageSize = null,
    body = null,
    wrapper = null,
    zoomLevel = null,
    htmlBackgroundSize = false,
    pages = null,
    grid = null,
    gridCount = {};

var generateFunction = function() {	
	
	body = $(document).getElement('body');
	wrapper = $('wrapper');
	pages = wrapper.getChildren('div');
	pageSize = sizeObject['-0']; // max size predefined
    bodySize = body.getSize().x;
    
	// clean out each page
	pages.each(function(page) {
		page.empty();
	});	
	
	// find smallest usable size
	Object.some(sizeObject, function(subObj, key) {
		
		// find the smallest - make this better
		if (subObj.x > (bodySize / 2)) {
			pageSize = sizeObject[key];
			zoomLevel = key;
		} else {
			if (key = null) {
				pageSize = sizeObject['-9'];
			};
			return true;
		};
		
	});
	
	// number of grid items to generate
	gridCount.x = Math.ceil(pageSize.x / 256);
	gridCount.y = Math.ceil(pageSize.y / 256);
	
	// size wrapper
	wrapper.setStyles({
		width: pageSize.x * 2
	});
	
	// size page
	pages.each(function(page) {
		page.setStyles({
			width: pageSize.x,
			height: pageSize.y
		});
		

	});
	
	var row = new Element('div', { 
		styles: {
			width: gridCount.x * 256,
		},
		'class': 'row'
	});
	var col = new Element('div');
	
	pages.each(function(page) {

		// generate grid
		for(r=0;r<gridCount.y;r++) {
			
			tmp = row.clone();
			page.adopt(tmp);
			
			for(c=0;c<gridCount.x;c++) {
				tmp.adopt(col.clone().setProperties({
					id: 'r'+r + '_c'+c,
					'class': 'grid'
				}));
			}		
		};
	});
	
	grid = $(document).getElements('[class~=grid]');

	// scale grid
	scaler();

	// call for images
	imageRequest();	
	
	
};

var scaler = function() {    
    scalePercentage = body.getSize().x / (pageSize.x * 2);
    scale = 256 * scalePercentage;
    
    if (body.getSize().x > sizeObject['-9'].x ) {        
        
        // refetch larger
        if (scalePercentage > 1) {
            generateFunction();
        }
        
        // scale existing
        else if (scalePercentage > 0.8) {
            // resize wrapper
            wrapper.setStyles({
                'width': Math.ceil((sizeObject[zoomLevel].x * scalePercentage) * 2),
                'height': Math.ceil(sizeObject[zoomLevel].y * scalePercentage)
            });
            
            
            // resize pages
            pages.each(function(page) {
                page.setStyles({
                    'width': Math.floor(sizeObject[zoomLevel].x * scalePercentage),
                    'height': Math.floor(sizeObject[zoomLevel].y * scalePercentage)
                });
            
                // rows
                page.getChildren().each(function(row) {
                    row.setStyles({
                        'width': Math.ceil(gridCount.x * scale),
                        'height': Math.floor(scale)
                    });
                });
            });
                
                
            // resize grid
            grid.each(function(box) {
                box.setStyles({
                    'width': Math.floor(scale),
                    'height': Math.floor(scale)
                });
            });
            
        }
        
        // refetch smaller
        else {
            generateFunction();
        }
    
    };
};

var imageRequest = function() {

	windowScroll = window.getScroll();	
	
	// filter items
	visibleGrid = grid.filter(function(el, key) {
		elPos = el.getPosition();
		if (elPos.y <= (window.getSize().y + windowScroll.y)) {
			return true;
		}
	});

	// each grid	
	visibleGrid.each(function(el, i) {
	
		pageNumber = el.getParent('[class~=page]').getProperty('id');
	
		if (el.hasChildNodes() === false) {
			var id = el.getProperty('id').split('_');
			var row = id[0].substr(1);
			var col = id[1].substr(1);
			
			var imgRequest = new Request({
				url: '002.php',
				onComplete: function(response) {
					if (htmlBackgroundSize) {
						el.setStyles({
							'background-image':    'url('+response+')',
							'background-repeat':   'no-repeat',
							'background-position': 'top left',
						    'background-size':	   '100%'
						});
						el.set('html', '<em></em>'); // otherwise it will reload each grid on a scroll event
					} else {
						el.set('html', '<img src="'+response+'" style="width: 100%; height: 100%;" />');
					}
				
				}
			}).get({
				p: pageNumber,
				r: row,
				c: col,
				z: zoomLevel
			});
		}
	
	});
};


window.addEvent('load', function() {
	if ($$('html').hasClass('backgroundsize')) {
		htmlBackgroundSize = true;
	};

	generateFunction();
});

var timeout = false;

window.addEvent('resize', function() {
	if (timeout !== false) {
		clearTimeout(timeout);
	}
	
	timeout = scaler.delay(200);
});

window.addEvent('scroll', function() {
	imageRequest();
});
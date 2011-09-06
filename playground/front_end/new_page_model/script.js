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
    container = null,
    grid = null,
    zoomLevel = null;

var generateFunction = function() {	
	
	body = $(document).getElement('body');
	container = $('container');
	wrapper = $('wrapper');	
	pageSize = sizeObject[0]; // max size predefined
    	
	// clean out wrapper
	wrapper.empty();	
	
	// find smallest usable size
	Object.each(sizeObject, function(subObj, key) {
		
		// because the array is in order largest -> smallest
		// we can just replace the var each time we find a
		// smaller size
		if (subObj.x > body.getSize().x) {
			pageSize = sizeObject[key];
			zoomLevel = key;
		}		

	});
	
	// size container to page size
	container.setStyles({
		width: pageSize.x,
		height: pageSize.y
	});
	
	// number of grid items to generate
	gridX = Math.ceil(pageSize.x / 256);
	gridY = Math.ceil(pageSize.y / 256);
	
	// size wrapper
	wrapper.setStyles({
		width: gridX * 256,
		height: gridY * 256
	});
	
	var row = new Element('div', { class: 'row' });
	var col = new Element('div');
	
	// generate grid
	for(r=0;r<gridY;r++) {
		
		tmp = row.clone();
		wrapper.adopt(tmp);
		
		for(c=0;c<gridX;c++) {
			tmp.adopt(col.clone().setProperties({
				id: 'r'+r + '_c'+c,
				class: 'grid',
				text:  r+', '+c
			}));
		}		
	};
	
	// save grid for scaling
	grid = $(document).getElements('[class=grid]');
	
	// call for images
	imageRequest();	
	
	// scale grid
	scaler();
};

var scaler = function() {    
    scalePercentage = body.getSize().x / pageSize.x;
    
    if (scalePercentage < 1 && scalePercentage > 0.8) {
        
        scale = 256 * scalePercentage;	
        
        grid.each(function(el) {
        	el.setStyle('width', scale);
        	el.setStyle('height', scale);			
        });
        container.setStyles({
            width: pageSize.x * scalePercentage,
            height: pageSize.y * scalePercentage
        });
    } else {
        generateFunction();
    }
};

var imageRequest = function() {
	// each grid	
	grid.each(function(el, i) {
		
		var id = el.getProperty('id').split('_');
		var row = id[0].substr(1);
		var col = id[1].substr(1);
		
		var imgRequest = new Request({
			url: 'image.php',
			onComplete: function(response) {
				//el.set('html', response);
				el.set('html', '<img src="'+response+'" style="width: 100%; height: 100%;" />');
			}
		}).get({
			p: 1, // hardset page - only one during dev
			r: row,
			c: col,
			z: zoomLevel
		});

		
	});
};

window.addEvent('load', function() {
	generateFunction();
});

window.addEvent('resize', function() {
	scaler();
});
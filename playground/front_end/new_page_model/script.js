var generateFunction = function() {	
	var body = $(document).getElement('body');
	var wrapper = $('wrapper');
	
	
	
	// clean out wrapper
	wrapper.empty();
	
	var pageSize = sizeObject[0]; // max size predefined
	
	// find smallest usable size
	Object.each(sizeObject, function(subObj, key) {
		
		// because the array is in order largest -> smallest
		// we can just replace the var each time we find a
		// smaller size
		if (subObj.x > body.getSize().x) {
			pageSize = sizeObject[key];
		}		

	});
	
	// size container to page size
	$('container').setStyles({
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
	for(r=0;r<=gridY-1;r++) {
		
		tmp = row.clone();
		wrapper.adopt(tmp);
		
		for(c=0;c<=gridX-1;c++) {
			tmp.adopt(col.clone().setProperties({
				class: 'col_'+c,
				text:  r+', '+c
			}));
		}		
	};
	
	
	scale = body.getSize().x / pageSize.x;
	scale = 256 * scale;
	
	cols = $(document).getElements('[class~=row]').getElements('div');
	cols.each(function(el) {
		el.setStyle('width', scale);
		el.setStyle('height', scale);			
	});
	
};

var sizeObject = {
	 '0': { x: 2048, y: 2669 },
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

window.addEvent('load', function() {
	generateFunction();
});

window.addEvent('resize', function() {
	generateFunction();
});
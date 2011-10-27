/*!
 * Magazine
 * @author	  Gregory Daynes (http://jevolve.net)
 * @copyright Copyright (c) 2011 Gregory Daynes (gregdaynes at gmail dot com)
 * @license	  GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 * @requires  core/1.4
 */
var Magazine = new Class({

	Implements: [Options],

	options: {
		/* New */
		// define elements
		containerId:    'magazine', // ID top level container - holds navigation and page spread
		pageSpreadId:	  'spread', // ID page spread
		navigationId:   'navigation', // ID navigation
		pageClass:		  'page', // CLASS page
		
		pageCount:    2, // number of visible pages
		zoomLevels:   null, // zoom levels and their corrosponding dimensions
		selectedZoom: null, // current selected zoom level
		currentPage:  1, // current page
		pageExtras:   {}, // extra measurements of pages - padding, border, margin
		grid:         { 'x': 0, 'y': 0}, // current number of grid x and y
		gridSize:     256, // size of each grid square
		/**/
	},

	initialize: function(options) {
//		console.log('initialize');
		
		/* Setup options + elements */
		this.setOptions(options); // setup initial options
		this.options.container = $(this.options.containerId); // define the element
		/**/
		
		/* measure temporary page + delete */
		this.options.pageExtras = this.options.container // container
								  	.getElement('[class~=page]') // temporary page
								  	.getComputedSize({ // measure page dimensions + extras (page could be width:0 height:0)
								  		styles: ['padding', 'border', 'margin'] // we really only want margin:border:padding
								  	});
		
		this.options.container.empty(); // empty out the container
		/**/
		
		/* Define initial page sizes + scale etc */
		// windowSize.x - (pageExtras.x * pageCount) / pageCount = maxPageSize.x
		windowSize = window.getSize(); // x | y
		pageExtras = this.options.pageExtras; // computedLeft | computedRight | computedTop | computedBottom
					 pageExtras.x = pageExtras.computedLeft + pageExtras.computedRight;
					 pageExtras.y = pageExtras.computedBottom + pageExtras.computedTop;
		pageCount  = this.options.pageCount; // int
		maxPageSize = {
			'x': (windowSize.x - (pageExtras.x * pageCount)) / pageCount,
			'y': (windowSize.y - (pageExtras.y))
		};
		
		// compare zooms to find the best one
		// incorporate a -20% scaler | if x >= 0.8 && <= 1.0
		zoomLevels = this.options.zoomLevels
		selectedKey = null
		Object.each(zoomLevels, function(level, key) {
			if (level.x < maxPageSize.x && level.x > (maxPageSize.x * 0.8)) {
				selectedKey = key;
			}
		});
		this.options.selectedZoom = selectedKey;
		/**/
		
		this.initDrawNavigation();
		this.initDrawSpread();
		this.drawPages();
		this.drawGrid();
		this.scaleCheck();
		this.scale();
		this.fetchPages();
		
		
	},

	initDrawNavigation: function() {
//		console.log('initDrawNavigation');
		
		// local vars
		container = this.options.container;
		navigation = this.options.navigationId;
		magazine = this;
		
		// new elements
		var nav = new Element('nav', {
			id: navigation
		});
		
		var ul = new Element('ul');
		var li = [
			new Element('li', { 'class': 'button bf2', events: { 'click': function() { magazine.advancePage('previous'); }}, text: 'Previous' }),
			new Element('li', { 'class': 'bf3', text: '' }),
			new Element('li', { 'class': 'bf1', text: 'Zoom:' }),
			new Element('li', { 'class': 'button bf1', events: { 'click': function() { magazine.zoomIn(); }}, text: '+' }),
			new Element('li', { 'class': 'button bf1', events: { 'click': function() { magazine.zoomOut(); }}, text: '-' }),
			new Element('li', { 'class': 'button bf2', events: { 'click': function() { magazine.advancePage('next'); }}, text: 'Next' }),
		];
		
		// add elements to the dom
		nav.adopt( ul.adopt(li) );
		container.adopt(nav);
		
		// reload var to class
		this.options.navigation = nav;
	},
	
	/**
	 * initDrawSpread
	 *
	 * content wrapper - scales to match pages
	 * on init) scale to match window - pages match this
	 * on secondary) scales with pages ignores window bounds
	 */
	initDrawSpread: function() {
//		console.log('initDrawSpread');
	
		// local vars
		zoomLevel = this.options.zoomLevels[this.options.selectedZoom];
		pageExtras = this.options.pageExtras;
		pageSpread = this.options.pageSpread;
		container = this.options.container;
		
		if (pageSpread) {
			pageSpread.destroy();
		}
				
		pageSpread = new Element('div', {
			id: this.options.pageSpreadId,
			styles: {
				width: ((zoomLevel.x + (pageExtras.computedLeft + pageExtras.computedRight)) * this.options.pageCount), // (page width * number of pages)
			}
		});
		
		container.adopt(pageSpread);
		
		// reload var to class
		this.options.pageSpread = pageSpread;
	},

	drawPages: function() {
//		console.log('drawPages');
		
		// local vars
		zoomLevel = this.options.zoomLevels[this.options.selectedZoom];
		pageCount = this.options.pageCount;
		currentPage = this.options.currentPage;
		pageSpread = this.options.pageSpread;
				
		/* there can be no page 0 */
		if (currentPage <= 0) {
			currentPage = 1;
		} /**/

		/* 1 page minimum */
		if (pageCount === 1) {
			for(i=1; i<=pageCount; i++) {
				page = new Element('div', {
					'class': 'page',
					styles: {
						width: zoomLevel.x,
						height: zoomLevel.y
					}
				});

				pageSpread.adopt(page);
			}
		} /**/

		/* 2 pages */
		pageModifier = 0;
		if (pageCount === 2) {

			// page is NOT divisable by 2; / 1, 3, 5 etc.
			if ((currentPage) % 2) {
				pageModifier = -1;
			}

			for(i=0; i<pageCount; i++) {
				adjustedPageId = currentPage + pageModifier + i;

				page = new Element('div', {
					'class': 'page',
					id: adjustedPageId,
					styles: {
						width: zoomLevel.x,
						height: zoomLevel.y
					}
				});

				pageSpread.adopt(page);
			}
		} /**/

		/* 3 or more pages */
		pageModifier = 0;
		if (pageCount >= 3) {

			pagesLeft = Math.ceil((pageCount - 1) / 2);
			pagesRight = Math.floor((pageCount - 1) / 2);

			for(l=0; l<pagesLeft; l++) {
				adjustedPageId = currentPage - pagesLeft + l;

				page = new Element('div', {
					'class': 'page',
					id: adjustedPageId,
					styles: {
						width: zoomLevel.x,
						height: zoomLevel.y
					}
				});

				pageSpread.adopt(page);
			}

			page = new Element('div', {
				'class': 'page',
				id: currentPage,
				styles: {
					width: zoomLevel.x,
					height: zoomLevel.y,
				}
			});

			pageSpread.adopt(page);

			for(r=1; r<=pagesRight; r++) {
				adjustedPageId = currentPage + r;
				page = new Element('div', {
					'class': 'page',
					id: adjustedPageId,
					styles: {
						width: zoomLevel.x,
						height: zoomLevel.y
					}
				});

				pageSpread.adopt(page);
			}
		} /**/
		
		$(document).getElements('[class~=currentPage]').removeClass('currentPage');
		$(document).getElementById(this.options.currentPage).addClass('currentPage');
	},

	drawGrid: function() {
//		console.log('drawGrid');
		
		// local vars
		pages = $$('.page'); // array
		pageSize = pages[0].getSize(); // object
		gridSize = this.options.gridSize; // int
		grid = this.options.grid; // object x = int | y = int
		
		grid = {
			'x': Math.ceil(pageSize.x / gridSize),
			'y': Math.ceil(pageSize.y / gridSize)
		};

		var row = new Element('div', {
			styles: {
				width: grid.x * gridSize,
				height: gridSize
			},
			'class': 'row'
		});
		var col = new Element('div', {
			styles: {
				width: gridSize,
				height: gridSize
			},
			'class': 'box'
		});

		pages.each(function(page, i) {
			for(r=0; r<grid.y; r++) {

				var tmp = row.clone();
				page.adopt(tmp);

				for(c=0; c<grid.x; c++) {
					tmp.adopt(col.clone().setProperties({
						id: 'r'+r + '_c'+c
					}));
				}
			}
		}, this);
		
		// reload vars to class
		this.options.grid = grid;
	},
	
	scaleCheck: function() {
//		console.log('scaleCheck');
		
		// local vars
		pages = $$('.page');
		pageSize = pages[0].getSize();
		pageExtras = this.options.pageExtras;
		pageExtras.x = pageExtras.computedLeft + pageExtras.computedRight;
		viewPort = window.getSize();
		gridSize = this.options.gridSize;
		pageCount = this.options.pageCount;
				
		adjustedViewPort = viewPort.x - (pageExtras.x * pageCount)
		combinedPageWidths = pageSize.x * pageCount;
		scaleAmount = Math.floor((adjustedViewPort / combinedPageWidths) * 100) / 100;
		
		// reload vars to class
		this.options.scaleAmount = scaleAmount;
	},
	
	scale: function() {
//		console.log('initScale');
				
		if (scaleAmount < 0.8) {
			this.options.selectedZoom = parseFloat(this.options.selectedZoom) - 1;
			this.initDrawSpread();
			this.drawPages();
			this.drawGrid();
			this.scaleCheck();
			this.scale();
		} else if (scaleAmount > 1.0) {
			this.options.selectedZoom = parseFloat(this.options.selectedZoom) + 1;
			this.initDrawSpread();
			this.drawPages();
			this.drawGrid();
			this.scaleCheck();
			this.scale();
		} else {
			
			// local vars
			pageSize = pages[0].getSize();
			pageExtras = this.options.pageExtras;
			pageExtras.x = pageExtras.computedLeft + pageExtras.computedRight;
			gridSize = this.options.gridSize;
			pageCount = this.options.pageCount;
			scaleAmount = this.options.scaleAmount;
			combinedPageWidths = pageSize.x * pageCount;
			
			pageSpread.setStyles({
				width: Math.ceil(combinedPageWidths * scaleAmount) + (pageExtras.x * pageCount),
			});
					
			pageSpread.getChildren().each(function(page, i) {
				page.setStyles({
					width: Math.floor(pageSize.x * scaleAmount),
					height: Math.floor(pageSize.y * scaleAmount)
				});
				
				page.getChildren().each(function(row, i) {
					row.setStyles({
						width: Math.ceil((grid.x * gridSize) * scaleAmount),
						height: Math.floor(gridSize * scaleAmount)
					});
					
					row.getChildren().each(function(box, i) {
						
						box.setStyles({
							width: Math.floor(gridSize * scaleAmount),
							height: Math.floor(gridSize * scaleAmount)
						});
					});
					
				}, this);
			}, this);
			
		}
		/**/
	},
	
	fetchPages: function() {
		zoomLevel = this.options.selectedZoom;
		
		// each grid	
		$(document).getElements('div.box').each(function(el, i) {
			
			pageNumber = el.getParent('[class~=page]').getProperty('id');
		
			if (el.hasChildNodes() === false) {
				var id = el.getProperty('id').split('_');
				var row = id[0].substr(1);
				var col = id[1].substr(1);
				
				var imgRequest = new Request({
					url: '004.php',
					onComplete: function(response) {
						//if (htmlBackgroundSize) {
							el.setStyles({
								'background-image':    'url('+response+')',
								'background-repeat':   'no-repeat',
								'background-position': 'top left',
							    'background-size':	   '100%'
							});
						//	el.set('html', '<em></em>'); // otherwise it will reload each grid on a scroll event
						//} else {
						//	el.set('html', '<img src="'+response+'" style="width: 100%; height: 100%;" />');
						//}
					}
				}).get({
					p: pageNumber,
					r: row,
					c: col,
					z: zoomLevel
				});
			}
		
		});
	},
	
	advancePage: function(direction) {
		direction = direction;
//		console.log(direction);
		
		if (direction == 'next') {
			this.options.currentPage = this.options.currentPage + 1;
		} else if (direction == 'previous') {
			this.options.currentPage = this.options.currentPage - 1;
		}
		
		currentPage = $(document).getElementById(this.options.currentPage);
		
		$(document).getElements('[class~=currentPage]').removeClass('currentPage');
		if (currentPage == null) {
			pages = $$('.page');
			pages.each(function(el, i) {
				pageId = parseFloat(el.getProperty('id'));
				
				if (direction == 'next') {
					pageId = pageId + this.options.pageCount;
				} else if (direction == 'previous') {
					pageId = pageId - this.options.pageCount;
				}
				
				el.setProperty('id', pageId);
			}, this);
			
			this.fetchPages();

		}
		
		$(document).getElementById(this.options.currentPage).addClass('currentPage');
		
	},
	
	scaleSpread: function() {
		//pageSize = pages[0].getSize();
		pageSize = this.options.zoomLevels[this.options.selectedZoom];
		
		pageExtras = this.options.pageExtras;
		pageExtras.x = pageExtras.computedLeft + pageExtras.computedRight;
		//gridSize = this.options.gridSize;
		pageCount = this.options.pageCount;
		//scaleAmount = this.options.scaleAmount;
		combinedPageWidths = pageSize.x * pageCount;
		
		pageSpread.setStyles({
			width: Math.ceil(combinedPageWidths) + (pageExtras.x * pageCount),
		});
	},
	
	zoomIn: function() {
		this.options.selectedZoom = this.options.selectedZoom + 1;
		this.options.pageSpread.empty();
		this.scaleSpread();
		this.drawPages();
		this.drawGrid();
		this.fetchPages();
	},
	
	zoomOut: function() {
		this.options.selectedZoom = this.options.selectedZoom - 1;
		this.options.pageSpread.empty();
		this.scaleSpread();
		this.drawPages();
		this.drawGrid();
		this.fetchPages();
	},
});

window.addEvent('load', function() {

	/**
	 * 1) Get Zoom Levels from application
	 */
	var zoomLevels = new Request({
		url: 'params.php',
		onRequest: function() {
//			console.log('Getting Parameters...');
		},
		
		onComplete: function() {
			//console.log('Finished!');
		},
		
		onSuccess: function(response){ 
			//console.log(response);
			zoomLevels = JSON.decode(response);
			initialize();	
		},
		
		onError: function(text, error) {
			console.log('ERROR: '+error+' Text: '+text);
		}
	}).get();
	
	/**
	 * 2) Measure Window
	 */
	var windowSize = window.getSize();
	
	/**
	 * 3) Compare for largest zoom level
	 */
	var initialize = function() {
				
		Magazine = new Magazine({
			zoomLevels: zoomLevels,
			currentPage: 3,
		});
	};
	
	// load scroll.js for drag abilities
	var scrolljs = Asset.javascript('../../lib/js/scroll.js', {
	    onLoad: function(){
	        // make content scrollbox                    
	        new Drag.Scroll($('spread'));
	        
	        // must give scroll box height or it fails
	        var windowY = window.getSize().y,
	        	toolbarY = $('toolbar').getSize().y;
	        	
	        $('spread').setStyle('height', windowY - toolbarY);
	    }
	});

});
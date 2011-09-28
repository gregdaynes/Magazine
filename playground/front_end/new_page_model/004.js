/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, $: false, $$: false, Element: false, r: false, c: false */
/*jslint devel: true, browser: true, undef: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */

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
		pageCount:		 	2,
		container:		 	'magazine', // main container id
		zoomLevels:			null,
		selectedZoomLevel:	null,
		pageDimensions:		null,
		gridSize:		  	256,
		currentPage:	   	1,
		pageExtras:			{},
		grid:				{ 'x': 0, 'y': 0},
	},

	initialize: function(options) {
		this.setOptions(options);
		pageDimensions = this.options.pageDimensions;
		this.options.pageExtras.x = (pageDimensions['padding-left'] + pageDimensions['padding-right'])
								+ (pageDimensions['border-left-width'] + pageDimensions['border-right-width'])
								+ (pageDimensions['margin-left'] + pageDimensions['margin-right']);
		this.options.pageExtras.y = (pageDimensions['padding-top'] + pageDimensions['padding-bottom'])
								+ (pageDimensions['border-top-width'] + pageDimensions['border-bottom-width'])
								+ (pageDimensions['margin-top'] + pageDimensions['margin-bottom']);
		
		if (this.options.selectedZoomLevel.x === 0) {
			tmp = this.options.zoomLevels['-0'];
			ratio = tmp.y / tmp.x;
			extras = this.options.pageExtras.x;
			windowSize = window.getSize().x;
			
			availableSpace = windowSize - (this.options.pageCount * extras);
			pageWidth = Math.floor(availableSpace / this.options.pageCount);
			
			this.options.selectedZoomLevel.level = 0;
			Object.append(this.options.zoomLevels, {
				'0': {
					'x': pageWidth,
					'y': (pageWidth * ratio)
				}
			});
		}
		
		this.container = $(this.options.container).empty();
		this.pageSpread = null;

		this.drawNavigation();
		this.drawSpread();
		this.drawPages();
		this.drawGrid();
		scale = this.scale();
		
		
	},

	drawNavigation: function() {
		console.log('Drawing navigation');
	},

	drawSpread: function() {
		console.log('Drawing page spread');
		
		console.log(this.options.zoomLevels);
		
		this.pageSpread = new Element('div', {
			'class': 'pagespread',
			styles: {
				width: ((this.options.zoomLevels[this.options.selectedZoomLevel.level].x + this.options.pageExtras.x) * this.options.pageCount), // (page width * number of pages)
				height: (this.options.zoomLevels[this.options.selectedZoomLevel.level].y + this.options.pageExtras.y)
			}
		});

		this.container.adopt(this.pageSpread);
	},

	drawPages: function() {
		console.log('Drawing pages');

		/* there can be no page 0 */
		if (this.options.currentPage <= 0) {
			this.options.currentPage = 1;
		} /**/

		/* 1 page minimum */
		if (this.options.pageCount === 1) {
			for(i=1; i<=this.options.pageCount; i++) {
				page = new Element('div', {
					'class': 'page',
					styles: {
						width: this.options.zoomLevels[this.options.selectedZoomLevel.level].x,
						height: this.options.zoomLevels[this.options.selectedZoomLevel.level].y
					}
				});

				this.pageSpread.adopt(page);
			}
		} /**/

		/* 2 pages */
		pageModifier = 0;
		if (this.options.pageCount === 2) {

			// page is NOT divisable by 2; / 1, 3, 5 etc.
			if ((this.options.currentPage) % 2) {
				pageModifier = -1;
			}

			for(i=0; i<this.options.pageCount; i++) {
				adjustedPageId = this.options.currentPage + pageModifier + i;

				page = new Element('div', {
					'class': 'page',
					id: adjustedPageId,
					styles: {
						width: this.options.zoomLevels[this.options.selectedZoomLevel.level].x,
						height: this.options.zoomLevels[this.options.selectedZoomLevel.level].y
					}
				});

				this.pageSpread.adopt(page);
			}
		} /**/

		/* 3 or more pages */
		pageModifier = 0;
		if (this.options.pageCount >= 3) {

			pagesLeft = Math.ceil((this.options.pageCount - 1) / 2);
			pagesRight = Math.floor((this.options.pageCount - 1) / 2);

			for(l=0; l<pagesLeft; l++) {
				adjustedPageId = this.options.currentPage - pagesLeft + l;

				page = new Element('div', {
					'class': 'page',
					id: adjustedPageId,
					styles: {
						width: this.options.zoomLevels[this.options.selectedZoomLevel.level].x,
						height: this.options.zoomLevels[this.options.selectedZoomLevel.level].y
					}
				});

				this.pageSpread.adopt(page);
			}

			page = new Element('div', {
				'class': 'page',
				id: this.options.currentPage,
				styles: {
					width: this.options.zoomLevels[this.options.selectedZoomLevel.level].x,
					height: this.options.zoomLevels[this.options.selectedZoomLevel.level].y
				}
			});

			this.pageSpread.adopt(page);

			for(r=0; r<pagesRight; r++) {
				adjustedPageId = this.options.currentPage + pagesRight + r;

				page = new Element('div', {
					'class': 'page',
					id: adjustedPageId,
					styles: {
						width: this.options.zoomLevels[this.options.selectedZoomLevel.level].x,
						height: this.options.zoomLevels[this.options.selectedZoomLevel.level].y
					}
				});

				this.pageSpread.adopt(page);
			}
		} /**/
	},

	drawGrid: function() {
		console.log('Drawing grid');

		pageWidth = this.options.zoomLevels[this.options.selectedZoomLevel.level].x;
		pageHeight = this.options.zoomLevels[this.options.selectedZoomLevel.level].y;

		this.options.grid = {
			'x': Math.ceil(pageWidth / this.options.gridSize),
			'y': Math.ceil(pageHeight / this.options.gridSize)
		};

		var row = new Element('div', {
			styles: {
				width: this.options.grid.x * this.options.gridSize,
				height: this.options.gridSize
			},
			'class': 'row'
		});
		var col = new Element('div', {
			styles: {
				width: this.options.gridSize,
				height: this.options.gridSize
			},
			'class': 'box'
		});

		$(document).getElements('div.page').each(function(page, i) {
			for(r=0; r<this.options.grid.y; r++) {

				var tmp = row.clone();
				page.adopt(tmp);

				for(c=0; c<this.options.grid.x; c++) {
					tmp.adopt(col.clone().setProperties({
						id: 'r'+r + '_c'+c
					}));
				}
			}
		}, this);
	},
	
	scale: function() {	
		pageSize = this.options.zoomLevels[this.options.selectedZoomLevel.level];
		pageExtras = this.options.pageExtras;
		viewPort = window.getSize();
		gridSize = this.options.gridSize;
		
		adjustedViewPort = viewPort.x - (pageExtras.x * this.options.pageCount)
		combinedPageWidths = pageSize.x * this.options.pageCount;
		
		scaleAmount = Math.floor((adjustedViewPort / combinedPageWidths) * 100) / 100;
		
		this.pageSpread.setStyles({
			width: Math.ceil(combinedPageWidths * scaleAmount) + (pageExtras.x * this.options.pageCount),
			//height: viewPort.y
		});
				
		this.pageSpread.getChildren().each(function(page, i) {
			page.setStyles({
				width: pageSize.x * scaleAmount,
				height: pageSize.y * scaleAmount
			});
			
			page.getChildren().each(function(row, i) {
				row.setStyles({
					width: Math.ceil((this.options.grid.x * gridSize) * scaleAmount),
					height: Math.ceil(gridSize * scaleAmount)
				});
				
				row.getChildren().each(function(box, i) {
					box.setStyles({
						width: Math.floor(gridSize * scaleAmount),
						height: Math.ceil(gridSize * scaleAmount)
					});
				});
				
			}, this);
		}, this);
	}
});

window.addEvent('load', function() {

	/**
	 * 1) Get Zoom Levels from application
	 */
	var zoomLevels = new Request({
		url: 'params.php',
		onRequest: function() {
			console.log('Getting Parameters...');
		},
		
		onComplete: function() {
			console.log('Finished!');
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
		var pageCount = 2;
		var pageDimensions = $('tmp').getComputedSize({
							 	 styles: ['padding', 'border', 'margin']
							 });
		var zoomLevel = { 'x': 0 };		
				
		pagePadding = pageDimensions['padding-left'] + pageDimensions['padding-right'];
		pageBorder = pageDimensions['border-left-width'] + pageDimensions['border-right-width'];
		pageMargin = pageDimensions['margin-left'] + pageDimensions['margin-right'];		
		pageExtras = pagePadding + pageBorder + pageMargin; // (padding, border, margin) left + right * page count

		Object.each(zoomLevels, function(level, key) {
						
			if (windowSize.x >= (level.x * pageCount + (pageExtras * pageCount))) {
				
				if (level.x > zoomLevel.x) {
					zoomLevel = {
						'level': key,
						'x': level.x,
						'y': level.y
					};
				}
			}
		});
				
		Magazine = new Magazine({
			pageCount: pageCount,
			zoomLevels: zoomLevels,
			selectedZoomLevel: zoomLevel,
			pageDimensions: pageDimensions,			
			container:	'magazine', // main container id
			gridSize: 	  256,
			currentPage:  31,
		});
	};
	
});

var timeout = false;

window.addEvent('resize', function() {
    if (timeout !== false) {
        clearTimeout(timeout);
    }
    
    timeout = Magazine.scale.delay(200, Magazine);
});

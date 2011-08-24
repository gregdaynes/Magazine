//
/*!
 * Pages
 * @author	  Gregory Daynes (http://jevolve.net)
 * @copyright Copyright (c) 2011 Gregory Daynes (gregdaynes at gmail dot com)
 * @license	  GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 * @requires  core/1.3
 */
var Pages = new Class({
	
	Implements: [Options],
	
	options: {
		// Elements
		container:    'container', // main container id
		wrapperClass: 'wrapper',   // class to assign wrapper
		pageClass:    'page',	   // class to assign pages
		
		// page measurements
		pageSize: { 
			'padding': { 'x': 0, 'y': 0},
			'margin':  { 'x': 0, 'y': 0},
			'border':  { 'x': 0, 'y': 0}},
		
		// page options
		currentPage:  1, // initial page
		visiblePages: 2, // initial number of pages to display
		currentZoom: -3, // initial zoom level
		zoomLevels: {
			'-3': { 'x': 220,	'y': 286 },
			'-2': { 'x': 252,	'y': 328 },
			'-1': { 'x': 284,	'y': 370 },
			 '0': { 'x': 436,	'y': 568 },
			 '1': { 'x': 630,	'y': 821 },
			 '2': { 'x': 728,	'y': 949 },
			 '3': { 'x': 1024, 'y': 1335 },	
			 '4': { 'x': 2048, 'y': 2669 }},
			 
		// general options
		logging: true // enable logging
	},
	
	/**
	 * initailize
	 *
	 * event
	 * 
	 * define options, major elements
	 * setup the environment
	 */
	initialize: function(options) {
		
		// define options
		this.setOptions(options);
		
		// define major elements
		this.container = document.id(this.options.container);
		
		// setup environment
		this.setup();
	},
	
	/**
	 * setup
	 * 
	 * event
	 *
	 * setup environment by performing a list of functions on load
	 */
	setup: function() {
		// start logging
		this.log(['start']);
		
		// create wrapper
		var initWrapper = this.initializeWrapper();
		if (!initWrapper) {
			this.log(['comment', 'initializeWrapper failed']);
			return false;
			};
		
		// measure and define pageSize
		var measurePage = this.measurePage();
		if (!measurePage) {
			this.log(['comment', 'measurePage failed']);
			return false;
			};
		
		// resize wrapper to fit contents
		var resizeWrapper = this.sizeWrapper();
		if (!resizeWrapper) {
			this.log(['comment', 'sizeWrapper failed']);
			return false;
			};
		
		// get page contents
		var loadPage = this.loadPageContent();
		if (!loadPage) {
			this.log(['comment', 'loadPageContent failed']);
			return false;
			}
			
		// stop logging
		this.log(['stop']);
	},
	
	/**
	 * initializeWrapper
	 *
	 * function
	 *
	 * create a new child element of container called wrapper 
	 */
	initializeWrapper: function() {
		// start logging
		this.log(['function', 'initializeWrapper']);
		
		// new wrapper element
		this.wrapper = new Element('div', {
			'class': this.options.wrapperClass
			});
		
		// get container -> adopt new wrapper element
		if (this.container.adopt(this.wrapper)) {
			this.log(['comment', 'container adopted wrapper']);
			return true;
			};
		
		// adoption failed
		this.log(['comment', 'container failed to adopt wrapper']);
		return false;
		
	},
	
	/**
	 * measurePage
	 *
	 * function
	 * 
	 * create an hidden, empty page as a child of wrapper, with pageClass
	 * measure page width and height including margin, padding and border widths
	 * assign measurments to options for later use and finally delete new page
	 */
	measurePage: function() {
		// start logging
		this.log(['function', 'measurePage']);
		
		// new page element
		page = new Element('div', {
			'class': this.options.pageClass+' measure',
			styles: {
				'width': this.options.zoomLevels[this.options.currentZoom].x,
				'height': this.options.zoomLevels[this.options.currentZoom].y,
				'display': 'hidden'
				}
			});
			this.log(['comment', 'measuring page created']);
		
		// wrapper -> adopt new page element
		if (this.wrapper.adopt(page)) {
			this.log(['comment', 'measuring page adopted']);
			
			// measure page
			pageMeasurements = page.getComputedSize({
				'styles': ['margin', 'padding', 'border']
				});
				this.log(['comment', 'measuring page measured']);
			
			// define pageSize for later use
			this.pageSize = {
				'border': {
					'x': pageMeasurements['border-left-width'] + pageMeasurements['border-right-width'],
					'y': pageMeasurements['border-top-width'] + pageMeasurements['border-bottom-width']
					},
				'margin': {
					'x': pageMeasurements['margin-left'] + pageMeasurements['margin-right'],
					'y': pageMeasurements['margin-top'] + pageMeasurements['margin-bottom']
					},
				'padding': {
					'x': pageMeasurements['padding-left'] + pageMeasurements['padding-right'],
					'y':	pageMeasurements['padding-top'] + pageMeasurements['padding-bottom']
					} 
				};
				this.log(['comment', 'pageSize defined']);
			
			// destroy new page element
			var destroy_page = page.destroy();
			if (!destroy_page) {
				this.log(['comment', 'measuring page destroyed']);
				return true;
				};
			
			this.log(['comment', 'failed to destroy measuring page']);
			return false;
			
			};
		
		// adoption failed
		this.log(['comment', 'wrapper failed to adopt measuring page']);
		return false;
	},
	
	/**
	 * sizeWrapper
	 *
	 * function
	 * 
	 * resize the wrapper element based on page width and height from current
	 * zoom level plus border widths, margin widths and padding widths
	 */
	sizeWrapper: function() {
		// start logging
		this.log(['function', 'sizeWrapper']);
		
		// get existing dimensions
		var pageWidth = this.options.zoomLevels[this.options.currentZoom].x,
			pageHeight = this.options.zoomLevels[this.options.currentZoom].y,
			borderX = this.pageSize.border.x,
			borderY = this.pageSize.border.y,
			marginX = this.pageSize.margin.x,
			marginY = this.pageSize.margin.y,
			paddingX = this.pageSize.padding.x,
			paddingY = this.pageSize.padding.y,
			
			// define new page dimensions
			newPageWidth = pageWidth + borderX + marginX + paddingX,
			newPageHeight = pageHeight + borderY + marginY + paddingX;
			this.log(['comment', 'dimensions defined']);
		
		// set wrapper size	
		var wrapper = this.wrapper.setStyles({
					      'width':  newPageWidth * this.options.visiblePages,
					      'height': newPageHeight
					      });
		if (wrapper) {
			this.log(['comment', 'wrapper resized']);
			return true;
			};
		
		this.log(['comment', 'wrapper failed to resize']);
		return false;
	},
	
	/**
	 * loadPageContent
	 *
	 * function
	 * 
	 * checks wrapper for pages, and generates them if necessary. If pages are
	 * found loadPageContent() goes through each one and assigns the page and Id.
	 * once each page has an Id, requestPageContent() is fired.
	 */
	loadPageContent: function() {
		// start logging
		this.log(['function', 'loadPageContent']);
		
		// find pages with pageClass
		pages = this.wrapper.getChildren('.'+this.options.pageClass);
		
		// if pages are found and we have the number of pages we need
		if (pages.length >= this.options.visiblePages) {		
			this.log(['comment', 'sufficient pages found']);
			
			/**
			 * logic
			 *
			 * handle multiple pages with left and righthand page assignment
			 */
			pageModifier = 0;
			if (this.options.visiblePages >= 2) {
				
				// page is NOT divisable by 2; / 1, 3, 5 etc.
				if ((this.options.currentPage) % 2) {
					pageModifier = -1;
					this.log(['comment', 'pageModifier changed']);
					
					};
				};
			
			
			pages.each(function(page, i) { // bound to this
				
				// there can be no page 0
				if (this.options.currentPage <= 0) {				
					this.options.currentPage = 1;
					this.log(['comment', 'page 0 set to 1']);
					};
				
				
				// define new page id
				newPageId = this.options.currentPage + pageModifier + i;
				
				// set page with new id
				var setPageId = pages[i].set('id', newPageId);
				if (!setPageId) {
					this.log(['comment', 'failed to set page with new id']);
					return false;
					};
				
				this.log(['comment', 'page set id: '+newPageId]);
				
				}.bind(this));
			
			this.log('	pages setup');
			this.requestPageContent();
						
		} else { // generate pages - then come back and check if there are pages
			
			this.log('	not enough pages in wrapper');
			
			var generatePages = this.generatePages();
			if (generatePages) {
				this.log('	pages generated');
			}
			
			this.log('	checking for correct page count');
			this.loadPageContent();
		}
		
		return true;
	},
	
	sizePages: function() {
		this.log('sizePages()');
		
		this.log('	each page loop');
		this.wrapper.getChildren().each(function(page, i) {
			var setPageSize = page.setStyles({
									'width': this.options.zoomLevels[this.options.currentZoom].x,
									'height': this.options.zoomLevels[this.options.currentZoom].y
								});
			if (!setPageSize) {
				this.log('	page ' + page.getProperty('id') + ' failed to resize');
				return false;
			}
			this.log('	page ' + page.getProperty('id') + ' resized');
		}.bind(this));
		
		this.log('	pages resized');
		
		return true;
	},
	
	generatePages: function() {
		
		this.log('generatePages()');
		
		var emptyWrapper = this.wrapper.empty();
		
		if (!emptyWrapper) {
			this.log('	wrapper failed to empty');
			return false;
			
		} else {
			this.log('	wrapper emptied');
		}
		
		this.log('	looping page creation');
		
		for(i=0;i<this.options.visiblePages;i++) {
			
			this.log('	creating page '+(i+1));
							
			var newPage	= this.wrapper.adopt(new Element('div', {
								'class':	this.options.pageClass,
								'styles': {
									'width': this.options.zoomLevels[this.options.currentZoom].x,
									'height': this.options.zoomLevels[this.options.currentZoom].y
								}
							}).addClass('zoom_'+this.options.currentZoom));
			
			if (newPage) {
				this.log('	page '+(i+1)+' created');			
			} else {
				this.log('	failed to create page '+(i+1));
				return false;
			}
		}
		
		this.log('	pages created');
		return true;
	},
	
	requestPageContent: function() {
		this.log('requestPageContent()');
		
		this.log('	each page loop');		
		this.wrapper.getChildren().each(function(page) { // bound
			
			var pageId = page.getProperty('id');
			if (!pageId) {
				this.log('	no page id, can\'t continue');
				return false;
			};
			
			var emptyPage = page.empty();
			if (!emptyPage) {
				this.log('	page could not be emptied');
				return false;
			}
			
			this.log('	starting request');
						
			new Request.HTML({
				url: '../../folder_iterator/clean_page.php',
				onSuccess: function(response) {
					var adoptResponse = page.adopt(response);
				}
			}).get({
				'p': pageId,
				'z': this.options.currentZoom
			});
		}.bind(this));
		
		this.log('	finished requestPageLoop');
		return true;
	},	
	
	advance: function(direction) {
		this.log('start');
		this.log('advance()');
		this.log('	current page ' + this.options.currentPage);
		
		this.options.currentPage = this.options.currentPage + (direction * this.options.visiblePages);
		
		this.log('	next page ' + this.options.currentPage);
		
		var loadPage = this.loadPageContent();
		
		if (!loadPage) {
			this.log('page failed to advance ' + direction);
			this.log('stop');
			return false;
		}
		
		this.log('page advanced '+direction);
		this.log('stop');
		return true;
	},
	
	zoom: function(direction) {
		this.log('start');
		this.log('zoom()');
		this.log('	current zoom ' + this.options.currentZoom);
		
		this.options.currentZoom = this.options.currentZoom + direction;
		
		this.log('	next zoom ' + this.options.currentZoom);
		
		var sizeWrapper = this.sizeWrapper();
		
		if (!sizeWrapper) {
			this.log('zoom failed to resize wrapper');
			this.log('stop');
			return false;
		}
		
		var sizePages = this.sizePages();
		
		if (!sizePages) {
			this.log('zoom failed to resize pages');
			this.log('stop');
			return false;
		}
		
		var loadPage = this.loadPageContent();
		
		if (!loadPage) {
			this.log('zoom failed to reload pages');
			this.log('stop');
			return false;
		}
		
		this.log('zoom changed ' + direction);
		this.log('stop');
		
		return true;		
	},
	
	log: function(commandArray) {
		if (this.options.logging) {
			if (!this.consoleLog) {
				this.consoleLog = [];
			};
			
			if (commandArray.length == 1) {
				if (commandArray[0] == 'start') {
					this.consoleLog.empty();
					console.log('--- START OF LOG ---');
				}
				
				if (commandArray[0] == 'stop') {
					this.consoleLog.each(function(message, i) {
						console.log(message);
					});
					console.log('--- END OF LOG ---');
				}
			} else {
				logPrefix = '';
				if (commandArray[0] === 'function') {
					logPrefix = 'function: ';
				} else {
					logPrefix = '          ';
				}
									
				this.consoleLog.push(logPrefix+commandArray[1]);
			}
		};
	}
});
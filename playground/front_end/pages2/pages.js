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
		logging: true, // enable logging
		pageUrl: 'http://localhost/'
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
			};
			
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
	 * measure page width and height including margin, padding and border
	 * widths assign measurments to options for later use and finally
	 * delete new page
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
		
		// wrapper -> adopt new page element
		if (this.wrapper.adopt(page)) {
			
			// measure page
			pM = page.getComputedSize({
				'styles': ['margin', 'padding', 'border']
				});
			
			// define pageSize for later use
			this.pageSize = {
				'border': {
					'x': pM['border-left-width'] + pM['border-right-width'],
					'y': pM['border-top-width']  + pM['border-bottom-width']
					},
				'margin': {
					'x': pM['margin-left'] + pM['margin-right'],
					'y': pM['margin-top']  + pM['margin-bottom']
					},
				'padding': {
					'x': pM['padding-left'] + pM['padding-right'],
					'y': pM['padding-top']  + pM['padding-bottom']
					} 
				};
			
			// destroy new page element
			var destroy_page = page.destroy();
			if (!destroy_page) {
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
			newPageHeight = pageHeight + borderY + marginY + paddingY;
				
		// set wrapper size	
		var wrapper = this.wrapper.setStyles({
					      'width':  newPageWidth * this.options.visiblePages,
					      'height': newPageHeight
					      });
		if (wrapper) {
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
	 * found loadPageContent() goes through each one and assigns the page and
	 * Id. once each page has an Id, requestPageContent() is fired.
	 */
	loadPageContent: function() {
		// start logging
		this.log(['function', 'loadPageContent']);
		
		// find pages with pageClass
		pages = this.wrapper.getChildren('.'+this.options.pageClass);
		
		// if pages are found and we have the number of pages we need
		if (pages.length == this.options.visiblePages) {		
			
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
				
			}.bind(this));
						
			// get page content
			var pageContent = this.requestPageContent();
			if (!pageContent) {
				this.log(['comment', 'requestPageContent failed']);
				return false;
			}
		} else { 
			
			// not enough / no pages found
			this.log(['comment', 'insufficient page count']);
			
			// generate pages
			var generatePages = this.generatePages();
			if (!generatePages) {
				this.log(['comment', 'generatePages failed']);
				return false;
				};
			
			// go back to the beginning and check again
			this.loadPageContent();
		}
		
		return true;
	},
	
	/**
	 * generatePages
	 *
	 * function
	 * 
	 * create new page elements to satisfy the loadPageContent function
	 */
	generatePages: function() {
		// start logging
		this.log(['function', 'generatePages']);
		
		// clear existing pages
		var emptyWrapper = this.wrapper.empty();
		if (!emptyWrapper) {
			this.log(['comment', 'failed clearing wrapper contents']);
			return false;
			};
		
		// zoom levels
		var zoomX = this.options.zoomLevels[this.options.currentZoom].x,
			zoomY = this.options.zoomLevels[this.options.currentZoom].y
		
		for(i=0;i<this.options.visiblePages;i++) {
			
			// new page element			
			var newPage	= this.wrapper.adopt(new Element('div', {
						      'class':  this.options.pageClass,
							  'styles': {
							      'width':  zoomX,
							      'height': zoomY
						          }}));
			if (!newPage) {
				this.log(['comment', 'failed to create page '+(i+1)]);
				return false;
				};
		};
		
		return true;
	},
	
	/**
	 * requstPageContent
	 *
	 * function
	 * 
	 * request html to place inside page
	 */
	requestPageContent: function() {
		// start logging
		this.log(['function', 'requestPageContent']);
		
		// get pages
		this.wrapper.getChildren().each(function(page) { // bound
			
			// check page has id
			var pageId = page.getProperty('id');
			if (!pageId) {
				this.log(['comment', 'no page id']);
				return false;
				};
			
			// empty page of previous content
			var emptyPage = page.empty();
			if (!emptyPage) {
				this.log(['comment', 'page could not be emptied']);
				return false;
				};
								
			// html request
			// note: can't log actions in this
			var pageRequest = new Request.HTML({
				url: this.options.pageUrl,
				onSuccess: function(response) {
					page.adopt(response);
					},
				onFailure: function() {
					}
			}).get({
				'p': pageId,
				'z': this.options.currentZoom
				});
			
		}.bind(this));
		
		return true;
	},
	
	/**
	 * sizePages
	 *
	 * function
	 * 
	 * change the size of the current pages and adjust pageSize
	 */
	sizePages: function() {
		// start logging
		this.log(['function', 'sizePages']);
		
		// zoom levels
		var zoomX = this.options.zoomLevels[this.options.currentZoom].x,
			zoomY = this.options.zoomLevels[this.options.currentZoom].y
		
		// resize each page
		this.wrapper.getChildren().each(function(page) {
			var setPageSize = page.setStyles({
							      'width': zoomX,
								  'height': zoomY
								  });
			if (!setPageSize) {
				this.log(['function', 'failed to resize page']);
				return false;
			    };
			    
		}.bind(this));
				
		return true;
	},
	
	/**
	 * advance
	 *
	 * function
	 * 
	 * advance page by direction
	 */
	advance: function(direction) {
		// start logging
		this.log(['function', 'advance']);
		
		// update current page
		currentPage = this.options.currentPage;
		nextPage	= direction * this.options.visiblePages;
		this.options.currentPage = currentPage + nextPage;
				
		// load page
		var loadPage = this.loadPageContent();
		if (!loadPage) {
			this.log(['comment', 'failed to advance page]']);
			return false;
			};
		
		return true;
	},
	
	/**
	 * zoom
	 *
	 * function
	 * 
	 * zoom page by direction.
	 */
	zoom: function(direction) {
		// start logging
		this.log(['function', 'zoom']);
		
		
				
		// update currentZoom
		this.options.currentZoom = this.options.currentZoom + direction;
		
		// resize wrapper
		var sizeWrapper = this.sizeWrapper();
		if (!sizeWrapper) {
			this.log(['comment', 'failed to resize wrapper']);
			return false;
			};
		
		// resize pages
		var sizePages = this.sizePages();
		if (!sizePages) {
			this.log(['comment', 'failed to resize pages']);
			return false;
			};
		
		// load page contents
		var loadPage = this.loadPageContent();
		if (!loadPage) {
			this.log(['comment', 'failed to load page content']);
			return false;
			};
		
		$(document).fireEvent('zoom');
		
		return true;		
	},
	
	/**
	 * log
	 *
	 * function
	 * 
	 * create and output a log of events, functions and actions performed
	 */
	log: function(commandArray) {
	
		// logging enabled
		if (this.options.logging === true) {
			
			// create log if not found
			if (!this.consoleLog) {
				this.consoleLog = [];
				};
			
			// start / stop commands
			if (commandArray.length == 1) {
				
				// start log
				if (commandArray[0] == 'start') {
					// empty log
					this.consoleLog.empty();
					
					// output start to console
					console.log('--- START OF LOG ---');
					};
				
				// stop log
				if (commandArray[0] == 'stop') {
					
					// output current log to console
					this.consoleLog.each(function(message, i) {
						console.log(message);
					});
					console.log('--- END OF LOG ---');
					};
			} else {
				
				// log comments
				logPrefix = '';
				
				// function or '10 spaces' (length of word string "function: "
				if (commandArray[0] === 'function') {
					logPrefix = 'function: ';
					} else {
					logPrefix = '          ';
					};
				
				// append comment to log		
				this.consoleLog.push(logPrefix+commandArray[1]);
			};
		};
	}
});
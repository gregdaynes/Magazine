/*!
 * Pages.Keybindings
 *
 * extends Pages class with keyboard support
 *
 * @author	  Gregory Daynes (http://jevolve.net)
 * @copyright Copyright (c) 2011 Gregory Daynes (gregdaynes at gmail dot com)
 * @license	  GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 * @requires  core/1.3, pages
 */
var Pages = new Class(
{
	Extends: Pages,
	
	options: {
		keys: {
			previous:	['p', 'left'],
			next:		['n', 'right'],
			zoomIn:		['=', 'up'],
			zoomOut:	['-', 'down'],
			toolBar:	['t'],
			singlePage:	['s'],
			doublePage:	['d']
		}
	},
	
	/**
	 * initailize
	 *
	 * event
	 * 
	 * assign each key an event
	 */
	initialize: function(options) {
	   
		// define options
		this.parent(options);
		
		// start logging
		this.log(['start']);
		
		// add document keydown event
		$(document).addEvent('keydown', function(event) { // bound
		 	
		 	// each key gets a function
			Object.each(this.options.keys, function(option, id) { // bound
				
				// check option is an array
				if (option.length >= 0) {
					
					// attach each key to an event
					option.each(function(key) { // bound
						if (event.key == key) {
							this[id](); // this.function();
							};
					}.bind(this));
				};
				
			}.bind(this));

		}.bind(this));
		
		// stop logging
		this.log(['stop']);
	},
	
	/**
	 * previous
	 *
	 * event
	 * 
	 * advance pages backwards
	 */
	previous: function() {
		// start logging
		this.log(['start']);
		
		// advance pages
		var advance = this.advance(-1);
		if (!advance) {
			this.log(['comment', 'could not advance']);
			return false;
			};
		
		// stop logging;
		this.log(['stop']);
	},
	
	/**
	 * next
	 *
	 * event
	 * 
	 * advance pages forward
	 */
	next: function() {
		// start logging
		this.log(['start']);
		
		// advance pages
		var advance = this.advance(1);
		if (!advance) {
			this.log(['comment', 'could not advance']);
			return false;
			};
		
		// stop logging;
		this.log(['stop']);
	},
	
	/**
	 * zoomIn
	 *
	 * event
	 * 
	 * enlarge current pages
	 */
	zoomIn: function() {
		// start logging
		this.log(['start']);
		
		// enlarge pages
		var zoom = this.zoom(1);
		if (!zoom) {
			this.log(['comment', 'could not zoom']);
			return false;
			};
			
		// stop logging
		this.log(['stop']);
	},
	
	/**
	 * zoomOut
	 *
	 * event
	 * 
	 * enlarge current pages
	 */
	zoomOut: function() {
		// start logging
		this.log(['start']);
		
		// enlarge pages
		var zoom = this.zoom(-1);
		if (!zoom) {
			this.log(['comment', 'could not zoom']);
			return false;
			};
			
		// stop logging
		this.log(['stop']);
	},
	
	/**
	 * toolBar
	 *
	 * event
	 * 
	 * toggle visiblity of the toolbar
	 */
	toolBar: function() {
		// start logging
		this.log(['start']);
		
		// check for toolbar class
		if (!this.options.toolbar) {
			this.log(['comment', 'toolbar class not found']);
			return false;
			};
		
		// toolbar
		var toolBar = document.id(this.options.toolbar);
		if (!toolBar) {
			this.log(['comment', 'toolbar not found']);
			return false;
			};
		
		// toggle toolbar
		var toggle = document.id(this.options.toolbar).toggle();
		if (!toggle) {
			this.log(['comment', 'could not toggle toolbar']);
			return false;
			};
			
		// stop logging
		this.log(['stop']);
	},
	
	/**
	 * singlePage
	 *
	 * event
	 * 
	 * display one page at a time
	 */
	singlePage: function() {
		// start logging
		this.log(['start']);
		
		// change visiblePages
		this.options.visiblePages = 1;
		
		// change size of wrapper
		var sizeWrapper = this.sizeWrapper();
		if (!sizeWrapper) {
			this.log(['comment', 'could not resize wrapper']);
			return false;
			};
			
		// load pages
		var loadPage = this.loadPageContent();
		if (!loadPage) {
			this.log(['comment', 'could not reload page content']);
			return false;
			};
			
		// stop logging
		this.log(['stop']);
	},
	
	/**
	 * doublePage
	 *
	 * event
	 * 
	 * display two pages at a time
	 */
	doublePage: function() {
		// start logging
		this.log(['start']);
		
		// change visiblePages
		this.options.visiblePages = 2;
		
		// change size of wrapper
		var sizeWrapper = this.sizeWrapper();
		if (!sizeWrapper) {
			this.log(['comment', 'could not resize wrapper']);
			return false;
			};
			
		// load pages
		var loadPage = this.loadPageContent();
		if (!loadPage) {
			this.log(['comment', 'could not reload page content']);
			return false;
			};
			
		// stop logging
		this.log(['stop']);
	}
});
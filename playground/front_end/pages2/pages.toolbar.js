																			  //
/*!
 * Pages.Toolbar
 *
 * extends Pages class with toolbar support
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
		toolbar:	  'toolbar',
		next:		  'next',
		previous:	  'previous',
		zoomIncrease: 'zoom_increase',
		zoomDecrease: 'zoom_decrease',
		singlePage:	  'single_page',
		doublePage:	  'double_page',
	},
	
	initialize: function(options) {
		this.log(['start']);
		
		// Set the class options
		this.parent(options);
		
		// major elements
		this.toolbar = document.id(this.options.toolbar);
		
		// toolbar buttons
		buttons				 = {};
		
		// next
		buttons.next = this.newButton('next', 'advance', 1);
		if (!buttons.next) {
			this.log(['comment', 'failed to load next button']);
			};
		
		// previous	
		buttons.previous	 = this.newButton('previous', 'advance', -1);
		if (!buttons.previous) {
			this.log(['comment', 'failed to load previous button']);
			};
			
		// zoom in
		buttons.zoomIncrease = this.newButton('zoomIncrease', 'zoom', 1);
		if (!buttons.zoomIncrease) {
			this.log(['comment', 'failed to load zoomIncrease button']);
			};
		
		// zoom out
		buttons.zoomDecrease = this.newButton('zoomDecrease', 'zoom', -1);
		if (!buttons.zoomDecrease) {
			this.log(['comment', 'failed to load zoomDecrease button']);
			};
		
		// single page	
		buttons.single_page  = this.newButton('singlePage', null, null);
		if (!buttons.single_page) {
			this.log(['comment', 'failed to load singlePage button']);
			};
		
		// double page	
		buttons.double_page  = this.newButton('doublePage', null, null);
		if (!buttons.double_page) {
			this.log(['comment', 'failed to load doublePage button']);
			};
		
		this.log(['stop']);
	},
	
	newButton: function(button, action, direction) {
		// start logging
		this.log(['function', 'newButton']);
		
		// no action provided
		if (action == null) {
			action = button;
			};
		
		// get button
		var btn = this.toolbar.getElement('[class~='+this.options[button]+']');
		if (!btn) {
			this.log(['comment', 'could not find button']);
			return false;
			};
		
		// add action to button
		btn.addEvent('click', function() { // bound
			
			// fire event/action/function
			this[action](direction); // this.function(direction)
		}.bind(this));
		
		return true;
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
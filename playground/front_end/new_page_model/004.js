/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, $: false, $$: false, Element: false, r: false, c: false */
/*jslint devel: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */

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
		container:    'magazine', // main container id
		spread:		  null,		  // page spread
		zoomLevels:	  null,
		selectedZoomLevel: null,
	},
	
	initialize: function(options) {
		this.setOptions(options);
		
		this.drawNavigation();
		this.drawSpread();
		this.drawPages();
		this.drawGrid();
	},
	
	drawNavigation: function() {
		console.log('Drawing navigation');
	},
	
	drawSpread: function() {
		console.log('Drawing page spread');
		
		tmpDiv = new Element('div', {
			class: 'pagespread',
			styles: {
				width: this.options.selectedZoomLevel.x
			}
		});
		
		$(this.options.container).adopt(tmpDiv);
	},
	
	drawPages: function() {
	
	},
	
	drawGrid: function() {
	
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
	    	tmp = JSON.decode(response);
	    	zoomLevels = tmp.zoomLevels;
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
		var zoomLevel = { 'x': 0 };
		Object.each(zoomLevels, function(level) {		
			if (windowSize.x >= (level.x * 2 + 44)) {
				if (level.x > zoomLevel.x) {
					zoomLevel = level;
				}
			}
		});

		
		Magazine = new Magazine({
			zoomLevels: zoomLevels,
			selectedZoomLevel: zoomLevel
		});
	};
	
});
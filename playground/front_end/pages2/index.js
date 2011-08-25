window.addEvent('domready', function() {
    var resizeContainer = function() {
    	var container  = $('container'),
    		wrapper    = container.getElement('.wrapper'),
    		wrapperX   = wrapper.getSize().x,
    		wrapperY   = wrapper.getSize().y,
    		windowX    = window.getSize().x,
    		windowY    = window.getSize().y;
    	
    	var newX = windowX;	
    	if (wrapperX > windowX) {
    		newX = wrapperX;
    	}
    	
    	var newY = windowY;	
    	if (wrapperY > windowY) {
    		newY = wrapperY;
    	}
    	
    	$('container').setStyles({
    		'width': newX,
    		'height': newY
    	});
    };
    
    /**
     * logic
     *
     * a touch interface should render like a scrollable page
     * otherwise we use scroll.js to add a drag.move functionality
     */
    
    // touch interface
    if (Modernizr.touch) {
    	    	
    	
    	var toolbar = Asset.javascript('../../lib/js/pages.toolbar.js', {
    			onLoad: function() {
    				// create magazine
    				magazine = new Pages({
    					pageUrl: '../../folder_iterator/clean_page.php',
    					logging: false,
    					currentZoom: 2,
    					visiblePages: 1
    					});
    			}
    		});
    	
		// create magazine
		
			
		// removes boilerplates overflow
		$(document).html.setStyles({
			'overflow-y': 'scroll'
		});        
        
        document.addEvent('zoom', function() {
        	resizeContainer();
        });
        
        window.addEvent('load', function() {
        	resizeContainer();
        });
        
    } else {
        
        // load extra classes
        var toolbar = Asset.javascript('../../lib/js/pages.toolbar.js'),
        	keybind = Asset.javascript('../../lib/js/pages.keybindings.js', {
        		onLoad: function() {
        			// create magazine
        			magazine = new Pages({
        				pageUrl: '../../folder_iterator/clean_page.php',
        				logging: false,
        				});
        		}
        	});

        // load scroll.js for drag abilities
        var scrolljs = Asset.javascript('../../lib/js/scroll.js', {
            onLoad: function(){
                // make content scrollbox                    
                new Drag.Scroll($('container'));
                
                // must give scroll box height or it fails
                var windowY = window.getSize().y,
                	toolbarY = $('toolbar').getSize().y;
                	
                $('container').setStyle('height', windowY - toolbarY);
            }
        });
        
        window.addEvent('resize', function() {
        	resizeContainer();
        });
        
    };
    
});
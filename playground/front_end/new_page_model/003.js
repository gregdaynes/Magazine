/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, $: false, $$: false */
/*jslint devel: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */



/**
 * Settings
 */
var options = {
    zoomLevels: {
        '-0': { x: 2048, y: 2669 },
        '-1': { x: 1638, y: 2135 },
        '-2': { x: 1310, y: 1708 },
        '-3': { x: 1048, y: 1366 },
        '-4': { x:  838, y: 1093 },
        '-5': { x:  670, y:  874 },
        '-6': { x:  536, y:  699 },
        '-7': { x:  429, y:  559 },
        '-8': { x:  343, y:  447 },
        '-9': { x:  274, y:  358 }
    },
    
    zoomLevel: 0,
    
    dimensions: {
        window: 0,
        wrapper: 0,
        page: 0,
        dblPage: 0,
        row: 0,
        grid: 0
    },
    
    pageProperties: {
        pageCount: 2,
        pageDimensions: {
            x: 0,
            y: 0
        },
        pages: null,
        grid: null,
        gridCount: {
            x: 0,
            y: 0
        }
    },
    
    support : {
        backgroundSize: false
    }
}; 

/**
 * measure
 */
var measurements = function() {
    options.dimensions.window  = $(document).getSize();
    options.dimensions.wrapper = $('wrapper').getSize();
    
    return true;
};

/**
 * testZoomLevel
 */
var testZoomLevel = function() {
    
    var tmp = options.zoomLevels['-0'].x;
    
    var test = Object.filter(options.zoomLevels, function(level, key) {
        
        if ((level.x * options.pageProperties.pageCount) > options.dimensions.window.x) {            
            return false;
        } else {
            if (level.x < tmp) {
                tmp = level.x;
            }
        
            options.dimensions.page = options.zoomLevels[key];
            options.zoomLevel = key;    
            
            return true;
        }
        
    });
};

/**
 * Dom ready to be worked on
 */
window.addEvent('domready', function() {

    /* check modernizer for html5 background-size support */
    if ($$('html').hasClass('backgroundsize')) {
        options.support.backgroundSize = true;
    }
    /**/

});

/**
 * Loaded and ready to go
 */
window.addEvent('load', function() {
    measurements();
    testZoomLevel();
});

/*
var generateFunction = function() {    
        
    // clean out each page
    pages.each(function(page) {
        page.empty();
    });    
    
    
    // number of grid items to generate
    gridCount.x = Math.ceil(pageSize.x / 256);
    gridCount.y = Math.ceil(pageSize.y / 256);
    
    // size wrapper
    wrapper.setStyles({
        width: pageSize.x * 2
    });
    
    // size page
    pages.each(function(page) {
        page.setStyles({
            width: pageSize.x,
            height: pageSize.y
        });
        

    });
    
    var row = new Element('div', { 
        styles: {
            width: gridCount.x * 256,
        },
        'class': 'row'
    });
    var col = new Element('div');
    
    pages.each(function(page) {

        // generate grid
        for(r=0;r<gridCount.y;r++) {
            
            tmp = row.clone();
            page.adopt(tmp);
            
            for(c=0;c<gridCount.x;c++) {
                tmp.adopt(col.clone().setProperties({
                    id: 'r'+r + '_c'+c,
                    'class': 'grid'
                }));
            }        
        };
    });
    
    grid = $(document).getElements('[class~=grid]');

    // scale grid
    scaler();

    // call for images
    imageRequest();    
    
    
};

var scaler = function() {    
    scalePercentage = body.getSize().x / (pageSize.x * 2);
    scale = 256 * scalePercentage;
    
    if (body.getSize().x > sizeObject['-9'].x ) {        
        
        // refetch larger
        if (scalePercentage > 1) {
            generateFunction();
        }
        
        // scale existing
        else if (scalePercentage > 0.8) {
            // resize wrapper
            wrapper.setStyles({
                'width': Math.ceil((sizeObject[zoomLevel].x * scalePercentage) * 2),
                'height': Math.ceil(sizeObject[zoomLevel].y * scalePercentage)
            });
            
            
            // resize pages
            pages.each(function(page) {
                page.setStyles({
                    'width': Math.floor(sizeObject[zoomLevel].x * scalePercentage),
                    'height': Math.floor(sizeObject[zoomLevel].y * scalePercentage)
                });
            
                // rows
                page.getChildren().each(function(row) {
                    row.setStyles({
                        'width': Math.ceil(gridCount.x * scale),
                        'height': Math.floor(scale)
                    });
                });
            });
                
                
            // resize grid
            grid.each(function(box) {
                box.setStyles({
                    'width': Math.floor(scale),
                    'height': Math.floor(scale)
                });
            });
            
        }
        
        // refetch smaller
        else {
            generateFunction();
        }
    
    };
};

var imageRequest = function() {

    windowScroll = window.getScroll();    
    
    // filter items
    visibleGrid = grid.filter(function(el, key) {
        elPos = el.getPosition();
        if (elPos.y <= (window.getSize().y + windowScroll.y)) {
            return true;
        }
    });

    // each grid    
    visibleGrid.each(function(el, i) {
    
        pageNumber = el.getParent('[class~=page]').getProperty('id');
    
        if (el.hasChildNodes() === false) {
            var id = el.getProperty('id').split('_');
            var row = id[0].substr(1);
            var col = id[1].substr(1);
            
            var imgRequest = new Request({
                url: '002.php',
                onComplete: function(response) {
                    if (htmlBackgroundSize) {
                        el.setStyles({
                            'background-image':    'url('+response+')',
                            'background-repeat':   'no-repeat',
                            'background-position': 'top left',
                            'background-size':       '100%'
                        });
                        el.set('html', '<em></em>'); // otherwise it will reload each grid on a scroll event
                    } else {
                        el.set('html', '<img src="'+response+'" style="width: 100%; height: 100%;" />');
                    }
                
                }
            }).get({
                p: pageNumber,
                r: row,
                c: col,
                z: zoomLevel
            });
        }
    
    });
};


window.addEvent('load', function() {
    if ($$('html').hasClass('backgroundsize')) {
        htmlBackgroundSize = true;
    };

    generateFunction();
});

var timeout = false;

window.addEvent('resize', function() {
    if (timeout !== false) {
        clearTimeout(timeout);
    }
    
    timeout = scaler.delay(200);
});

window.addEvent('scroll', function() {
    imageRequest();
});
*/
/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, $: false, $$: false, Element: false, r: false, c: false */
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
    
    elements: {
        row: null,
        column: null
    },
    
    page: {
        pageCount: 2,
        pages: null,
        grid: {
            elements: null,
            amount: {
                x: 0,
                y: 0
            }
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
    // W = current window width
    
    Wx = $(document).getSize().x; // window width
            
    viableZoomLevels = Object.filter(options.zoomLevels, function(zoomLevel, key) {
        if ((zoomLevel.x * 2) <= Wx) {
            return true;
        }
        
        else if ((zoomLevel.x * 2) <= (Wx * 0.80)) {
            return true;
        }
    });
    
    maxSize = 0;
    Object.each(viableZoomLevels, function(zoomLevel, key) {
        if (maxSize == 0) {
            maxSize = key;
        }
        
        if (options.zoomLevels[key].x >= options.zoomLevels[maxSize].x) {
            maxSize = key
        };
    });
    
    options.dimensions.page = options.zoomLevels[maxSize];
    options.zoomLevel = maxSize;

};

/**
 * makeGrid
 */
var makeGrid = function() {
    /* figure out how many columns to make */
    options.page.grid.amount.x = Math.ceil(options.dimensions.page.x / 256); /**/
    
     /* figure out how many rows to make */
    options.page.grid.amount.y = Math.ceil(options.dimensions.page.y / 256); /**/
};

/**
 * generatePages
 */
var generatePages = function() {    
    var pages = options.page.pages;
    
    /* clear page of existing rows/columns */
    pages.each(function(page) {
        page.empty();
    }); /**/
    
    /* populate each page with content */
    pages.each(function(page) {
        var r, c;
        for(r = 0; r < options.page.grid.amount.y; r=r+1) {
            
            var tmp = options.elements.row.clone();
            page.adopt(tmp);
            
            for(c = 0; c < options.page.grid.amount.x; c=c+1) {
                tmp.adopt(options.elements.column.clone().setProperties({
                    id: 'r'+r + '_c'+c,
                    'class': 'box'
                }));
            }        
        }
    }); /**/
    
    options.page.grid.elements = $$('.box');
};

/** 
 * setSize
 */
var setSize = function() {
    
    var scale = $(document).getSize().x / (options.dimensions.page.x * 2);
    
//    if (scale >= 1) {
//        measurements();
//        testZoomLevel();
//        makeGrid();
//        generatePages();
//        setSize();
//    }
    
    /* resize wrapper */
    $('wrapper').setStyles({
        width: $(document).getSize().x
    }); /**/
    
    /* resize each pages */
    $(document).getElements('[class~=page]').each(function(page) {
        page.setStyles({
            width: Math.floor(options.dimensions.page.x * scale)
        });
        
        /* resize each row */
        page.getChildren().each(function(row) {
            row.setStyles({
                width: Math.ceil((options.page.grid.amount.x * 256) * scale),
            });
        });
    }); /**/
            
    /* resize each box */
    options.page.grid.elements.each(function(box) {
        box.setStyles({
            width: Math.floor(256 * scale),
            height: Math.floor(256 * scale)
        });
    }); /**/
};

/**
 * checkScale
 */
var checkScale = function() {
    var scale = $(document).getSize().x / (options.dimensions.page.x * 2);
    
    console.log(scale);
    
    if (scale >= 1) {
        measurements();
        testZoomLevel();
        makeGrid();
        generatePages();
        setSize();
    }
    
    else if (scale >= 0.8) {
        setSize();
    }
    
    else {
        measurements();
        testZoomLevel();
        makeGrid();
        generatePages();
        setSize();
    }
};

/**
 * Dom ready to be worked on
 */
window.addEvent('domready', function() {
    
    /* get pages */
    options.page.pages = $$('.page'); /**/
    
    /* check modernizer for html5 background-size support */
    if ($$('html').hasClass('backgroundsize')) {
        options.support.backgroundSize = true;
    } /**/
    
    /* create new row & store it */
    options.elements.row = new Element('div', {
        'class': 'row'
    }); /**/
    
    /* create new column & store it */
    options.elements.column = new Element('div', {
        styles: {
            width:  256,
            height: 256
        },
        'class': 'box'
    }); /**/

});

/**
 * Loaded and ready to go
 */
window.addEvent('load', function() {
    measurements();
    testZoomLevel();
    makeGrid();
    generatePages();
    setSize();
});

var timeout = false;

window.addEvent('resize', function() {
    if (timeout !== false) {
        clearTimeout(timeout);
    }
    
    timeout = checkScale.delay(200);
});
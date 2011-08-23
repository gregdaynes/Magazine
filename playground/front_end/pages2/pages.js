var Pages = new Class({
    
    Implements: [Options],
    
    options: {
        // Elements
        container: 'container',
        pageClass: 'page',
        
        // page options
        currentPage: 1,
        currentPages: [],
        visiblePages: 2,
        currentZoom: 1,
        zoomLevels: {
            '-3': { 'x': 220,  'y': 286 },
            '-2': { 'x': 252,  'y': 328 },
            '-1': { 'x': 284,  'y': 370 },
             '0': { 'x': 436,  'y': 568 },
             '1': { 'x': 630,  'y': 821 },
             '2': { 'x': 728,  'y': 949 },
             '3': { 'x': 1024, 'y': 1335 },
             '4': { 'x': 2048, 'y': 2669 }},
         pageSize: { 'x': 0, 'y': 0}
    },
    
    initialize: function(options) {
        
        // Set the class options
        this.setOptions(options);
                
        // major elements
        this.container = document.id(this.options.container);
        
        // initialize wrapper
        this.initializeWrapper();
        
        // initial functions
        this.sizeWrapper();
        this.loadPageContent();
    },
    
    initializeWrapper: function() {       
        measurePage = new Element('div', {
            'class': this.options.pageClass+' measure',
            styles: {
                'width': this.options.zoomLevels[this.options.currentZoom].x,
                'height': this.options.zoomLevels[this.options.currentZoom].y,
                'display': 'hidden'
            }
        });
        
        this.wrapper = new Element('div', {
            'class': 'wrapper'
        });
        
        this.container.adopt(this.wrapper.adopt(measurePage));
        
        this.pageSize();
        
        measurePage.destroy();
    },
    
    pageSize: function() {
        measurePage = this.wrapper.getElement('[class~='+this.options.pageClass+']');
        
        pageMeasurements = measurePage.getComputedSize({
            'styles': ['margin', 'padding', 'border']
        });
        
        this.pageSize = {
            'x': pageMeasurements.totalWidth,
            'y': pageMeasurements.totalHeight  
        };
    },
    
    sizeWrapper: function() {                
        this.wrapper.setStyles({
            'width': this.pageSize.x * this.options.visiblePages,
            'height': this.pageSize.y
        });
    },
    
    loadPageContent: function() {
        pages = this.wrapper.getElements('[class~='+this.options.pageClass+']');
                
        if (Object.getLength(pages) > 0) { // load each page with content            
            
            i = 0; // comment me
            n = -1; // comment me
            
            Object.each(pages, function(page, key) {
                
                if (key != 'length') {
                
                    page.empty();
                    // no page 0
                    if (this.options.currentPage === 0) {
                        this.options.currentPage = 1;
                    }
                    
                    page_modifier = 0;
                    if (this.options.visiblePages >= 2) {
                                        
                        // if left page is an even numbered page alter the number by -1
                        if ((this.options.currentPage) % 2) {
                            page_modifier = n + i;
                        } else {
                            page_modifier = i;
                        }
                    }
                    
                    id = this.options.currentPage + page_modifier;
                    
                    page.set('id', id);
                    
                    this.requestPages();
                    
                    this.options.currentPages[i] = id;
                    
                    i++;
                };
            }.bind(this));
            
        } else { // generate pages - then come back and check if there are pages
            this.generatePages();
            this.loadPageContent();
        }
    },
    
    generatePages: function() {
        this.wrapper.empty();
        
        for(i=0;i<this.options.visiblePages;i++) {
            
            this.wrapper.adopt(new Element('div', {
                'class':  this.options.pageClass,
                'styles': {
                    'width': this.options.zoomLevels[this.options.currentZoom].x,
                    'height': this.options.zoomLevels[this.options.currentZoom].y
                }
            }).addClass('zoom_'+this.options.currentZoom));           
        }
    },
    
    requestPages: function() {
        zoom = this.options.currentZoom;
       
        this.wrapper.getChildren().each(function(page) {
            pageId = page.getProperty('id');
                        
            new Request.HTML({
                url: '../../folder_iterator/clean_page.php',
                onSuccess: function(response) {
                    page.adopt(response);
                },
                onFailure: function() {
                    page.addClass('disabled');
                }
            }).get({
                'p': pageId,
                'z': zoom
            });
        });
    },    
    
    fadePages: function() {    
        this.loadPageContent();
    },
    
    advance: function(direction) {    
        this.options.currentPage = this.options.currentPage + direction;
        
        if (this.options.currentPages.contains(this.options.currentPage)) {
            this.refocusPage();
        } else {
            this.fadePages();
        }
    },
    
    zoom: function(direction) {
        this.options.currentZoom = this.options.currentZoom + direction;
        this.fadePages();
    },
    
    refocusPage: function() {
        currentPage = this.options.currentPage;
        
        this.wrapper.getChildren().each(function(el) {
            el.removeClass('focused');
            
            if (el.getProperty('id') == currentPage) {
                el.addClass('focused');
            }
        });
    }

    
});
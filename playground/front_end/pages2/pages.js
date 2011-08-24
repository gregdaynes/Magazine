var Pages = new Class({
    
    Implements: [Options, Chain],
    
    options: {
        // Elements
        container: 'container',
        pageClass: 'page',
        
        // page measurements
        pageSize: { 'padding': { 'x': 0, 'y': 0} , 'margin': { 'x': 0, 'y': 0}, 'border': { 'x': 0, 'y': 0} },
        
        // page options
        currentPage: 1,
        visiblePages: 2,
        currentZoom: -3,
        zoomLevels: {
            '-3': { 'x': 220,  'y': 286 },
            '-2': { 'x': 252,  'y': 328 },
            '-1': { 'x': 284,  'y': 370 },
             '0': { 'x': 436,  'y': 568 },
             '1': { 'x': 630,  'y': 821 },
             '2': { 'x': 728,  'y': 949 },
             '3': { 'x': 1024, 'y': 1335 },    
             '4': { 'x': 2048, 'y': 2669 }},
             
        // general options
        logging: true
    },
    
    initialize: function(options) {
        
        // Set the class options
        this.setOptions(options);
        
        this.log = [];
        
        // major elements
        this.container = document.id(this.options.container);
        
        // initialize wrapper
       this.initializeWrapper();
       this.measurePage();
       this.sizeWrapper();
       
       // output log
       this.showLog();          
    },
    
    showLog: function() {
        if (this.options.logging) {
            this.log.each(function(message, i) {
                console.log(i+': '+message);
            });
            console.log('---');
        };
    },
    
    initializeWrapper: function() {       
        this.log.push('initialize wrapper');
        
        this.wrapper = new Element('div', {
            'class': 'wrapper'
        });
        
        if (this.container.adopt(this.wrapper)) {
            this.log.push('container adopted wrapper');
            return true;
        }
        
        this.log.push('container failed to adopt wrapper');
        return false;
        
    },
    
    measurePage: function() {
        this.log.push('measure page');
        
        page = new Element('div', {
            'class': this.options.pageClass+' measure',
            styles: {
                'width': this.options.zoomLevels[this.options.currentZoom].x,
                'height': this.options.zoomLevels[this.options.currentZoom].y,
                'display': 'hidden'
            }
        });
        
        this.log.push('measuring page created');
        
        if (this.wrapper.adopt(page)) {
            this.log.push('wrapper adopted measuring page');
            
            pageMeasurements = page.getComputedSize({
                'styles': ['margin', 'padding', 'border']
            });
            
            this.log.push('measuring page measured');
                    
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
                    'y':  pageMeasurements['padding-top'] + pageMeasurements['padding-bottom']
                } 
            };
            
            this.log.push('this.pageSize defined');
            
            var destroy_page = page.destroy();
            
            if (!destroy_page) {
                this.log.push('measuring page destroyed');
                
                return true;
            }
            
            this.log.push('failed to destroy measuring page');
            return false;
            
        }
        
        this.log.push('wrapper failed to adopt measuring page');
        return false;
    },
    
    sizeWrapper: function() {
        this.log.push('size wrapper');
        
        var pageWidth = this.options.zoomLevels[this.options.currentZoom].x,
            pageHeight = this.options.zoomLevels[this.options.currentZoom].y,
            borderX = this.pageSize.border.x,
            borderY = this.pageSize.border.y,
            marginX = this.pageSize.margin.x,
            marginY = this.pageSize.margin.y,
            paddingX = this.pageSize.padding.x,
            paddingY = this.pageSize.padding.y;
                 
        var newPageWidth = pageWidth + borderX + marginX + paddingX,
            newPageHeight = pageHeight + borderY + marginY + paddingX;
        
        this.log.push('sizes defined');
          
        var resize = this.wrapper.setStyles({
                         'width':  newPageWidth * this.options.visiblePages,
                         'height': newPageHeight
                     });
        if (resize) {
            this.log.push('wrapper resized');
            return true;
        }
        
        this.log.push('wrapper failed to resize');
        return false;
    },
    
    sizePages: function() {    
        this.wrapper.getChildren().each(function(page, i) {
            page.setStyles({
                'width': this.options.zoomLevels[this.options.currentZoom].x,
                'height': this.options.zoomLevels[this.options.currentZoom].y
            });
        }.bind(this));
    },
    
    loadPageContent: function() {
        pages = this.wrapper.getChildren('div.page');
        
        if (pages.length >= this.options.visiblePages) {        
            
            pages.each(function(page, i) {
                                
                if (this.options.currentPage === 0) {
                    this.options.currentPage = 1;
                }
                
                pageModifier = 0;
                if (this.options.visiblePages >= 2) {
                    if ((this.options.currentPage) % 2) {
                        pageModifier = -1 + i;
                    } else {
                        pageModifier = i;
                    }
                }
                
                newPageId = this.options.currentPage + pageModifier;

                pages[i].set('id', newPageId);
                
                
            }.bind(this));
            
            this.requestPages();
                        
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
            page.empty();
                        
            new Request.HTML({
                url: '../../folder_iterator/clean_page.php',
                onSuccess: function(response) {
                    page.adopt(response);
                }
            }).get({
                'p': pageId,
                'z': zoom
            });
        });
    },    
    
    advance: function(direction) {    
        this.options.currentPage = this.options.currentPage + (direction * this.options.visiblePages);
        this.loadPageContent();
    },
    
    zoom: function(direction) {
        this.options.currentZoom = this.options.currentZoom + direction;
        this.sizeWrapper();
        this.sizePages();
        this.loadPageContent();
    }    
});
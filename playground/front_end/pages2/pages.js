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
        
        this.log('start');
        
        // major elements
        this.container = document.id(this.options.container);
        
        // initialize wrapper
       this.initializeWrapper();
       this.measurePage();
       this.sizeWrapper();
       this.loadPageContent();
       
       // output log
       this.log('stop');          
    },
    
    log: function(command) {
        if (this.options.logging) {
            if (!this.consoleLog) {
                this.consoleLog = [];
            };
        
            if (command == 'start') {
                this.consoleLog.empty();
            } else if (command == 'stop') {
                this.consoleLog.each(function(message, i) {
                    console.log(message);
                });
                console.log('---');
            } else {
            
                this.consoleLog.push(command);
            };

        };
    },
    
    initializeWrapper: function() {       
        this.log('initializeWrapper()');
        
        this.wrapper = new Element('div', {
            'class': 'wrapper'
        });
        
        if (this.container.adopt(this.wrapper)) {
            this.log('   container adopted wrapper');
            return true;
        }
        
        this.log('   container failed to adopt wrapper');
        return false;
        
    },
    
    measurePage: function() {
        this.log('measurePage()');
        
        page = new Element('div', {
            'class': this.options.pageClass+' measure',
            styles: {
                'width': this.options.zoomLevels[this.options.currentZoom].x,
                'height': this.options.zoomLevels[this.options.currentZoom].y,
                'display': 'hidden'
            }
        });
        
        this.log('   measuring page created');
        
        if (this.wrapper.adopt(page)) {
            this.log('   wrapper adopted measuring page');
            
            pageMeasurements = page.getComputedSize({
                'styles': ['margin', 'padding', 'border']
            });
            
            this.log('   measuring page measured');
                    
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
            
            this.log('   this.pageSize defined');
            
            var destroy_page = page.destroy();
            
            if (!destroy_page) {
                this.log('   measuring page destroyed');
                
                return true;
            }
            
            this.log('   failed to destroy measuring page');
            return false;
            
        }
        
        this.log('   wrapper failed to adopt measuring page');
        return false;
    },
    
    sizeWrapper: function() {
        this.log('sizeWrapper()');
        
        var pageWidth = this.options.zoomLevels[this.options.currentZoom].x,
            pageHeight = this.options.zoomLevels[this.options.currentZoom].y,
            borderX = this.pageSize.border.x,
            borderY = this.pageSize.border.y,
            marginX = this.pageSize.margin.x,
            marginY = this.pageSize.margin.y,
            paddingX = this.pageSize.padding.x,
            paddingY = this.pageSize.padding.y,
                 
            newPageWidth = pageWidth + borderX + marginX + paddingX,
            newPageHeight = pageHeight + borderY + marginY + paddingX;
        
        this.log('   sizes defined');
          
        var resize = this.wrapper.setStyles({
                         'width':  newPageWidth * this.options.visiblePages,
                         'height': newPageHeight
                     });
        if (resize) {
            this.log('   wrapper resized');
            return true;
        }
        
        this.log('   wrapper failed to resize');
        return false;
    },
    
    sizePages: function() {
        this.log('sizePages()');
        
        this.log('   each page loop');
        this.wrapper.getChildren().each(function(page, i) {
            var setPageSize = page.setStyles({
                                  'width': this.options.zoomLevels[this.options.currentZoom].x,
                                  'height': this.options.zoomLevels[this.options.currentZoom].y
                              });
            if (!setPageSize) {
                this.log('   page ' + page.getProperty('id') + ' failed to resize');
                return false;
            }
            this.log('   page ' + page.getProperty('id') + ' resized');
        }.bind(this));
        
        this.log('   pages resized');
        
        return true;
    },
    
    loadPageContent: function() {
        this.log('loadPageContent()');
        
        pages = this.wrapper.getChildren('div.page');
            
        if (pages.length >= this.options.visiblePages) {        
            
            this.log('   page count matches visible pages option');
            
            this.log('   setup page modifier');
            pageModifier = 0;
            if (this.options.visiblePages >= 2) {
                
                this.log('   more than 1 visible page');
                
                if ((this.options.currentPage) % 2) {
                    this.log('   current page righthand page number');
                    
                    pageModifier = -1;
                } else {
                    this.log('   current page lefthand page number');
                    
                    pageModifier = 0;
                }
            }
            
            this.log('   loop set page id');
            pages.each(function(page, i) { // bound to this
                
                if (this.options.currentPage <= 0) {
                    this.log('   current page is <= 0');
                    
                    this.options.currentPage = 1;
                    
                    this.log('   current page is now 1');
                }                
                
                this.log('   generating page id');
                
                newPageId = this.options.currentPage + pageModifier + i;
                
                if (pages[i].set('id', newPageId)) {
                    this.log('   page id set '+newPageId);
                } else {
                    this.log('   failed to set page id');
                    return false;
                }
                
            }.bind(this));
            
            this.log('   pages setup');
            this.requestPageContent();
                        
        } else { // generate pages - then come back and check if there are pages
            
            this.log('   not enough pages in wrapper');
            
            var generatePages = this.generatePages();
            if (generatePages) {
                this.log('   pages generated');
            }
            
            this.log('   checking for correct page count');
            this.loadPageContent();
        }
        
        return true;
    },
    
    generatePages: function() {
        
        this.log('generatePages()');
        
        var emptyWrapper = this.wrapper.empty();
        
        if (!emptyWrapper) {
            this.log('   wrapper failed to empty');
            return false;
            
        } else {
            this.log('   wrapper emptied');
        }
        
        this.log('   looping page creation');
        
        for(i=0;i<this.options.visiblePages;i++) {
            
            this.log('   creating page '+(i+1));
                           
            var newPage  = this.wrapper.adopt(new Element('div', {
                                'class':  this.options.pageClass,
                                'styles': {
                                    'width': this.options.zoomLevels[this.options.currentZoom].x,
                                    'height': this.options.zoomLevels[this.options.currentZoom].y
                                }
                            }).addClass('zoom_'+this.options.currentZoom));
            
            if (newPage) {
                this.log('   page '+(i+1)+' created');          
            } else {
                this.log('   failed to create page '+(i+1));
                return false;
            }
        }
        
        this.log('   pages created');
        return true;
    },
    
    requestPageContent: function() {
        this.log('requestPageContent()');
        
        this.log('   each page loop');       
        this.wrapper.getChildren().each(function(page) { // bound
            
            var pageId = page.getProperty('id');
            if (!pageId) {
                this.log('   no page id, can\'t continue');
                return false;
            };
            
            var emptyPage = page.empty();
            if (!emptyPage) {
                this.log('   page could not be emptied');
                return false;
            }
            
            this.log('   starting request');
                        
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
        
        this.log('   finished requestPageLoop');
        return true;
    },    
    
    advance: function(direction) {
        this.log('start');
        this.log('advance()');
        this.log('   current page ' + this.options.currentPage);
        
        this.options.currentPage = this.options.currentPage + (direction * this.options.visiblePages);
        
        this.log('   next page ' + this.options.currentPage);
        
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
        this.log('   current zoom ' + this.options.currentZoom);
        
        this.options.currentZoom = this.options.currentZoom + direction;
        
        this.log('   next zoom ' + this.options.currentZoom);
        
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
    }    
});
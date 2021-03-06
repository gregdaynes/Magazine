var Pages = new Class({
    
    Implements: [Options],
    
    options: {
        container: 'container',
        wrapper:   'wrapper',
        pageClass: 'page',
        
        
        
        currentPage: 1,
        currentPages: [],
        visiblePages: 2, // current, previous, next
        
        currentZoom: 1,
        zoomLevels: {
            '-3': {
                'x': 220,
                'y': 286
            },
            '-2': {
                'x': 252,
                'y': 328
            },
            '-1': {
                'x': 284,
                'y': 370
            },
            '0': {
                'x': 436,
                'y': 568
            },
            '1': {
                'x': 630,
                'y': 821
            },
            '2': {
                'x': 728,
                'y': 949
            },
            '3': {
                'x': 1024,
                'y': 1335
            },
            '4': {
                'x': 2048,
                'y': 2669
            }
        }
    },
    
    initialize: function(options) {
        
        // Set the class options
        this.setOptions(options);
                
        // major elements
        this.container = document.id(this.options.container);
        this.wrapper   = document.id(this.options.wrapper);
        
        // initial functions
        this.resizeWrapper(this.options.visiblePages); // resize wrapper to size of all visible pages
        this.generatePages(this.options.pageClass); // create divs of pages
        
    },
    
    resizeWrapper: function() {
    
        page_size = this.wrapper.getElement('[class~=page]').setStyles({
            'width': this.options.zoomLevels[this.options.currentZoom].x,
            'height': this.options.zoomLevels[this.options.currentZoom].y
        }).getComputedSize({
            styles: ['margin', 'padding', 'border']
        });
                
        this.wrapper.setStyles({
            'width': page_size.totalWidth * this.options.visiblePages,
            'height': page_size.totalHeight
        });
    },
    
    generatePages: function() {
        this.wrapper.empty();
        
        n = -1;
        for(i=0;i<this.options.visiblePages;i++) {
            
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
            
            focus = '';
            if (id === this.options.currentPage) {
                focus = 'focused';
            }
            
            
            
            this.wrapper.adopt(new Element('div', {
                'class':  this.options.pageClass,
                'id':     id,
                'styles': {
                    opacity: 0,
                    'width': this.options.zoomLevels[this.options.currentZoom].x,
                    'height': this.options.zoomLevels[this.options.currentZoom].y
                }
            }).addClass('zoom_'+this.options.currentZoom).addClass(focus));           
            
            this.options.currentPages[i] = id;
        }
        
        this.requestPages();
    },
    
    requestPages: function() {
        zoom = this.options.currentZoom;
       
        this.wrapper.getChildren().each(function(page) {
            pageId = page.getProperty('id');
                        
            new Request.HTML({
                url: '../../folder_iterator/clean_page.php',
                onSuccess: function(response) {
                    page.adopt(response).fade('in');
                },
                onFailure: function() {
                    page.addClass('disabled').fade('in');
                }
            }).get({
                'p': pageId,
                'z': zoom
            });
        });
    },    
    
    fadePages: function() {    
        images = this.wrapper.getElements('img');
        image_count =  images.length;
                
        base_duration = 5;
        images.each(function(el, i) {
            new Fx.Tween(el, {
                duration: i * base_duration,
                property: 'opacity'
            }).start(1,0);
        });
        
        this.resizeWrapper.delay( (image_count * base_duration + 10), this);
        this.generatePages.delay( (image_count * base_duration), this);
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
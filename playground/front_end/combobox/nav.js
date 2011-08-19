var window = null;

window.addEvent('domready', function() {
    
    /**
     * Initialize
     */
    $('toolbar').getElements('a').each(function(element) {
        element.removeProperty('href');
    });
    
    /**
     * Configuration
     */    
    var config = {
            page: {
                'left': 0
            },
            params: {
                'z': 0,
                'p': 1,
                'l': 1,
                'increment': 1
            },
            zoom: {
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
        location = window.location.search.substring(1),
        spinner_options = {
           lines: 12, // The number of lines to draw
           length: 7, // The length of each line
           width: 5, // The line thickness
           radius: 10, // The radius of the inner circle
           color: '#000', // #rbg or #rrggbb
           speed: 1, // Rounds per second
           trail: 100, // Afterglow percentage
           shadow: false // Whether to render a shadow
        };
        
    // page location
    if (location) {
        location = location.split('&').each(function(el) {
            url_params = el.split('=');
            config.params[url_params[0]] = parseInt(url_params[1], 10);
        });
    };
            
    // multipage vs single page
    if (config.params.l >= 2) {
        
        config.params.increment = 2;
        
        // multiple pages

        // left page is the page assigned from the url
        if (config.params.p == 0) {
            config.params.p = 1;
        }
        
        // if left page is an even numbered page alter the number by -1
        if (config.params.p % 2) {
        
            // right page
            config.page.left = config.params.p - 1;
            config.page.right = config.page.left + 1;
        } else {
        
            // left page
            config.page.left = config.params.p;
            config.page.right = config.page.left + 1;
        }
    } else {
    
        // single pages
        config.page.left = config.params.p;
    }
    
    
    
    /**
     * Functions
     */
    var generate_pages = function() {
        
        console.log(config.zoom[config.params.z]);
        
        $('wrapper').empty().setStyles({
            'width': config.zoom[config.params.z].x * config.params.increment + 50 + 4,
            'height': config.zoom[config.params.z].y + 50
        });
        
        var new_page = new Element('div', {
            class: 'page',
            styles: {
                'width': config.zoom[config.params.z].x,
                'height': config.zoom[config.params.z].y
            }
        });
        
        Object.each(config.page, function(value, index) {        
            $('wrapper').adopt(new_page.clone(false).setProperty('id', value));
        });
    }
    
    var fetch_pages = function(pages) {
    
        Object.each(pages, function(page) {
            fetch_page(page);
        });
    };
    
    var fetch_page = function(page) {
        
        if (page > 0) {
            var spinner = new Spinner(spinner_options);
            
            page_content = new Request.HTML({
                url: '../../folder_iterator/clean_page.php',
                onRequest: function() {
                    var target = $(document).getElement('[id='+page+']');
                    spinner.spin(target);
                },
                onSuccess: function(response) {
                    spinner.stop();
                    $(document).getElement('[id='+page+']').adopt(response);
                    //$(document).getElement('[id='+page+']').set('text', page);
                },
                onFailure: function() {
                    spinner.stop();
                    $(document).getElement('[id='+page+']').addClass('disabled');
                }
            }).get({
                'p': page,
                'z': config.params.z
            });        
        };
    }
    
    // prev
    var prev = function() {
        config.page.left = config.page.left - config.params.increment;
        config.params.p = config.page.left;
        
        if (config.page.right) {
            config.page.right = config.page.right - config.params.increment;
        }
        
        generate_pages();
        fetch_pages(config.page);
    }
    
    var next = function() {
        config.page.left = config.page.left + config.params.increment;
         config.params.p = config.page.left;
         
         if (config.page.right) {
             config.page.right = config.page.right + config.params.increment;
         }
         
        
         generate_pages();
         fetch_pages(config.page);
    }
    
    var zoom_in = function() {
        config.params.z = config.params.z + 1;
        
        generate_pages();
        fetch_pages(config.page);
    }
    
    var zoom_out = function() {
        config.params.z = config.params.z - 1;
        
        generate_pages();
        fetch_pages(config.page);
    }
    
    /**
     * UI Events
     */
    $('prev').addEvent('click', function(e) {
        prev();
    });
    
    $('next').addEvent('click', function(e) {
        next();
    });
    
    /**
     * Key Bindings
     */
    $(document).body.addEvent('keydown', function(event) {
        
        // left arrow / p
        if (event.key == 'left' || event.key == 'p') {
            prev();
        }
        
        // right arrow / n
        if (event.key == 'right' || event.key == 'n') {
            next();
        }
        
        // up arrow / +
        if (event.key == 'up' || event.key == '=') {
            zoom_in();
        }
        
        // down arrow
        if (event.key == 'down' || event.key == '-') {
            zoom_out();
        }
        
        // i
        if (event.key == 'i') {
            console.log('i');
        }
        
        // m
        if (event.key == 'm') {
            console.log('m');
        }
        
        // t
        if (event.key == 't') {
            console.log('t');
        }
        
        // h
        if (event.key == 'h') {
            console.log('h');
        }
        
    });
    
    // page loads - get pages
    generate_pages();
    fetch_pages(config.page);
    
    
        
});
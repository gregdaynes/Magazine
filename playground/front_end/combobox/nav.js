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
        
        $('wrapper').empty();
        
        var new_page = new Element('div', {
            class: 'page'
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
                'p': page
            });        
        };
    }
    
    /**
     * UI Events
     */
    $('prev').addEvent('click', function(e) {
        config.page.left = config.page.left - config.params.increment;
        config.params.p = config.page.left;
        
        if (config.page.right) {
            config.page.right = config.page.right - config.params.increment;
        }
        
        generate_pages();
        fetch_pages(config.page);
    });
    
    $('next').addEvent('click', function(e) {
        config.page.left = config.page.left + config.params.increment;
        config.params.p = config.page.left;
        
        if (config.page.right) {
            config.page.right = config.page.right + config.params.increment;
        }
        
       
        generate_pages();
        fetch_pages(config.page);
    });
    
    /**
     * Key Bindings
     */
    $(document).body.addEvent('keydown', function(event) {
        
        // left arrow / p
        if (event.key == 'left' || event.key == 'p') {
            console.log('left');
        }
        
        // right arrow / n
        if (event.key == 'right' || event.key == 'n') {
            console.log('right');
        }
        
        // up arrow / +
        if (event.key == 'up' || event.key == '=') {
            console.log('up');
        }
        
        // down arrow
        if (event.key == 'down' || event.key == '-') {
            console.log('down');
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
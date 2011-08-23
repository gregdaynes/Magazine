var Pages = new Class(
{
    Extends: Pages,
    
    options: {
        keys: {
            previous: ['p', 'left'],
            next: ['n', 'right'],
            zoomIn: ['=', 'up'],
            zoomOut: ['-', 'down'],
            toolBar: ['t'],
            singlePage: ['s'],
            doublePage: ['d']
        }
    },
    
    initialize: function(options) {
        // Set the class options
        this.parent(options);
        
        var keys = this.options.keys;
        
        $(document).addEvent('keydown', function(event) {    
         
            Object.each(keys, function(option, identifier) {
                            
                if (option.length != null) {
                    option.each(function(key) {
                        if (event.key == key) {
                            this[identifier]();
                        }
                    }.bind(this));
                }
                
            }.bind(this));

        }.bind(this));
    },
    
    previous: function() {
        this.advance(-1);
    },
    
    next: function() {
        this.advance(1);
    },
    
    zoomIn: function() {
        this.zoom(1);
    },
    
    zoomOut: function() {
        this.zoom(-1);
    },
    


});
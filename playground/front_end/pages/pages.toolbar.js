var Pages = new Class(
{
    Extends: Pages,
    
    options: {
        toolbar:  'toolbar',
        next:     'next',
        previous: 'previous',
        zoomIncrease: 'zoom_increase',
        zoomDecrease: 'zoom_decrease'
    },
    
    initialize: function(options) {
        // Set the class options
        this.parent(options);
                
        // major elements
        this.toolbar   = document.id(this.options.toolbar);
                
        // toolbar buttons
        this.buttons          = {};                    
        this.buttons.next     = this.toolbar.getElement('[class~='+this.options.next+']').addEvent('click', function() {
                                    this.advance(1);
                                }.bind(this));
        this.buttons.previous = this.toolbar.getElement('[class~='+this.options.previous+']').addEvent('click', function() {
                                    this.advance(-1);
                                }.bind(this));
        this.buttons.zoomIncrease = this.toolbar.getElement('[class~='+this.options.zoomIncrease+']').addEvent('click', function() {
                                         this.zoom(1);
                                     }.bind(this));
        this.buttons.zoomDecrease = this.toolbar.getElement('[class~='+this.options.zoomDecrease+']').addEvent('click', function() {
                                         this.zoom(-1);
                                     }.bind(this));
    }
});
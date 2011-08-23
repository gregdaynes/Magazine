var Pages = new Class(
{
    Extends: Pages,
    
    options: {
        toolbar:  'toolbar',
        next:     'next',
        previous: 'previous',
        zoomIncrease: 'zoom_increase',
        zoomDecrease: 'zoom_decrease',
        singlePage: 'single_page',
        doublePage: 'double_page',
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
        this.buttons.single_page = this.toolbar.getElement('[class~='+this.options.singlePage+']').addEvent('click', function() {
                                         this.options.visiblePages = 1;
                                         this.fadePages();
                                     }.bind(this));
        this.buttons.double_page = this.toolbar.getElement('[class~='+this.options.doublePage+']').addEvent('click', function() {
                                         this.options.visiblePages = 2;
                                         this.fadePages();
                                     }.bind(this));
    }
});
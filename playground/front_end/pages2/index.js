window.addEvent('domready', function() {
    magazine = new Pages();
    
    if (Modernizr.touch) {
        
        /**
         * we can touch
         * wrapper + container should have scroll bars to handle scrolling about
         * sort of behaving like iframes
         */
        console.log('touchable');
        
        $(document).html.setStyle('overflow-y', 'auto');
        $('container').setStyles({
            'width': $('wrapper').getSize().x,
            'height': $('wrapper').getSize().y
        });
        
    } else {
        
        /**
         * we can't touch
         * need to use mootools drag.move to give drag feeling
         */
        console.log('not touchable');
        
        // load scroll.js for drag abilities
        // make content scrollbox                    
        var scrolljs = Asset.javascript('../../lib/js/scroll.js', {
            onLoad: function(){
                // make content scrollbox                    
                new Drag.Scroll($('container'));
                
                // must give scroll box height or it fails 
                $('container').setStyle('height', window.getSize().y - $('toolbar').getSize().y);
            }
        });
        
        window.addEvent('resize', function() {
            $('container').setStyle('height', window.getSize().y - $('toolbar').getSize().y);
        });
    }
    
    
});
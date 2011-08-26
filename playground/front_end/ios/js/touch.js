// Multi-touch & Gestures
// http://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW22

var scroll;

window.addEvent('domready', function() {
	var touchConsole = $('touchConsole'),
		touchLog     = $('touchLog'),
		curX		 = 0,
		curY		 = 0,
		startX		 = 0,
		startY		 = 0,
		endX		 = 0,
		endY		 = 0;
		
	var logEvent = function(event) {
		touchConsole.empty();
		Object.each(event, function(value, identifier) {
			touchConsole.set('html', touchConsole.get('html') + identifier + ': ' + value + ';<br />' );
		});
		
		touchLog.set('html', touchLog.get('html') + event.type+'; '); 
		
		if (scroll) {
		    scroll.destroy();
		    scroll = new iScroll($('scroll_outer'));
		}
		
	};

	
	// add events to touchMe element
	$('touchMe').addEvents({
		touchstart: function(event) {
			logEvent(event);
			
			startX = event.targetTouches[0].pageX;
			startY = event.targetTouches[0].pageY;
		},
		
		touchmove: function(event) {
			endX = event.targetTouches[0].pageX;
			endY = event.targetTouches[0].pageY;	
		},
		
		touchend: function(event) {
			touchLog.set('html', 'start: ' + startX + ';<br />End: ' + endX + ';<br />start: ' + startY + ';<br />End: ' + endY);		
		},
		
		touchcancel: function(event) {
		
		}
	});
	
});
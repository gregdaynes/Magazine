var XYZ = null;

// Scroller
// http://code.google.com/mobile/articles/webapp_fixed_ui.html
Scroller = function(element) {
  this.element = this;
  this.startTouchY = 0;
  this.animateTo(0);
    
  element.addEventListener('touchstart', this, false);
  element.addEventListener('touchmove', this, false);
  element.addEventListener('touchend', this, false);
}


Scroller.prototype.handleEvent = function(e) {
  switch (e.type) {
    case "touchstart":
      this.onTouchStart(e);
      break;
    case "touchmove":
      this.onTouchMove(e);
      break;
    case "touchend":
      this.onTouchEnd(e);
      break;
  }
}

Scroller.prototype.onTouchStart = function(e) {
  // This will be shown in part 4.
  this.stopMomentum();

  this.startTouchY = e.touches[0].clientY;
  this.contentStartOffsetY = this.contentOffsetY;
}

Scroller.prototype.onTouchMove = function(e) {
  if (this.isDragging()) {
    var currentY = e.touches[0].clientY;
    var deltaY = currentY - this.startTouchY;
    var newY = deltaY + this.contentStartOffsetY;
    this.animateTo(newY);
  }
}

Scroller.prototype.onTouchEnd = function(e) {
  if (this.isDragging()) {
    if (this.shouldStartMomentum()) {
      // This will be shown in part 3.
      this.doMomentum();
    } else {
      this.snapToBounds();
    }
  }
}

Scroller.prototype.animateTo = function(offsetY) {
  this.contentOffsetY = offsetY;

  // We use webkit-transforms with translate3d because these animations
  // will be hardware accelerated, and therefore significantly faster
  // than changing the top value.
  XYZ.style.webkitTransform = 'translate3d(0, ' + offsetY + 'px, 0)';
}

// Implementation of this method is left as an exercise for the reader.
// You need to measure the current position of the scrollable content
// relative to the frame. If the content is outside of the boundaries
// then simply reposition it to be just within the appropriate boundary.
Scroller.prototype.snapToBounds = function() {
  // ...
}

// Implementation of this method is left as an exercise for the reader.
// You need to consider whether their touch has moved past a certain
// threshold that should be considered 'dragging'.
Scroller.prototype.isDragging = function() {
  // ...
}

// Implementation of this method is left as an exercise for the reader.
// You need to consider the end velocity of the drag was past the
// threshold required to initiate momentum.
Scroller.prototype.shouldStartMomentum = function() {
  // ...
}

Scroller.prototype.doMomentum = function() {
  // Calculate the movement properties. Implement getEndVelocity using the
  // start and end position / time.
  var velocity = this.getEndVelocity();
  var acceleration = velocity < 0 ? 0.0005 : -0.0005;
  var displacement = - (velocity * velocity) / (2 * acceleration);
  var time = - velocity / acceleration;

  // Set up the transition and execute the transform. Once you implement this
  // you will need to figure out an appropriate time to clear the transition
  // so that it doesn’t apply to subsequent scrolling.
  this.element.style.webkitTransition = '-webkit-transform ' + time +
      'ms cubic-bezier(0.33, 0.66, 0.66, 1)';

  var newY = this.contentOffsetY + displacement;
  this.contentOffsetY = newY;
  this.element.style.webkitTransform = 'translate3d(0, ' + newY + 'px, 0)';
}

Scroller.prototype.stopMomentum = function() {
//  if (this.isDecelerating()) {
    // Get the computed style object.
//    var style = document.defaultView.getComputedStyle(this.element, null);
    // Computed the transform in a matrix object given the style.
//    var transform = new WebKitCSSMatrix(style.webkitTransform);
    // Clear the active transition so it doesn’t apply to our next transform.
//    this.element.style.webkitTransition = '';
    // Set the element transform to where it is right now.
//    this.animateTo(transform.m42);
//  }
}

window.addEvent('domready', function() {
	
	// remove native scrolling from page
	document.body.addEventListener('touchmove', function(e) {
	  // This prevents native scrolling from happening.
	  e.preventDefault();
	  
	  
	}, false);
	
	XYZ = $(document).getElement('[class=SCROLLER_FRAME]');
	
	var scroller = new Scroller(XYZ);
	
});


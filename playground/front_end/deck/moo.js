window.addEvent('domready', function() {
	
	var slides = $$('section'),
		currentSlide = 0,
		currentCounter = $$('#moo-nav .current em'),
		totalCounter = $$('#moo-nav .current i'),
		currentSlideName = null,
		title = document.getElement('title').get('html'),
		permalink = $$('#moo-nav .permalink a');
	
	/* current Page
	 * updates current page counter
	 */
	var update = function() {
		updatePageTitle();
		updatePageCounter();
		updateURIFragment();
		updatePermanentLink();
	};
	
	/* update permanent link
	 *
	 */
	var updatePermanentLink = function() {
		permalinkURI = new URI();
		permalinkURI.parsed.fragment = currentSlideName;
		permalink.set('href', permalinkURI.toString());
	};
	
	/* update page title
	 *
	 */
	var updatePageTitle = function() {
		currentSlideName = slides[currentSlide].getProperty('data-name');
		document.getElement('title').set('html', title+' - '+currentSlideName);
	};
	
	/* update page counter
	 *
	 */
	var updatePageCounter = function() {
		currentCounter.set('html', currentSlide + 1);
	};
	/**/
	
	/* update URI Fragment
	 *
	 */
	var updateURIFragment = function() {
		History.push('#'+currentSlideName);
	};
	
	/* goto function
	 *
	 */
	var gotoPage = function(page) {
		
		if (page > slides.length - 1) {
			page = slides.length;
		}
		
		currentSlide = page - 1;
		slide();
	};
	 
	/* Slide function
	 * advances to the next slide
	 */
	var slide = function() {
		
		// clear all slides
		slides.each(function(el) {
			el.set({
				class: ''
			});
		});
		
		// previous slide -> clearable
		if (currentSlide > 1) {
			slides[currentSlide - 2].set({
				class: ''
			});
		}
		
		// current slide -> previous
		if (currentSlide > 0) {
			slides[currentSlide - 1].set({
				class: 'state-ready-viewed'
			});
		}
		
		// ready slide -> current
		slides[currentSlide].set({
			class: 'state-current'
		});
		
		// next slide -> ready
		if (currentSlide < slides.length -1) {
			slides[currentSlide + 1].set({
				class: 'state-ready'
			});
		}
		
		update();
	};
	
	/* Buttons
	 * adds functions to next / previous
	 */
	$$('#moo-nav .next').addEvent('click', function() {
		if (currentSlide <= slides.length -2 ) { // slide index starts at 0, & we want to stop on the last slide
			currentSlide ++;
			slide();
		};
	});
	
	$$('#moo-nav .previous').addEvent('click', function() {
		if (currentSlide >= 1 ) { // slide index starts at 0, & we want to stop on the last slide
			currentSlide --;
			slide();
		};
	});
	/**/
	
	/* goto form
	 *
	 */
	$$('#moo-nav .goto form').addEvent('submit', function(event) {
		event.stop(); // stop propagation

		var page = this.getElement('[name=goto]').getProperty('value');
		gotoPage(page);
	});
	/**/
	
	/* Keyboard commands
	 *
	 */
	$(document).addEvent('keydown:keys("left")', function() {
		if (currentSlide >= 1 ) { // slide index starts at 0, & we want to stop on the last slide
			currentSlide --;
			slide();
		};
	});
	
	$(document).addEvent('keydown:keys("right")', function() {
		if (currentSlide <= slides.length -2 ) { // slide index starts at 0, & we want to stop on the last slide
			currentSlide ++;
			slide();
		};
	});
	
	/* initialize slides
	 *
	 */
	(function setupSlides() {
		startSlideID = 0;
		
		/* hashbang slide */
		startURI = new URI();
		startSlide = document.getElement('[data-name='+startURI.get('fragment')+']');
		
		if (startSlide) {
			startSlideID = startSlide.getProperty('id') -1; // -1 to match up page id with array
		}
		/**/
		
		currentSlide = startSlideID;
		slide(); // slides to current slide (which happens to be 0)
		totalCounter.set('html', slides.length);
	}());
	/**/
	
});
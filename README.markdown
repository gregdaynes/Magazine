### About

Magazine is an attempt to ease the pain for publisher who publish a traditional print publication to create an online version, accessible to desktop &amp; mobile devices, without the need to redesign/layout pages.

#### Idea

+ Simple interface
	+ new issue
	+ upload images/pdfs
		+ app automatically creates correct resolutions and slices for each page
	+ add metadata
	+ publish
	
+ Needs to be fast
	+ load fast
	+ render each page fast
	+ be responsive to users input

+ Flash free
	+ only HTML, CSS, JS need apply

---  

### Todo
+ Everything (not helpful I know)

#### Work in Progress / Active
+ Nooku interface
	+ Publisher view
		+ Logo view + upload
		
### Playground
+ Front End
	+ Javascript Class
		+ pages
		+ Keyboard Navigation
			+ &larr;	Previous Page
			+ &rarr;	Next Page
			+ &uarr;	Zoom In
			+ &darr;	Zoom Out
			+ P		Previous Page
			+ N		Next Page
			+ \+		Zoom in
			+ \-		Zoom Out
			+ T		Hide toolbar
			+ S		Single Page
			+ D		Double Page
	+ Page loading indicator: spin.js	
	+ page animations
		+ fade page out
		+ fade page in
		+ resize page
		+ resize wrapper
	+ Lazy Load images
	+ iOS features
		+ viewport size detected zoom level
		+ orientation page count
		+ swipe gestures
			+ right to left: next page
			+ left to right: previous page
			+ bottom to top: zoom out
			+ top to bottom: zoom in
			+ ---
			+ gestures should not interfere with panning
			+ ---
			+ http://padilicious.com/code/touchevents/
		+ remove toolbar / make buttons bigger
		+ home screen icon
		+ splash page / startup page
		+ General
			+ 16x16 favicon
			+ 32x32 favicon
		
		+ Multitsaking
			+ Be prepared for interruptions, and be ready to resume
			+ Make sure your UI can handle the double-high status bar.
				
		+ Animation
			+ cardflip (http://developer.apple.com/library/safari/#samplecode/CardFlip/Introduction/Intro.html#//apple_ref/doc/uid/DTS40007646-Intro-DontLinkElementID_2)
			+ http://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008032
			
		+ Multi-touch Events
			+ http://developer.apple.com/library/safari/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW22

+ Back End
	+ PDF parser
---  

### Future

+ tools to
	+ enable hyperlinks
	+ embed video
	+ embed image galleries
	+ accessiblity
	+ dynamic content
		+ ability to add text overtop of image text
		+ ability to add images overtop of image in text
		
+ page animation
+ async page loading
+ preload next page
+ click/heatmap
+ analytics
+ Page Flip + Binding mode
	+ CSS3 3d transform to render pages
	+ Look as if binded
	+ page flip (possible curl?)
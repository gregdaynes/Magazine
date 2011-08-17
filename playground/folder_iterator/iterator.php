<?php

$dir = "tmp/";
$folder_contents = array();

// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
	if ($dh = opendir($dir)) {
		while (($file = readdir($dh)) !== false) {
			
			if ($file != '.' && $file != '..') {
				$folder_contents[] = $file;
				//echo "filename: $file : filetype: " . filetype($dir . $file) . "<br />\n";
			}			
			
		}
		closedir($dh);
	}
}

foreach($folder_contents as $file) {
	// sql create query
	
	// move file to final folder
		// media://com_magazine/publisher_name/magazine_name/issue_name/page/page#.raw.ext
	
	// create folders for image sizes
		// z =  2 ~ 4096px ~ 16 wide - TOOO BIG!!!
		// z =  1 ~ 2048px ~  8 wide
		// z =  0 ~ 1024px ~  4 wide
		// z = -1 ~  512px ~  2 wide
		// z - -2 ~  256px ~  1 wide
}
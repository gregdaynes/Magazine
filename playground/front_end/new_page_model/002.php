<?php

// crop image
function gridCrop($dir, $page, $row, $col, $zoom) {
	
	if (!file_exists($dir.$page.'/cache/'.$zoom.'_r'.$row.'_c'.$col.'.jpg')) {
		// image path
		$imgPath = $dir.$page.'/'.$zoom.'.jpg';
		
		// get image dimensions
		list($width, $height) = getimagesize($imgPath);
		
		// create image
		$image = imagecreatefromjpeg($imgPath);
		$img = imagecreatetruecolor(256, 256);
		imagecopy($img, $image, 0, 0, ($col * 256), ($row * 256), 256, 256);
	
		imagejpeg($img, $dir.$page.'/cache/'.$zoom.'_r'.$row.'_c'.$col.'.jpg', 100);
	}
	
	echo $dir.$page.'/cache/'.$zoom.'_r'.$row.'_c'.$col.'.jpg';
}


$page = 0; $col = 0; $row = 0; $zoom = 0;
if (isset($_GET['p'])) { $page = $_GET['p']; }
if (isset($_GET['c'])) { $col  = $_GET['c']; }
if (isset($_GET['z'])) { $zoom = $_GET['z']; }
if (isset($_GET['r'])) { $row  = $_GET['r']; }

$dir  = "../../new_page_model/"; // magazine folder

$page = sprintf("%03s", $page); // make 3 characters, pad with 0's if needed

 // make zoom from '0' or '-0' to '_0'
if (strlen($zoom) > 1) {
	$zoom = substr($zoom, 1); 
}
$zoom = '_'.$zoom;

gridCrop($dir, $page, $row, $col, $zoom);

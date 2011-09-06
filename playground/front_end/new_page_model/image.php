<?php

$page = $_GET['p'];
$row  = $_GET['r'];
$col  = $_GET['c'];
$zoom = $_GET['z'];

$dir  = "../../new_page_model";
$page = sprintf("%03s", $page); // make 3 characters, pad with 0's if needed
$zoom = substr($zoom, 1);

$path = $dir.'/'.$page;
cropImage($path, $row, $col, $zoom);

// crop image
function cropImage($path, $r, $c, $z = 0) {
	if (!file_exists('../../new_page_model/001/cache/_'.$z.'_r'.$r.'_c'.$c.'.jpg')) {
		// image path
		$imgPath = $path.'/_'.$z.'.jpg';
		
		
		// get image dimensions
		list($width, $height) = getimagesize($imgPath);
		
		// create image
		$image = imagecreatefromjpeg($imgPath) or die('test');
		
		$img = imagecreatetruecolor(256, 256);
		
		imagecopy($img, $image, 0, 0, ($c * 256), ($r * 256), 256, 256);
	
	
		imagejpeg($img, '../../new_page_model/001/cache/_'.$z.'_r'.$r.'_c'.$c.'.jpg', 1);
	}
	
	echo '../../new_page_model/001/cache/_'.$z.'_r'.$r.'_c'.$c.'.jpg';
	
}



// create path to img



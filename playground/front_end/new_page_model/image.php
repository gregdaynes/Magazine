<?php


// crop image
function cropImage($path, $r, $c, $z) {
	
	if (!file_exists('../../new_page_model/001/cache/'.$z.'_r'.$r.'_c'.$c.'.jpg')) {
		// image path
		$imgPath = $path.$z.'.jpg';
		
		// get image dimensions
		list($width, $height) = getimagesize($imgPath);
		
		// create image
		$image = imagecreatefromjpeg($imgPath) or die('test');
		
		$img = imagecreatetruecolor(256, 256);
		
		imagecopy($img, $image, 0, 0, ($c * 256), ($r * 256), 256, 256);
	
	
		imagejpeg($img, '../../new_page_model/001/cache/'.$z.'_r'.$r.'_c'.$c.'.jpg', 100);
	}
	
	echo '../../new_page_model/001/cache/'.$z.'_r'.$r.'_c'.$c.'.jpg';
	
}

$page = $_GET['p'];
$row  = $_GET['r'];
$col  = $_GET['c'];
$zoom = $_GET['z'];

$dir  = "../../new_page_model/";
$page = sprintf("%03s", $page); // make 3 characters, pad with 0's if needed
$zoom = '_'.substr($zoom, 1);


$path = $dir.$page.'/';

	cropImage($path, $row, $col, $zoom);

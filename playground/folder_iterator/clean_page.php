<?php 

// vars
$dir = "../page_resources/";

// page number
if (!isset($_GET['p'])) {
	$p = 1;
} else {
	$p = $_GET['p'];
}

// zoom level
if (!isset($_GET['z'])) {
	$z = '0';
} else {
	$z = $_GET['z'];
}

$sizes = array( 
				'-3' => '1.2.220.286',
				'-2' => '1.2.252.328',
				'-1' => '2.2.284.370',
				'0'  => '2.3.436.568',
				'1'  => '3.4.630.821',
				'2'  => '3.4.728.949',
				'3'  => '4.6.1024.1335',
				'4'  => '8.11.2048.2669');
			
$grid_values = explode('.',$sizes[$z]);
$grid = new stdClass();

$grid->x = $grid_values[0];
$grid->y = $grid_values[1];
$grid->width = $grid_values[2];
$grid->height = $grid_values[3];

// get image count from db (folder in this test)
$p = sprintf("%03s", $p);
$dir = $dir.$p.'/'.$z.'/';

if (is_dir($dir)) {
	if ($dh = opendir($dir)) {
		while (($file = readdir($dh)) !== false) {
			
			if ($file != '.' && $file != '..') { // exclude . && .. folders
				$folder_contents[] = $file;
				//echo "filename: $file : filetype: " . filetype($dir . $file) . "<br />\n";
			}			
			
		}
		closedir($dh);
	}
	
	// build grid
	$j=1;
	for($i=0;$i<$grid->y;$i++)
	{
		echo '<div class="row">';
		
		for($n=0;$n<$grid->x;$n++)
		{
			$p = sprintf("%02s", $p); // pad single digit numbers
			$j = sprintf("%02s", $j); // pad single digit numbers
			echo '<div class="column"><img src="../'.$dir.$j.'.jpg" /></div>';
			$j++;
		}
		
		echo '</div>';
	}
}
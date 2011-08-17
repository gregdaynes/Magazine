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

// 2 up
$d = false;
if (isset($_GET['d'])) {
	$d = true;
}

$sizes = array(
			'-3' => '1.2.256.334',
			'-2' => '3.4.640.834',
			'-1' => '4.5.800.1043',
			'0'  => '4.6.1024.1334',
			'1'  => '8.12.2048.2669');
$grid_values = explode('.',$sizes[$z]);
$grid = new stdClass();

$grid->x = $grid_values[0];
$grid->y = $grid_values[1];
$grid->width = $grid_values[2];
$grid->height = $grid_values[3];

if ($d) {
	$grid->width = $grid->width;
}

?>
<style>
	html, body {
		margin: 0;
		padding: 0;
		<? if ($d) { echo 'width: '.($grid->width * 2).'px;'; } ?>
	}
	
	.page {
		width: <?= $grid->width; ?>px;
		height: <?= $grid->height; ?>px;
		overflow-y: hidden;
		overflow-x: hidden;
		display: block;
		margin: 25px auto 0;
		float: left;
	}
	
	
	.column {
		display: block;
		float: left;
		max-width: 256px;
		max-height: 256px;
	}
	
	.row {
		float: left;
		clear: both;
		display: block;
		height: 256px;
	}
	
</style>

<?php


		
// get image count from db (folder in this test)
$px = sprintf("%03s", $p);
	$dirx = $dir.$px.'/'.$z.'/';
	
	if (is_dir($dirx)) {
		if ($dh = opendir($dirx)) {
			while (($file = readdir($dh)) !== false) {
				
				if ($file != '.' && $file != '..') { // exclude . && .. folders
					$folder_contents[] = $file;
					//echo "filename: $file : filetype: " . filetype($dir . $file) . "<br />\n";
				}			
				
			}
			closedir($dh);
		}
	}


echo '<div class="page">';

// build grid

$j=1;
for($i=0;$i<$grid->y;$i++)
{
	echo '<div class="row">';
	
	for($n=0;$n<$grid->x;$n++)
	{
		$p = sprintf("%02s", $p); // pad single digit numbers
		$j = sprintf("%02s", $j); // pad single digit numbers
		echo '<div class="column"><img src="'.$dirx.$j.'.jpg" /></div>';
		$j++;
	}
	
	echo '</div>';
}

echo '</div>';

if ($d) {
	$px = sprintf("%03s", $p+1);
	echo '<div class="page">';
	
	// build grid
	
	$j=1;
	for($i=0;$i<$grid->y;$i++)
	{
		echo '<div class="row">';
		
		for($n=0;$n<$grid->x;$n++)
		{
			$p = sprintf("%02s", $p); // pad single digit numbers
			$j = sprintf("%02s", $j); // pad single digit numbers
			$dirx = $dir.$px.'/'.$z.'/';
			echo '<div class="column"><img src="'.$dirx.$j.'.jpg" /></div>';
			$j++;
		}
		
		echo '</div>';
	}
	
	echo '</div>';
}
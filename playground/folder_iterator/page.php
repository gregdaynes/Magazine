<?php 

// vars
$dir = "folder_idea/";

// zoom level
if (!$z = $_GET['z']) {
	$z = null;
}

$sizes = array(
			'xs' => '1.2.256.334',
			's'  => '2.3.512.667',
			'm'  => '4.6.1024.1334',
			'l'  => '8.12.2048.2669');
$grid_values = explode('.',$sizes[$z]);
$grid = new stdClass();

$grid->x = $grid_values[0];
$grid->y = $grid_values[1];
$grid->width = $grid_values[2];
$grid->height = $grid_values[3];

?>
<style>
	.page {
		width: <?= $grid->width; ?>px;
		height: <?= $grid->height; ?>px;
		overflow-y: hidden;
		overflow-x: hidden;
		display: block;
	}
	.column {
		display: block;
		float: left;
		width: 256px;
		height: 256px;
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
if ($z) {
	$dir = $dir.$z.'/';
	
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
		$j = sprintf("%02s", $j); // pad single digit numbers
		echo '<div class="column"><img src="'.$dir.'024-'.$j.'.jpg" /></div>';
		$j++;
	}
	
	echo '</div>';
}

echo '</div>';
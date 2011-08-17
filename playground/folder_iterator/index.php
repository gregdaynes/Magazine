<?php 
	// page
	if (!isset($_GET['p'])) {
		$p = 1;
	} else {
		$p = $_GET['p'];
	}
	
	// z
	if (!isset($_GET['z'])) {
		$z = '0';
	} else {
		$z = $_GET['z'];
	}
	
	// 2 up
	if (isset($_GET['d'])) {
		$d = true;
	}
	
	// sizes
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
?>

<!doctype html>
<html>
<head>
	<style>
		html, body {
			margin: 0;
			padding:  0;
			overflow: hidden;
		}
		
		body {
			padding:25px 0 0;
		}
		
		#page {
			width: 100%;
			height: 100%;
		}
		
		iframe {
			
			float: left;
			border: none;
		}
		
		nav {
			position: absolute;
			top: 0;
			left: 0;
			height: 25px;
			background-color: black;
			width: 100%;
		}
		
		a {
			color: white;
			text-decoration: none;
			line-height: 25px;
		}
		
		#zoom_negative, #zoom_positive {
			position: relative;
			left: 200px;
		}
		
		ul, li {
			
			list-style-type: none;
			list-style-image: none;
			list-style-position: inside;
			margin: 0;
			padding: 0;
		}
		
		ul {
			padding: 0 25px;
		}
		
		li {
			float: left;
			min-width: 23px;
			height: 23px;
			text-align: center;
		}
		
		#next {
			float: right;
		}
	</style>
</head>
<body>
	<nav>
		<ul>
			<li id="prev"><a href="./index.php?p=<?= $p-1; ?>&z=<?= $z; ?>">&lt;</a></li>
			
				<li id="zoom_negative"><a href="./index.php?z=<?= $z-1; ?>&p=<?= $p; ?>">-</a></li>
				<li id="zoom_positive"><a href="./index.php?z=<?= $z+1; ?>&p=<?= $p; ?>">+</a></li>
			
			<li id="next"><a href="./index.php?p=<?= $p+1; ?>&z=<?= $z; ?>">&gt;</a></li>
		</ul>
	</nav>
	<div id="page">
		<iframe width="1024px" height="800px" src="./page.php?z=<?= $z; ?>&p=<?= $p; ?>&d=<?= $d; ?>" scrolling="yes"/>
	</div>
	
	
</body>
</html>
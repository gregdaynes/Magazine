<?php 
	// params
	$params = new stdClass();
	$params->zoom_levels = array(
							   '-3' => array('width' => 256,  'height' => 334),
							   '-2'  => array('width' => 640,  'height' => 834),
							   '-1'   => array('width' => 800,  'height' => 1043),
							   '0'   => array('width' => 1024, 'height' => 1334),
							   '1'   => array('width' => 2048, 'height' => 2669)
						   );
	$params->wrapper = $params->zoom_levels;
	
	// config
	$config = new stdClass();	
	$config->page = (isset($_GET['p']) ? (int) $_GET['p'] : 0); // starting page
	$config->zoom = (isset($_GET['z']) ? $_GET['z'] : '0'); // zoom level 
	$config->layout = (isset($_GET['l']) ? (int) $_GET['l'] : 1); // layout
	$config->page_increment = 1;
	// modifiers
	if ($config->layout == 2) {
		foreach($params->wrapper as $name => $dimensions) {
			
			$params->wrapper[$name]['width'] = ($dimensions['width'] * 2) + 50;
			
		}
		
	}
	
	$page = $config->page; // get page
	$page_side = ($page % 2) ? true : false; // is it a right or left hand page
	
	$page_layout['left'] = $page;
	if ($config->layout >= 2) {
		
		$config->page_increment = 2;
		
		if ($page_side) { // right hand page
			// get previous page
			$page_layout['left'] = $page - 1;
			$page_layout['right'] = $page;
			
		} else { // left hand page
			// get next page
			$page_layout['left'] = $page;
			$page_layout['right'] = $page + 1;
		}
	}
?>
<!doctype html>
<head>
	<meta charset="utf-8">

	<title></title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet/less" type="text/css" href="./style.less">
	<style>
		.page {
			width: <?= $params->zoom_levels[$config->zoom]['width']; ?>px;
			height: <?= $params->zoom_levels[$config->zoom]['height']; ?>px;
		}
		
		.wrapper {
			width: <?= $params->wrapper[$config->zoom]['width'] + 25 + 4; ?>px;
			height: <?= $params->wrapper[$config->zoom]['height'] + 50; ?>px;
		}
	</style>
	<script src="./less.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/mootools/1.3.2/mootools-yui-compressed.js"></script>
	<script src="./mootools-more-1.3.2.1.js"></script>
	
	<script>
		// configuration
		var config = new Object();
			//config.page  = null;
			config.page = new Object();
			config.page.left = <?= $page_layout['left']; ?>;
			config.page.right = <?= (isset($page_layout['right']) ? $page_layout['right'] : 'null'); ?>;
			config.zoom   = <?= $config->zoom; ?>;
			config.layout = 1;
		
	</script>
</head>
<body>

	<nav>
		<span id="page_info" class="section">
			<span>Page title</span>
			<span>001</span>
		</span>
			
		<span id="page_tools">
			<span id="zoom" class="section">
				<a id="zoom_decrease" class="button" href="index.php?l=<?= $config->layout; ?>&z=<?= $config->zoom - 1; ?>&p=<?= $config->page; ?>">-</a>

				<a id="zoom_increase" class="button" href="index.php?l=<?= $config->layout; ?>&z=<?= $config->zoom + 1; ?>&p=<?= $config->page; ?>">+</a>
			</span>
			
			<span id="page_layout" class="section">
				<a id="single" class="button" href="index.php?l=1&z=<?= $config->zoom; ?>&p=<?= $config->page; ?>">Single</a>
				
				<a id="double" class="button" href="index.php?l=2&z=<?= $config->zoom; ?>&p=<?= $config->page; ?>">Double</a>
				
			</span>
		</span>
		
		<a id="prev" class="section first button" href="index.php?l=<?= $config->layout; ?>&z=<?= $config->zoom; ?>&p=<?= $config->page - $config->page_increment; ?>">Previous</a>

		<a id="toc" class="section button">ToC</a>
		
		<a  id="next" class="section last button"href="index.php?l=<?= $config->layout; ?>&z=<?= $config->zoom; ?>&p=<?= $config->page + $config->page_increment; ?>">Next</a>

	</nav>
	
	<div id="content">
		<div class="wrapper">		
				
		<?php 
		foreach($page_layout as $side => $this_page) : ?>
			<div id="<?= $this_page; ?>" class="page <?= $side; ?> <? if ($this_page == 0) { echo ' disabled'; } ?>"></div>
		<?php endforeach; ?>
		
		</div>
	</div>
		
	<script src="./scroll.js"></script>
	<script src="./nav.js"></script>
</body>
</html>

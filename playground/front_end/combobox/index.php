<!doctype html>
<head>
	<meta charset="utf-8">

	<title></title>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet/less" type="text/css" href="../../lib/css/style.less">
	
	<link rel="stylesheet/less" type="text/css" href="./nav.less">
	<link rel="stylesheet/less" type="text/css" href="./scroll.less">

	<script src="../../lib/js/less.js"></script>
	<script src="../../lib/js/mootools.js"></script>
	<script src="../../lib/js/mootools-more.js"></script>
	<script src="../../lib/js/spin.js"></script>
	<script src="../../lib/js/scroll.js"></script>
</head>
<body>

	<nav id="toolbar">
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
		<div id="wrapper" class="wrapper"></div>
	</div>
	
	<script src="./nav.js"></script>
</body>
</html>

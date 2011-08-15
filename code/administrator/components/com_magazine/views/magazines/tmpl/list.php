<?php
	$parts = array(
		'publisher'	=> $state->publisher,
		'magazine'	=> $state->magazine
	);
	
	$route = new stdClass();
	
	foreach($parts as $index => $value) {
		$route->$index = $index.'='.$value;
	}
?>

<ul>
	<li class="<?= !is_numeric($state->magazine) ? 'active' : ''; ?>">
		<a href="<?= @route($route->publisher.'&magazine=' ) ?>">
		    <?= @text('All magazines')?>
		</a>
	</li>
	<? foreach($magazines as $magazine) : ?>
	<li class="<?= $state->magazine == $magazine->id ? 'active' : ''; ?>">
		<a href="<?= @route($route->publisher.'&magazine='.$magazine->id) ?>">
			<?= @escape($magazine->name) ?>
		</a>
	</li>
	<? endforeach ?>
</ul>
<ul>
	<li class="<?= !is_numeric($state->publisher) ? 'active' : ''; ?>">
		<a href="<?= @route('publisher=' ) ?>">
		    <?= @text('All publishers')?>
		</a>
	</li>
	<? foreach($publishers as $publisher) : ?>
	<li class="<?= $state->publisher == $publisher->id ? 'active' : ''; ?>">
		<a href="<?= @route('publisher='.$publisher->id) ?>">
			<?= @escape($publisher->name) ?>
		</a>
	</li>
	<? endforeach ?>
</ul>
<script src="media://lib_koowa/js/koowa.js" />
<style src="media://lib_koowa/css/koowa.css" />
<?= @helper('behavior.tooltip'); ?>

<form action="<?= @route() ?>" method="get" class="-koowa-grid">
	<table class="adminlist">
		<thead>
			<tr>
				<th width="5%"></th>
				<th>
					<?= @helper('grid.sort', array('column' => 'name', 'title' => 'Name')); ?>
				</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<td colspan="2">
					<?= @helper('paginator.pagination', array('total' => $total)) ?>
				</td>
			</tr>
		</tfoot>
		<tbody>
			<? foreach ($publishers as $publisher) : ?>
			<tr>
				<td align="center">
					<?= @helper('grid.checkbox', array('row' => $publisher)); ?>
				</td>
				<td align="left">
					<span class="editlinktip hasTip" title="<?= @text('Edit') ?> <?= @escape($publisher->name); ?>::<?= @escape(substr($publisher->notes, 0, 300)).'&hellip;'; ?>">
						<a href="<?= @route('view=publisher&id='.$publisher->id); ?>">
							<?= @escape($publisher->name); ?>
					</span>
				</td>
			</tr>
			<? endforeach; ?>
			
			<? if (!count($publishers)) : ?>
				<tr>
					<td colspan="2" align="center">
						<?= @text('No Publishers Found'); ?>
					</td>
				</tr>
			<? endif; ?>
		</tbody>
	</table>
</form>
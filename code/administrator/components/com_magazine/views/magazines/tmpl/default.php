<script src="media://lib_koowa/js/koowa.js" />
<style src="media://lib_koowa/css/koowa.css" />
<?= @helper('behavior.tooltip'); ?>

<?= @template('default_sidebar'); ?>

<form action="<?= @route() ?>" method="get" class="-koowa-grid">
	<table class="adminlist">
		<thead>
			<tr>
				<th width="5%"></th>
				<th>
					<?= @helper('grid.sort', array('column' => 'name', 'title' => 'Name')); ?>
				</th>
				<th>
					<?= @helper('grid.sort', array('column' => 'name', 'title' => 'Publisher')); ?>
				</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<td colspan="3">
					<?= @helper('paginator.pagination', array('total' => $total)) ?>
				</td>
			</tr>
		</tfoot>
		<tbody>
			<? foreach ($magazines as $magazine) : ?>
			<tr>
				<td align="center">
					<?= @helper('grid.checkbox', array('row' => $magazine)); ?>
				</td>
				<td align="left">
					<span class="editlinktip hasTip" title="<?= @text('Edit') ?> <?= @escape($magazine->name); ?>::<?= @escape(substr($magazine->notes, 0, 300)).'&hellip;'; ?>">
						<a href="<?= @route('view=magazine&id='.$magazine->id); ?>">
							<?= @escape($magazine->name); ?>
					</span>
				</td>
				<td align="center">
					<?= @escape($magazine->publisher); ?>
				</td>
			</tr>
			<? endforeach; ?>
			
			<? if (!count($magazines)) : ?>
				<tr>
					<td colspan="3" align="center">
						<?= @text('No Magazines Found'); ?>
					</td>
				</tr>
			<? endif; ?>
		</tbody>
	</table>
</form>
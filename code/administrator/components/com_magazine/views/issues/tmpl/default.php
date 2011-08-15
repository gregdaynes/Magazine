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
					<?= @helper('grid.sort', array('column' => 'name', 'title' => 'Magazine')); ?>
				</th>
				<th width="7%">
				    <?= @helper('grid.sort', array('column' => 'featured')) ?>
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
			<? foreach ($issues as $issue) : ?>
			<tr>
				<td align="center">
					<?= @helper('grid.checkbox', array('row' => $issue)); ?>
				</td>
				<td align="left">
					<span class="editlinktip hasTip" title="<?= @text('Edit') ?> <?= @escape($issue->name); ?>::<?= @escape(substr($issue->notes, 0, 300)).'&hellip;'; ?>">
						<a href="<?= @route('view=issue&id='.$issue->id); ?>">
							<?= @escape($issue->name); ?>
					</span>
				</td>
				<td align="center">
					<?= @escape($issue->magazine); ?>
				</td>
				<td align="center">
					<?= @helper('grid.latest', array('row' => $issue)) ?>
				</td>
			</tr>
			<? endforeach; ?>
			
			<? if (!count($issues)) : ?>
				<tr>
					<td colspan="4" align="center">
						<?= @text('No Issues Found'); ?>
					</td>
				</tr>
			<? endif; ?>
		</tbody>
	</table>
</form>
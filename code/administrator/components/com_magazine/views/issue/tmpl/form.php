<script src="media://lib_koowa/js/koowa.js" />
<style src="media://lib_koowa/css/koowa.css" />
<style src="media://com_magazine/css/form.css" />

<form action="<?= @route('id='.$issue->id) ?>" method="post" class="-koowa-form">
	<div class="grid_8">
	
		<div class="border-radius-4 name clearfix">
			<input class="inputbox border-radius-4" type="text" name="name" id="name" size="40" maxlength="255" value="<?= @escape($issue->name) ?>" placeholder="<?= @text('Issue Name') ?>" />
		
			<label for="alias">
				<?= @text( 'Alias' ) ?>
				<input class="inputbox border-radius-4" type="text" name="slug" id="slug" size="40" maxlength="255" value="<?= @escape($issue->slug) ?>" title="<?= @text('ALIASTIP') ?>" placeholder="<?= @text('issue-name') ?>"/>
			</label>
		</div>
		
		<div class="panel">
			<h3><?= @text('Details'); ?></h3>
			<table class="admintable">
				<tbody>
					<tr>
						<td valign="top" class="key">
							<label for="magazine">
								<?= @text('Magazine'); ?>
							</label>
						</td>
						<td>
							<?= @helper('admin::com.magazine.template.helper.listbox.magazines',
								array(
									'name'		=> 'magazine',
									'selected'	=> $issue->magazine,
									'value'		=> 'id',
									'text'		=> 'name'
								)); ?>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="grid_4">
		<div class="panel">
	        <h3><?= @text('Description') ?></h3>
	        <textarea class="inputbox" cols="70" rows="12" name="description" id="description"><?= @escape($issue->description) ?></textarea>
	    </div>
	</div>	
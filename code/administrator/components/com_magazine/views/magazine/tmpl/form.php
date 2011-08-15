<script src="media://lib_koowa/js/koowa.js" />
<style src="media://lib_koowa/css/koowa.css" />
<style src="media://com_magazine/css/form.css" />

<form action="<?= @route('id='.$magazine->id) ?>" method="post" class="-koowa-form">
	<div class="grid_8">
	
		<div class="border-radius-4 name clearfix">
			<input class="inputbox border-radius-4" type="text" name="name" id="name" size="40" maxlength="255" value="<?= @escape($magazine->name) ?>" placeholder="<?= @text('Magazine Name') ?>" />
		
			<label for="alias">
				<?= @text( 'Alias' ) ?>
				<input class="inputbox border-radius-4" type="text" name="slug" id="slug" size="40" maxlength="255" value="<?= @escape($magazine->slug) ?>" title="<?= @text('ALIASTIP') ?>" placeholder="<?= @text('magazine-name') ?>"/>
			</label>
		</div>
		
		<div class="panel">
			<h3><?= @text('Details'); ?></h3>
			<table class="admintable">
				<tbody>
					<tr>
						<td valign="top" class="key">
							<label for="publisher">
								<?= @text('Publisher'); ?>
							</label>
						</td>
						<td>
							<?= @helper('admin::com.magazine.template.helper.listbox.publishers',
								array(
									'name'		=> 'publisher',
									'selected'	=> $magazine->publisher,
									'value'		=> 'id',
									'text'		=> 'name'
								)); ?>
						</td>
					</tr>
					<tr>
						<td valign="top" class="key">
							<label for="latest_issue">
								<?= @text('Latest Issue'); ?>
							</label>
						</td>
						<td>
							<?= @helper('admin::com.magazine.template.helper.listbox.issues',
								array(
									'name'		=> 'latest_issue',
									'value'		=> 'id',
									'text'		=> 'name'
								)); ?>
						</td>
					</tr>
					<tr>
						<td valign="top" class="key">
							<label for="web_address">
								<?= @text('Web Address'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="web_address" id="web_address" size="40" maxlength="255" value="<?= @escape($magazine->web_address) ?>" title="<?= @text('Web Address'); ?>"  placeholder="<?= @text('www.magazine-website.com') ?>" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="grid_4">
		<div class="panel">
	        <h3><?= @text('Description') ?></h3>
	        <textarea class="inputbox" cols="70" rows="12" name="description" id="description"><?= @escape($magazine->description) ?></textarea>
	    </div>
	</div>	
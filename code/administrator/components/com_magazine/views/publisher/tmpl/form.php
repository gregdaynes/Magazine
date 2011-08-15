<script src="media://lib_koowa/js/koowa.js" />
<style src="media://lib_koowa/css/koowa.css" />
<style src="media://com_magazine/css/form.css" />

<form action="<?= @route('id='.$publisher->id) ?>" method="post" class="-koowa-form">
	<div class="grid_8">
	
		<div class="border-radius-4 name clearfix">
			<div class="border-radius-4 name" style="float: left; width: 15%; height: 50px; " >
				@TODO Publisher Logo
			</div>
			
			<span style="float:left; width: 80%; ">
				<input class="inputbox border-radius-4" type="text" name="name" id="name" size="40" maxlength="255" value="<?= @escape($publisher->name) ?>" placeholder="<?= @text('Publisher Name') ?>" />
			
				<label for="alias">
					<?= @text( 'Alias' ) ?>
					<input class="inputbox border-radius-4" type="text" name="slug" id="slug" size="40" maxlength="255" value="<?= @escape($publisher->slug) ?>" title="<?= @text('ALIASTIP') ?>" placeholder="<?= @text('publisher-name') ?>"/>
				</label>
			</span>
		</div>
		
		<div class="panel">
			<h3><?= @text('Contact Details'); ?></h3>
			<table class="admintable">
				<tbody>
					<tr>
						<td valign="top" class="key">
							<label for="street_address">
								<?= @text('Street Address'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="street_address" id="street_address" size="40" maxlength="255" value="<?= @escape($publisher->address) ?>" title="<?= @text('Address'); ?>"  placeholder="<?= @text('123 Fake St.') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="city">
								<?= @text('City'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="city" id="city" size="40" maxlength="255" value="<?= @escape($publisher->city) ?>" title="<?= @text('City'); ?>"  placeholder="<?= @text('Fakeville') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="state">
								<?= @text('State/Province'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="state" id="state" size="40" maxlength="255" value="<?= @escape($publisher->state) ?>" title="<?= @text('State/Province'); ?>"  placeholder="<?= @text('District of Fakeberg') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="country">
								<?= @text('Country'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="country" id="country" size="40" maxlength="255" value="<?= @escape($publisher->country) ?>" title="<?= @text('Country'); ?>"  placeholder="<?= @text('Fakeland') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="zip_code">
								<?= @text('Zip Code'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="zip_code" id="zip_code" size="40" maxlength="255" value="<?= @escape($publisher->zip_code) ?>" title="<?= @text('Zip Code'); ?>"  placeholder="<?= @text('1a2 b3c') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="telephone">
								<?= @text('Telephone'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="tel" name="telephone" id="telephone" size="40" maxlength="255" value="<?= @escape($publisher->telephone) ?>" title="<?= @text('Telephone'); ?>"  placeholder="<?= @text('1 555 556 6789') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="email_address">
								<?= @text('Email Address'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="email_address" id="email_address" size="40" maxlength="255" value="<?= @escape($publisher->email_address) ?>" title="<?= @text('Email Address'); ?>"  placeholder="<?= @text('fake_account@fakeisp.com') ?>" />
						</td>
					</tr>
					
					<tr>
						<td valign="top" class="key">
							<label for="web_address">
								<?= @text('Web Address'); ?>
							</label>
						</td>
						<td>
							<input class="inputbox border-radius-4" type="text" name="web_address" id="web_address" size="40" maxlength="255" value="<?= @escape($publisher->web_address) ?>" title="<?= @text('Web Address'); ?>"  placeholder="<?= @text('www.publisher-website.com') ?>" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="grid_4">
		<div class="panel">
	        <h3><?= @text('Description') ?></h3>
	        <textarea class="inputbox" cols="70" rows="12" name="description" id="description"><?= @escape($publisher->description) ?></textarea>
	    </div>
	</div>	
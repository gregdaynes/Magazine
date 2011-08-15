<div id="sidebar" class="-koowa-box-scroll">
	<h3><?= @text('Publishers')?></h3>
	<?= @template('admin::com.magazine.view.publishers.list', array('publishers' => KFactory::tmp('admin::com.magazine.model.publishers')->getList())); ?>
</div>

<div id="sidebar" class="-koowa-box-scroll">
	<h3><?= @text('Magazines')?></h3>
	<?= @template('admin::com.magazine.view.magazines.list', array('magazines' => KFactory::tmp('admin::com.magazine.model.magazines')->getList())); ?>
</div>
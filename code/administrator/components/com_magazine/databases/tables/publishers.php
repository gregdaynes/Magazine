<?php

class ComMagazineDatabaseTablePublishers extends KDatabaseTableDefault
{
	public function _initialize(KConfig $config)
	{
		$sluggable = KDatabaseBehavior::factory('sluggable', array('columns' => array('name')));
		
		$config->append(array(
			'behaviors'	=> array($sluggable)
		));

		parent::_initialize($config);
	}
}
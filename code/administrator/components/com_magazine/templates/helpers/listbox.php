<?php

class ComMagazineTemplateHelperListbox extends ComDefaultTemplateHelperListbox
{
	public function publishers($config = array())
	{
		$config = new KConfig($config);
		$config->append(array(
			'model'		=> 'publishers',
			'name' 		=> 'publisher',
			'attribs'	=> $config->attribs
		))->append(array(
			'value'		=> $config->name,
			'selected'	=> $config->selected
		))->append(array(
			'text'		=> $config->value,
			'deselect'  => true
		));
		
		$model = KFactory::tmp('admin::com.magazine.model.publishers');

		$list = $model->getList($config->column);
		
		$options   = array();
		if($config->deselect) {
			$options[] = $this->option(array('text' => '- '.JText::_( 'Select').' -'));
		}
		
		foreach($list as $item) {
			$options[] =  $this->option(array('text' => $item->{$config->text}, 'value' => $item->{$config->value}));
		}
		
		//Add the options to the config object
		$config->options = $options;
	
		return $this->optionlist($config);
	}
	
	public function magazines($config = array())
	{
		$config = new KConfig($config);
		$config->append(array(
			'model'		=> 'magazines',
			'name' 		=> 'magazine',
			'attribs'	=> $config->attribs
		))->append(array(
			'value'		=> $config->name,
			'selected'	=> $config->selected
		))->append(array(
			'text'		=> $config->value,
			'deselect'  => true
		));
		
		$model = KFactory::tmp('admin::com.magazine.model.magazines');

		$list = $model->getList($config->column);
		
		$options   = array();
		if($config->deselect) {
			$options[] = $this->option(array('text' => '- '.JText::_( 'Select').' -'));
		}
		
		foreach($list as $item) {
			$options[] =  $this->option(array('text' => $item->{$config->text}, 'value' => $item->{$config->value}));
		}
		
		//Add the options to the config object
		$config->options = $options;
	
		return $this->optionlist($config);
	}
	
	public function issues($config = array())
	{
		$config = new KConfig($config);
		$config->append(array(
			'model'		=> 'issues',
			'name' 		=> 'issue',
			'attribs'	=> $config->attribs
		))->append(array(
			'value'		=> $config->name
		))->append(array(
			'text'		=> $config->value,
			'deselect'  => true
		));
		
		$id = KRequest::get('get.id', 'int', null);
		
		$model = KFactory::tmp('admin::com.magazine.model.issues')
					->set('magazine', $id)
					;
		

		$list = $model->getList($config->column);
		
		$options   = array();
		if($config->deselect) {
			$options[] = $this->option(array('text' => '- '.JText::_( 'Select').' -'));
		}
		
		foreach($list as $item) {
			if ($item->latest_issue) { $config->append(array('selected' => $item->id)); }
				
			$options[] =  $this->option(array('text' => $item->{$config->text}, 'value' => $item->{$config->value}));
		}
		
		//Add the options to the config object
		$config->options = $options;
	
		return $this->optionlist($config);
	}
}
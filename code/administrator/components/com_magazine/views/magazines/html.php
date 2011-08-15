<?php

class ComMagazineViewMagazinesHtml extends ComDefaultViewHtml
{
	public function display()
	{
		$magazines = $this->getModel()->getList();
		
		foreach($magazines as $magazine)
		{
			$magazine->publisher = KFactory::tmp('admin::com.magazine.model.publishers')
				->set('id', $magazine->publisher)
				->getItem()
				->name
				;		
		}
		
		return parent::display();
	}
}
<?php

class ComMagazineViewIssuesHtml extends ComDefaultViewHtml
{
	public function display()
	{
		$issues = $this->getModel()->getList();
		
		foreach($issues as $issue)
		{
			$issue->magazine = KFactory::tmp('admin::com.magazine.model.magazines')
				->set('id', $issue->magazine)
				->getItem()
				->name
				;
		}
		
		return parent::display();
	}
}
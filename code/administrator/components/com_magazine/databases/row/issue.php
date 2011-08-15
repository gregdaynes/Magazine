<?php

class ComMagazineDatabaseRowIssue extends KDatabaseRowDefault
{
	public function save()
	{
		$modified = $this->_modified;
		$result = parent::save();
		
		if(isset($modified['latest_issue']))
		{
			$issues = KFactory::tmp('admin::com.magazine.model.issues')
						->set('magazine', $this->magazine)
						->set('latest_issue', 0)
						->getList();
			
			$table = KFactory::get('admin::com.magazine.database.table.issues');		
			
			foreach($issues as $issue)
			{	
				if ($issue->id != $this->id) {
					$issue->latest_issue = 0;
					$table->update($issue);
				}
			}
		}
		
		return (bool) $result;
	}
}
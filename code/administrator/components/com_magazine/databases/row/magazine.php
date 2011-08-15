<?php

class ComMagazineDatabaseRowMagazine extends KDatabaseRowDefault
{
	public function save()
	{
		$modified = $this->_modified;
		$result = parent::save();
		
		if(isset($modified['latest_issue']))
		{
			$issues = KFactory::tmp('admin::com.magazine.model.issues')
						->set('magazine', $this->id)
						->set('latest_issue', 0)
						->getList();
			
			$table = KFactory::get('admin::com.magazine.database.table.issues');		
			
			foreach($issues as $issue)
			{	
				if ($issue->id != $this->latest_issue) {
					$issue->latest_issue = 0;
				} else {
					$issue->latest_issue = 1;
				}
				
				$table->update($issue);
			}
		}
		
		return (bool) $result;
	}
}
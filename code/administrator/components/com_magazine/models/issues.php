<?php

class ComMagazineModelIssues extends ComDefaultModelDefault
{
    public function __construct(KConfig $config)
    {
        parent::__construct($config);
        
        $this->_state
        	->insert('publisher', 'int')
            ->insert('magazine', 'int')
            ;
    }
    
    protected function _buildQueryWhere(KDatabaseQuery $query)
    {
        parent::_buildQueryWhere($query);
        
        $state = $this->_state;
        
        if (is_numeric($state->magazine)) {
            $query->where('tbl.magazine', '=', $state->magazine);
        }
    }
}
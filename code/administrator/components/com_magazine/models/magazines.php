<?php

class ComMagazineModelMagazines extends ComDefaultModelDefault
{
    public function __construct(KConfig $config)
    {
        parent::__construct($config);
        
        $this->_state
            ->insert('publisher', 'int')
            ;
            
        if (!$this->_state->publisher) {
        	$this->_state->publisher = KRequest::get('get.publisher', 'int', null);
        }
    }
    
    protected function _buildQueryWhere(KDatabaseQuery $query)
    {
        parent::_buildQueryWhere($query);
        
        $state = $this->_state;
        
        if (is_numeric($state->publisher)) {
            $query->where('tbl.publisher', '=', $state->publisher);
        }
    }
}
<?php

class ComMagazineModelPublishers extends ComDefaultModelDefault
{
    public function __construct(KConfig $config)
    {
        parent::__construct($config);
        
        $this->_state
            ->insert('publisher', 'int')
            ;
    }
    
    protected function _buildQueryWhere(KDatabaseQuery $query)
    {
        parent::_buildQueryWhere($query);
        
        $state = $this->_state;
        
        if (is_numeric($state->publisher)) {
            $query->where('tbl.id', '=', $state->publisher);
        }
    }
}
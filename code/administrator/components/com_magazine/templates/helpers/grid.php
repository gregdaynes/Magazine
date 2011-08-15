<?php

class ComMagazineTemplateHelperGrid extends KTemplateHelperGrid
{
    public function latest($config = array())
    {
        $config = new KConfig($config);
        $config->append(array(
            'row'   => null,
            'field' => 'latest_issue'
        ))->append(array(
		    'data'	=> array($config->field => $config->row->{$config->field})
		));

        $image    = $config->row->latest_issue ? 'enabled.png' : 'disabled.png';
        $alt 	  = $config->row->enabled ? JText::_( 'Featured' ) : JText::_( 'Unfeatured' );
       
        $config->data->{$config->field} =  $config->row->{$config->field} ? 0 : 1;
        $data = str_replace('"', '&quot;', $config->data);
        
        $html = '<script src="media://lib_koowa/js/koowa.js" />';
        $html .= '<img src="media://lib_koowa/images/'.$image.'" border="0" alt="'.$alt.'" data-action="edit" data-data="'.$data.'" />';

        return $html;
    }
}
<?php

class ComMagazineControllerToolbarMenubar extends ComDefaultControllerToolbarMenubar
{
    public function getCommands()
    {
        $name = $this->getController()->getIdentifier()->name;
        
        $this->addCommand('Publishers', array(
            'href'   => JRoute::_('index.php?option=com_magazine&view=publishers'),
            'active' => ($name == 'publishers')
        ));
        
        $this->addCommand('Magazines', array(
            'href'   => JRoute::_('index.php?option=com_magazine&view=magazines'),
            'active' => ($name == 'magazines')
        ));
        
        $this->addCommand('Issues', array(
            'href'   => JRoute::_('index.php?option=com_magazine&view=issues'),
            'active' => ($name == 'issues')
        ));
        
        $this->addCommand('Pages', array(
            'href'   => JRoute::_('index.php?option=com_magazine&view=pages'),
            'active' => ($name == 'pages')
        ));
                        
        return parent::getCommands();
    }
}
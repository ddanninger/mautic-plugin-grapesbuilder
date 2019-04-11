<?php

namespace MauticPlugin\MauticGrapesbuilderBundle\Integration;

use Mautic\PluginBundle\Integration\AbstractIntegration;

class GrapesbuilderIntegration extends AbstractIntegration
{
    public function getName()
    {
        return 'Grapesbuilder';
    }

    /**
     * Return's authentication method such as oauth2, oauth1a, key, etc.
     *
     * @return string
     */
    public function getAuthenticationType()
    {
        return 'none';
    }

    /**
     * Return array of key => label elements that will be converted to inputs to
     * obtain from the user.
     *
     * @return array
     */
    public function getRequiredKeyFields()
    {
        return [
            
        ];
    }
}

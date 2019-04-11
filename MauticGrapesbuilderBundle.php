<?php
// plugins/HelloWorldBundle/HelloWorldBundle.php

namespace MauticPlugin\MauticGrapesbuilderBundle;

use Mautic\PluginBundle\Bundle\PluginBundleBase;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class MauticGrapesbuilderBundle extends PluginBundleBase
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);
    }
}

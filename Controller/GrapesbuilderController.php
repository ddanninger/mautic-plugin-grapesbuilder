<?php

namespace MauticPlugin\MauticGrapesbuilderBundle\Controller;

use Mautic\CoreBundle\Controller\FormController;

class GrapesbuilderController extends FormController
{
    public function indexAction($objectId)
    {
        $model  = $this->getModel('page');
        $entity = $model->getEntity($objectId);

        return $this->delegateView(
            array(
                'viewParameters'  => array(
                    'objectId'   => $objectId
                ),
                'contentTemplate' => 'MauticGrapesbuilderBundle:Builder:index.html.php',
                'passthroughVars' => array(
                    'activeLink'    => 'mautic_grapesbuilder_index',
                    'route'         => $this->generateUrl('mautic_grapesbuilder_index', array('objectId' => $objectId)),
                    'mauticContent' => 'openGrapesPrerenderer'
                )
            )
        );
    }

    public function internalAction($objectId)
    {
        $model  = $this->getModel('page');
        $entity = $model->getEntity($objectId);
        
        return $this->delegateView(
            array(
                'viewParameters'  => array(
                    'entity'   => $entity
                ),
                'contentTemplate' => 'MauticGrapesbuilderBundle:Builder:internal.html.php',
                'passthroughVars' => array(
                    'activeLink'    => 'mautic_grapesbuilder_internal',
                    'route'         => $this->generateUrl('mautic_grapesbuilder_internal', array('objectId' => $objectId)),
                    'mauticContent' => 'openGrapesbuilder'
                )
            )
        );
    }
}

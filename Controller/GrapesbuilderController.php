<?php

namespace MauticPlugin\MauticGrapesbuilderBundle\Controller;

use Mautic\CoreBundle\Controller\FormController;

class GrapesbuilderController extends FormController
{
    public function indexAction($objectType, $callView, $objectId)
    {
        $model = $this->getModel($objectType);
        $entity = $model->getEntity($objectId);

        return $this->delegateView(
            array(
                'viewParameters' => array(
                    'objectType' => $objectType,
                    'objectId' => $objectId,
                    'callView' => $callView,
                ),
                'contentTemplate' => 'MauticGrapesbuilderBundle:Builder:index.html.php',
                'passthroughVars' => array(
                    'activeLink' => 'mautic_grapesbuilder_index',
                    'route' => $this->generateUrl('mautic_grapesbuilder_index', array('objectType' => $objectType, 'callView' => $callView, 'objectId' => $objectId)),
                    'mauticContent' => 'openGrapesPrerenderer',
                ),
            )
        );
    }

    public function internalAction($objectType, $callView, $objectId)
    {
        $model = $this->getModel($objectType);
        $entity = $model->getEntity($objectId);

        $mauticContent = 'openGrapesPagebuilder';
        if ($objectType == 'email') {
            $mauticContent = $callView == 'html' ? 'openGrapesEmailHtmlbuilder' : 'openGrapesEmailMjmlbuilder';
        }

        return $this->delegateView(
            array(
                'viewParameters' => array(
                    'entity' => $entity,
                ),
                'contentTemplate' => 'MauticGrapesbuilderBundle:Builder:internal.html.php',
                'passthroughVars' => array(
                    'activeLink' => 'mautic_grapesbuilder_internal',
                    'route' => $this->generateUrl('mautic_grapesbuilder_internal', array('objectType' => $objectType, 'callView' => $callView, 'objectId' => $objectId)),
                    'mauticContent' => $mauticContent,
                ),
            )
        );
    }
}

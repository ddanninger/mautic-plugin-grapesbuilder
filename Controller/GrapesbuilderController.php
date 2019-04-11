<?php

namespace MauticPlugin\MauticGrapesbuilderBundle\Controller;

use Mautic\CoreBundle\Controller\FormController;

class GrapesbuilderController extends FormController
{
    public function indexAction($objectType, $objectId, $ignorePost = false)
    {
        $model = $this->getModel($objectType);
        $entity = $model->getEntity($objectId);
        $session = $this->get('session');

        if ($objectType == 'page') {
            $page = $this->get('session')->get('mautic.page.page', 1);
            $returnUrl = $this->generateUrl('mautic_page_index', ['page' => $page]);
            $postActionVars = [
                'returnUrl' => $returnUrl,
                'viewParameters' => ['page' => $page],
                'contentTemplate' => 'MauticPageBundle:Page:index',
                'passthroughVars' => [
                    'activeLink' => 'mautic_page_index',
                    'mauticContent' => 'page',
                ],
            ];

            $formView = 'MauticPageBundle:Page:form.html.php';
            $formTheme = 'MauticPageBundle:FormTheme\Page';
        } else {
            $page = $this->get('session')->get('mautic.email.page', 1);
            $returnUrl = $this->generateUrl('mautic_email_index', ['page' => $page]);
            $postActionVars = [
                'returnUrl' => $returnUrl,
                'viewParameters' => ['page' => $page],
                'contentTemplate' => 'MauticEmailBundle:Email:index',
                'passthroughVars' => [
                    'activeLink' => 'mautic_email_index',
                    'mauticContent' => 'email',
                ],
            ];

            $formView = 'MauticEmailBundle:Email:form.html.php';
            $formTheme = 'MauticEmailBundle:FormTheme\Email';
        }

        $checkEntity = $this->checkEntity($objectType, $objectId, $model, $entity, $postActionVars);
        if ($checkEntity !== true) {
            return $checkEntity;
        }

        $action = $this->generateUrl('mautic_grapesbuilder_index', ['objectType' => $objectType, 'objectId' => $objectId]);
        $form = $model->createForm($entity, $this->get('form.factory'), $action);

        if (!$ignorePost && $this->request->getMethod() == 'POST') {
            $valid = false;
            if (!$cancelled = $this->isFormCancelled($form)) {
                if ($valid = $this->isFormValid($form)) {
                    $content = $entity->getCustomHtml();
                    $entity->setCustomHtml($content);
                    $entity->setTemplate('mautic_code_mode'); // @todo be aware of mjml in future
                    $model->saveEntity($entity, $form->get('buttons')->get('save')->isClicked());

                    //print_R($form->get('buttons')->get('save')->isClicked());
                    //die();
                    $this->entitySpecificNotice($objectType, $entity);
                }
            } else {
                $model->unlockEntity($entity);
            }

            if ($cancelled || ($valid && $form->get('buttons')->get('save')->isClicked())) {
                return $this->postActionRedirect($postActionVars);
            }
        } else {
            $model->lockEntity($entity);
            $template = $entity->getTemplate();
            if (empty($template)) {
                $content = $entity->getCustomHtml();
                $form['customHtml']->setData($content);
            }
        }

        return $this->delegateView(array(
            'viewParameters' => array(
                'objectType' => $objectType,
                'objectId' => $objectId,
                'entity' => $entity,
                'form' => $this->setFormTheme($form, $formView, $formTheme),
            ),
            'contentTemplate' => 'MauticGrapesbuilderBundle:Builder:index.html.php',
            'passthroughVars' => array(
                'activeLink' => 'mautic_grapesbuilder_index',
                'route' => $this->generateUrl('mautic_grapesbuilder_index', array('objectType' => $objectType, 'objectId' => $objectId)),
                'mauticContent' => $objectType == 'email' ? 'openGrapesEmail' : 'openGrapesPage',
            ),
        ));
    }

    public function entitySpecificNotice($objectType, $entity)
    {
        if ($objectType == 'page') {
            $this->addFlash('mautic.core.notice.updated', [
                '%name%' => $entity->getTitle(),
                '%menu_link%' => 'mautic_page_index',
                '%url%' => $this->generateUrl('mautic_page_action', [
                    'objectAction' => 'edit',
                    'objectId' => $entity->getId(),
                ]),
            ]);
        } else {
            $this->addFlash(
                'mautic.core.notice.updated',
                [
                    '%name%' => $entity->getName(),
                    '%menu_link%' => 'mautic_email_index',
                    '%url%' => $this->generateUrl(
                        'mautic_email_action',
                        [
                            'objectAction' => 'edit',
                            'objectId' => $entity->getId(),
                        ]
                    ),
                ],
                'warning'
            );
        }
    }

    public function internalAction($objectType, $objectId)
    {
        $model = $this->getModel($objectType);
        $entity = $model->getEntity($objectId);

        $mauticContent = 'openGrapesPagebuilder';
        if ($objectType == 'email') {
            if ($this->checkIfEmailIsMjml($entity)) {
                $mauticContent = 'openGrapesEmailMjmlbuilder';
            } else {
                $mauticContent = 'openGrapesEmailHtmlbuilder';
            }
        }

        return $this->delegateView(
            array(
                'viewParameters' => array(
                    'entity' => $entity,
                ),
                'contentTemplate' => 'MauticGrapesbuilderBundle:Builder:internal.html.php',
                'passthroughVars' => array(
                    'activeLink' => 'mautic_grapesbuilder_internal',
                    'route' => $this->generateUrl('mautic_grapesbuilder_internal', array('objectType' => $objectType, 'objectId' => $objectId)),
                    'mauticContent' => $mauticContent,
                ),
            )
        );
    }

    private function checkEntity($objectType, $objectId, $model, $entity, $postActionVars)
    {
        // not found
        if ($entity === null) {
            return $this->postActionRedirect(
                array_merge($postActionVars, [
                    'flashes' => [
                        [
                            'type' => 'error',
                            'msg' => 'mautic.' . $objectType . '.error.notfound',
                            'msgVars' => ['%id%' => $objectId],
                        ],
                    ],
                ])
            );
        } elseif (!$this->get('mautic.security')->hasEntityAccess(
            $objectType . ':' . $objectType . 's:viewown', $objectType . ':' . $objectType . 's:viewother', $entity->getCreatedBy()
        ) ||
            ($objectType == 'page' && $entity->getIsPreferenceCenter() && !$this->get('mautic.security')->hasEntityAccess(
                'page:preference_center:viewown', 'page:preference_center:viewother', $entity->getCreatedBy()
            ))) {
            return $this->accessDenied();
        } elseif ($model->isLocked($entity)) {
            // deny access if the entity is locked
            return $this->isLocked($postActionVars, $entity, $objectType == 'page' ? 'page.page' : 'email');
        }
        return true;
    }

    private function isMjmlBundleActive()
    {
        $kernel = $this->container->get('kernel');
        $bundles = $kernel->getPluginBundles();
        return array_key_exists(
            'MauticMjmlBundle',
            $bundles
        );
    }

    private function checkIfEmailIsMjml($entity)
    {
        // @todo
        return false;
    }
}

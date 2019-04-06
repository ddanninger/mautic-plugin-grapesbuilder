<?php
namespace MauticPlugin\MauticGrapesbuilderBundle\EventListener;

use Mautic\CoreBundle\CoreEvents;
use Mautic\CoreBundle\EventListener\CommonSubscriber;
use Mautic\CoreBundle\Event\CustomButtonEvent;
use Mautic\CoreBundle\Templating\Helper\ButtonHelper;
use Mautic\LeadBundle\Entity\Lead;
use Mautic\PageBundle\Entity\Page;
use Mautic\PluginBundle\Helper\IntegrationHelper;

class ButtonSubscriber extends CommonSubscriber
{
    protected $integrationHelper;

    /**
     * ButtonSubscriber constructor.
     *
     * @param IntegrationHelper $helper
     */
    public function __construct(IntegrationHelper $integrationHelper)
    {
        $this->integrationHelper = $integrationHelper;
    }

    public static function getSubscribedEvents()
    {
        return [
            CoreEvents::VIEW_INJECT_CUSTOM_BUTTONS => ['injectViewButtons', 0],
        ];
    }

    /**
     * @param CustomButtonEvent $event
     */
    public function injectViewButtons(CustomButtonEvent $event)
    {
        if ($event->checkRouteContext('mautic_grapesbuilder_index')) {
            $event->addButton(
                [
                    'attr' => [
                        'class' => 'btn btn-default btn-save btn-copy',
                        'id' => 'btn-grapesbuilder-save',
                    ],
                    'btnText' => $this->translator->trans('mautic.plugin.grapesbuilder.save'),
                    'iconClass' => 'fa fa-save',
                    'priority' => 255,
                ],
                ButtonHelper::LOCATION_TOOLBAR_ACTIONS
            );
            return;
        }
        
        if ($item = $event->getItem()) {
            $this->logger->info($event->getItem());
            if ($item instanceof Page) {
                $this->logger->info("Instance is page");
                $addBtn = [
                    'attr' => [
                        'href' => $this->router->generate(
                            'mautic_grapesbuilder_index',
                            ['objectId' => $event->getItem()->getId()]
                        ),
                    ],
                    'btnText' => $this->translator->trans('mautic.plugin.grapesbuilder.open'),
                    'iconClass' => 'fa fa-star',
                    'primary' => true,
                    'priority' => 1,
                ];

                // Inject a button into the page actions for the specified route
                $event
                    ->addButton(
                        $addBtn,
                        ButtonHelper::LOCATION_LIST_ACTIONS
                    );
            }
        }
    }
}

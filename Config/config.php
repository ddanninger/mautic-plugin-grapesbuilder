<?php return ['name' => 'Grapesbuilder Bundle',
    'description' => 'Grapesjs Library integration (https://grapesjs.com/)',
    'version' => '0.1.2',
    'url' => 'https://grapesjs.com/',
    'author' => 'Dominik Danninger',

    'routes' => [
        'main' => [
            'mautic_grapesbuilder_index' => [
                'method' => 'GET',
                'path' => '/grapesbuilder/{objectType}/{callView}/{objectId}',
                'controller' => 'MauticGrapesbuilderBundle:Grapesbuilder:index',
                'requirements' => array(
                    'objectType' => 'page|email',
                    'callView' => 'normal|mjml|html',
                ),
            ],
            'mautic_grapesbuilder_internal' => [
                'method' => 'GET',
                'path' => '/grapesbuilder_internal/{objectType}/{callView}/{objectId}',
                'controller' => 'MauticGrapesbuilderBundle:Grapesbuilder:internal',
                'requirements' => array(
                    'objectType' => 'page|email',
                    'callView' => 'normal|mjml|html',
                ),
            ],
        ],
    ],
    'services' => [
        'events' => [
            'mautic.plugin.grapejs.button.subscriber' => [
                'class' => \MauticPlugin\MauticGrapesbuilderBundle\EventListener\ButtonSubscriber::class,
                'arguments' => [
                    'mautic.helper.integration',
                ],
            ],
        ],
    ],
];

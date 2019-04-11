<?php return ['name' => 'Grapesbuilder',
    'description' => 'Grapesjs Library integration (https://grapesjs.com/)',
    'version' => '0.1.4',
    'url' => 'https://grapesjs.com/',
    'author' => 'Dominik Danninger',

    'routes' => [
        'main' => [
            'mautic_grapesbuilder_index' => [
                'path' => '/grapesbuilder/view/{objectType}/{objectId}',
                'controller' => 'MauticGrapesbuilderBundle:Grapesbuilder:index',
                'requirements' => array(
                    'objectType' => 'page|email'
                ),
            ],
            'mautic_grapesbuilder_internal' => [
                'method' => 'GET',
                'path' => '/grapesbuilder_internal/{objectType}/{objectId}',
                'controller' => 'MauticGrapesbuilderBundle:Grapesbuilder:internal',
                'requirements' => array(
                    'objectType' => 'page|email'
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

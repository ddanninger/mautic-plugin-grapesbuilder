<?php return ['name' => 'Grapesbuilder Bundle',
    'description' => 'Grapesjs Library integration (https://grapesjs.com/)',
    'version' => '0.1.1',
    'url' => 'https://grapesjs.com/',
    'author' => 'Dominik Danninger',

    'routes' => [
        'main' => [
            'mautic_grapesbuilder_index' => [
                'method' => 'GET',
                'path' => '/grapesbuilder/{objectId}',
                'controller' => 'MauticGrapesbuilderBundle:Grapesbuilder:index'
            ],
            'mautic_grapesbuilder_internal' => [
                'method' => 'GET',
                'path' => '/grapesbuilder_internal/{objectId}',
                'controller' => 'MauticGrapesbuilderBundle:Grapesbuilder:internal'
            ]
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

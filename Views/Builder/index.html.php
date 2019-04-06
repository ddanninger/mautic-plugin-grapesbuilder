<?php
// Extend the base content
$view->extend('MauticCoreBundle:Default:content.html.php');
?>

<?php echo $view['assets']->includeStylesheet('plugins/MauticGrapesbuilderBundle/Assets/dist/css/builder.css'); ?>
<?php echo $view['assets']->includeScript('plugins/MauticGrapesbuilderBundle/Assets/dist/js/mauticgrapesbuilderbundle.min.js'); ?>


<div class="panel panel-default bdr-t-wdh-0 mb-0 grapesbuilder-panel">
<?php echo $view->render(
    'MauticCoreBundle:Helper:list_toolbar.html.php',
    [
        'action' => $currentRoute,
    ]
); ?>
    <div class="page-list">
        <iframe src="<?php echo $view['router']->url('mautic_grapesbuilder_internal', ['objectType' => $objectType, 'callView' => $callView, 'objectId' => $objectId]); ?>"
        class="grapesbuilder-iframe">
        </iframe>
    </div>
</div>
<?php
// Extend the base content
$view->extend('MauticCoreBundle:Default:content.html.php');
?>

<?php echo $view['assets']->includeStylesheet('plugins/MauticGrapesbuilderBundle/Assets/dist/css/builder.css'); ?>
<?php $view['assets']->addScript('plugins/MauticGrapesbuilderBundle/Assets/dist/js/mauticgrapesbuilderbundle.min.js'); ?>

<?php 
$variantParent = $entity->getVariantParent();
$subheader     = '';
if ($variantParent) {
    $subheader = '<div><span class="small">'.$view['translator']->trans('mautic.core.variant_of', [
                    '%name%'   => $entity->getTitle(),
                    '%parent%' => $variantParent->getTitle(),
                ]).'</span></div>';
} elseif ($entity->isVariant(false)) {
    $subheader = '<div><span class="small">'.$view['translator']->trans('mautic.page.form.has_variants').'</span></div>';
}

$header = $view['translator']->trans('mautic.page.header.edit',
    ['%name%' => $entity->getTitle()]);

$view['slots']->set('headerTitle', $header.$subheader); 
?>

<!-- hidden form  -->
<div style="display: none;">
<?php echo $view['form']->form($form); ?>
</div>

<div class="panel panel-default bdr-t-wdh-0 mb-0 grapesbuilder-panel">
    <div class="page-list">
        <iframe style="width: 100%; height: 100%; border: none;" id="grapesbuilder-iframe" src="<?php echo $view['router']->url('mautic_grapesbuilder_internal', ['objectType' => $objectType, 'objectId' => $objectId]); ?>"
        class="grapesbuilder-iframe">
        </iframe>
    </div>
</div>
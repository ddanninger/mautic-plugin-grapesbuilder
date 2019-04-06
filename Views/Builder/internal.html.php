<?php echo $view->render('MauticCoreBundle:Default:head.html.php'); ?>

<?php echo $view['assets']->includeStylesheet('plugins/MauticGrapesbuilderBundle/Assets/dist/css/grapes.css'); ?>
<?php echo $view['assets']->includeScript('plugins/MauticGrapesbuilderBundle/Assets/dist/js/mauticgrapesbuilderbundle.min.js'); ?>

<div id="gjs" style="height:100%; width: 100%; overflow: hidden; display:hidden;">
    <?php echo $entity->getCustomHtml(); ?>
</div>
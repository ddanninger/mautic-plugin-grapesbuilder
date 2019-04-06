const grapesjs = require('grapesjs');
const juice = require('juice');

Mautic.openGrapesPrerendererOnLoad = (container, response) => {
  console.log('Mautic.openGrapesPrerenderer', container, response);
};

Mautic.openGrapesbuilderOnLoad = (container, response) => {
  console.log('Mautic.openGrapesbuilderOnLoad', container, response);
  $('#gjs').show();

  grapesjs.plugins.add('gjs-preset-webpage', require('grapesjs-preset-webpage').default);
  grapesjs.plugins.add('grapesjs-lory-slider', require('grapesjs-lory-slider').default);
  grapesjs.plugins.add('grapesjs-tabs', require('grapesjs-tabs').default);
  grapesjs.plugins.add('grapesjs-custom-code', require('grapesjs-custom-code').default);
  grapesjs.plugins.add('grapesjs-touch', require('grapesjs-touch').default);
  grapesjs.plugins.add('grapesjs-parser-postcss', require('grapesjs-parser-postcss').default);
  grapesjs.plugins.add('grapesjs-tooltip', require('grapesjs-tooltip').default);
  grapesjs.plugins.add('grapesjs-tui-image-editor', require('grapesjs-tui-image-editor').default);

  const editor = grapesjs.init({
    height: '100%',
    showOffsets: 1,
    noticeOnUnload: 0,
    storageManager: { autoload: 0 },
    container: '#gjs',
    fromElement: true,
    plugins: [
      'gjs-preset-webpage',
      'grapesjs-lory-slider',
      'grapesjs-tabs',
      'grapesjs-custom-code',
      'grapesjs-touch',
      'grapesjs-parser-postcss',
      'grapesjs-tooltip',
      'grapesjs-tui-image-editor'
    ],
    pluginsOpts: {
      'grapesjs-lory-slider': {
        sliderBlock: {
          category: 'Extra'
        }
      },
      'grapesjs-tabs': {
        tabsBlock: {
          category: 'Extra'
        }
      },
      'gjs-preset-webpage': {
        modalImportTitle: 'Import Template',
        modalImportLabel:
          '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
        modalImportContent: function(editor) {
          return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
        },
        filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
        aviaryOpts: false,
        blocksBasicOpts: { flexGrid: 1 },
        customStyleManager: [
          {
            name: 'General',
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
            properties: [
              {
                name: 'Alignment',
                property: 'float',
                type: 'radio',
                defaults: 'none',
                list: [
                  { value: 'none', className: 'fa fa-times' },
                  { value: 'left', className: 'fa fa-align-left' },
                  { value: 'right', className: 'fa fa-align-right' }
                ]
              },
              { property: 'position', type: 'select' }
            ]
          },
          {
            name: 'Dimension',
            open: false,
            buildProps: [
              'width',
              'flex-width',
              'height',
              'max-width',
              'min-height',
              'margin',
              'padding'
            ],
            properties: [
              {
                id: 'flex-width',
                type: 'integer',
                name: 'Width',
                units: ['px', '%'],
                property: 'flex-basis',
                toRequire: 1
              },
              {
                property: 'margin',
                properties: [
                  { name: 'Top', property: 'margin-top' },
                  { name: 'Right', property: 'margin-right' },
                  { name: 'Bottom', property: 'margin-bottom' },
                  { name: 'Left', property: 'margin-left' }
                ]
              },
              {
                property: 'padding',
                properties: [
                  { name: 'Top', property: 'padding-top' },
                  { name: 'Right', property: 'padding-right' },
                  { name: 'Bottom', property: 'padding-bottom' },
                  { name: 'Left', property: 'padding-left' }
                ]
              }
            ]
          },
          {
            name: 'Typography',
            open: false,
            buildProps: [
              'font-family',
              'font-size',
              'font-weight',
              'letter-spacing',
              'color',
              'line-height',
              'text-align',
              'text-decoration',
              'text-shadow'
            ],
            properties: [
              { name: 'Font', property: 'font-family' },
              { name: 'Weight', property: 'font-weight' },
              { name: 'Font color', property: 'color' },
              {
                property: 'text-align',
                type: 'radio',
                defaults: 'left',
                list: [
                  { value: 'left', name: 'Left', className: 'fa fa-align-left' },
                  { value: 'center', name: 'Center', className: 'fa fa-align-center' },
                  { value: 'right', name: 'Right', className: 'fa fa-align-right' },
                  { value: 'justify', name: 'Justify', className: 'fa fa-align-justify' }
                ]
              },
              {
                property: 'text-decoration',
                type: 'radio',
                defaults: 'none',
                list: [
                  { value: 'none', name: 'None', className: 'fa fa-times' },
                  { value: 'underline', name: 'underline', className: 'fa fa-underline' },
                  { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough' }
                ]
              },
              {
                property: 'text-shadow',
                properties: [
                  { name: 'X position', property: 'text-shadow-h' },
                  { name: 'Y position', property: 'text-shadow-v' },
                  { name: 'Blur', property: 'text-shadow-blur' },
                  { name: 'Color', property: 'text-shadow-color' }
                ]
              }
            ]
          },
          {
            name: 'Decorations',
            open: false,
            buildProps: [
              'opacity',
              'background-color',
              'border-radius',
              'border',
              'box-shadow',
              'background'
            ],
            properties: [
              {
                type: 'slider',
                property: 'opacity',
                defaults: 1,
                step: 0.01,
                max: 1,
                min: 0
              },
              {
                property: 'border-radius',
                properties: [
                  { name: 'Top', property: 'border-top-left-radius' },
                  { name: 'Right', property: 'border-top-right-radius' },
                  { name: 'Bottom', property: 'border-bottom-left-radius' },
                  { name: 'Left', property: 'border-bottom-right-radius' }
                ]
              },
              {
                property: 'box-shadow',
                properties: [
                  { name: 'X position', property: 'box-shadow-h' },
                  { name: 'Y position', property: 'box-shadow-v' },
                  { name: 'Blur', property: 'box-shadow-blur' },
                  { name: 'Spread', property: 'box-shadow-spread' },
                  { name: 'Color', property: 'box-shadow-color' },
                  { name: 'Shadow type', property: 'box-shadow-type' }
                ]
              },
              {
                property: 'background',
                properties: [
                  { name: 'Image', property: 'background-image' },
                  { name: 'Repeat', property: 'background-repeat' },
                  { name: 'Position', property: 'background-position' },
                  { name: 'Attachment', property: 'background-attachment' },
                  { name: 'Size', property: 'background-size' }
                ]
              }
            ]
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform'],
            properties: [
              {
                property: 'transition',
                properties: [
                  { name: 'Property', property: 'transition-property' },
                  { name: 'Duration', property: 'transition-duration' },
                  { name: 'Easing', property: 'transition-timing-function' }
                ]
              },
              {
                property: 'transform',
                properties: [
                  { name: 'Rotate X', property: 'transform-rotate-x' },
                  { name: 'Rotate Y', property: 'transform-rotate-y' },
                  { name: 'Rotate Z', property: 'transform-rotate-z' },
                  { name: 'Scale X', property: 'transform-scale-x' },
                  { name: 'Scale Y', property: 'transform-scale-y' },
                  { name: 'Scale Z', property: 'transform-scale-z' }
                ]
              }
            ]
          },
          {
            name: 'Flex',
            open: false,
            properties: [
              {
                name: 'Flex Container',
                property: 'display',
                type: 'select',
                defaults: 'block',
                list: [{ value: 'block', name: 'Disable' }, { value: 'flex', name: 'Enable' }]
              },
              {
                name: 'Flex Parent',
                property: 'label-parent-flex',
                type: 'integer'
              },
              {
                name: 'Direction',
                property: 'flex-direction',
                type: 'radio',
                defaults: 'row',
                list: [
                  {
                    value: 'row',
                    name: 'Row',
                    className: 'icons-flex icon-dir-row',
                    title: 'Row'
                  },
                  {
                    value: 'row-reverse',
                    name: 'Row reverse',
                    className: 'icons-flex icon-dir-row-rev',
                    title: 'Row reverse'
                  },
                  {
                    value: 'column',
                    name: 'Column',
                    title: 'Column',
                    className: 'icons-flex icon-dir-col'
                  },
                  {
                    value: 'column-reverse',
                    name: 'Column reverse',
                    title: 'Column reverse',
                    className: 'icons-flex icon-dir-col-rev'
                  }
                ]
              },
              {
                name: 'Justify',
                property: 'justify-content',
                type: 'radio',
                defaults: 'flex-start',
                list: [
                  {
                    value: 'flex-start',
                    className: 'icons-flex icon-just-start',
                    title: 'Start'
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-just-end'
                  },
                  {
                    value: 'space-between',
                    title: 'Space between',
                    className: 'icons-flex icon-just-sp-bet'
                  },
                  {
                    value: 'space-around',
                    title: 'Space around',
                    className: 'icons-flex icon-just-sp-ar'
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-just-sp-cent'
                  }
                ]
              },
              {
                name: 'Align',
                property: 'align-items',
                type: 'radio',
                defaults: 'center',
                list: [
                  {
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start'
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end'
                  },
                  {
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str'
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center'
                  }
                ]
              },
              {
                name: 'Flex Children',
                property: 'label-parent-flex',
                type: 'integer'
              },
              {
                name: 'Order',
                property: 'order',
                type: 'integer',
                defaults: 0,
                min: 0
              },
              {
                name: 'Flex',
                property: 'flex',
                type: 'composite',
                properties: [
                  {
                    name: 'Grow',
                    property: 'flex-grow',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                  },
                  {
                    name: 'Shrink',
                    property: 'flex-shrink',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                  },
                  {
                    name: 'Basis',
                    property: 'flex-basis',
                    type: 'integer',
                    units: ['px', '%', ''],
                    unit: '',
                    defaults: 'auto'
                  }
                ]
              },
              {
                name: 'Align',
                property: 'align-self',
                type: 'radio',
                defaults: 'auto',
                list: [
                  {
                    value: 'auto',
                    name: 'Auto'
                  },
                  {
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start'
                  },
                  {
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end'
                  },
                  {
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str'
                  },
                  {
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  });

  // if not newsletetr preset
  const commands = editor.Commands;
  commands.add('gjs-get-inlined-html', {
    run(editor, sender, opts = {}) {
      const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
      return juice(tmpl, opts);
    }
  });
  console.log('EDITOR IS', editor);
};

Mautic.getGrapesContent = () => {
  if (grapesjs.editors && grapesjs.editors.length > 0) {
    const editor = grapesjs.editors[0];
    const html = editor.runCommand('gjs-get-inlined-html');
    console.log('getGrapesContent', html);
  }
};

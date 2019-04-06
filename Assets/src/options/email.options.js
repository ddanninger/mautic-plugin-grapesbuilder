export const emailMjmlOptions = {
  plugins: ['grapesjs-mjml', 'gjs-plugin-ckeditor'],
  pluginsOpts: {
    'grapesjs-mjml': {},
    'gjs-plugin-ckeditor': ckEditorPluginOpts
  }
};

export const emailHtmlOptions = {
  plugins: ['gjs-preset-newsletter', 'gjs-plugin-ckeditor'],
  pluginsOpts: {
    'gjs-preset-newsletter': {
      modalLabelImport: 'Paste all your code here below and click import',
      modalLabelExport: 'Copy the code and use it wherever you want',
      codeViewerTheme: 'material',
      //defaultTemplate: templateImport,
      importPlaceholder: '<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
      cellStyle: {
        'font-size': '12px',
        'font-weight': 300,
        'vertical-align': 'top',
        color: 'rgb(111, 119, 125)',
        margin: 0,
        padding: 0
      }
    },
    'gjs-plugin-ckeditor': ckEditorPluginOpts
  }
};

const ckEditorPluginOpts = {
  position: 'center',
  options: {
    startupFocus: true,
    extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
    allowedContent: true, // Disable auto-formatting, class removing, etc.
    enterMode: CKEDITOR.ENTER_BR,
    extraPlugins: 'sharedspace,justify,colorbutton,panelbutton,font',
    toolbar: [
      { name: 'styles', items: ['Font', 'FontSize'] },
      ['Bold', 'Italic', 'Underline', 'Strike'],
      { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
      { name: 'links', items: ['Link', 'Unlink'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] }
    ]
  }
};

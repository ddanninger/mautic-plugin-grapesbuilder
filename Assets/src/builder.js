const grapesjs = require('grapesjs');
const juice = require('juice');

const { emailMjmlOptions, emailHtmlOptions } = require('./options/email.options.js');
const { pageOptions } = require('./options/page.options.js');

class GrapesBuilder {
  defaultOpts = {
    height: '100%',
    showOffsets: 1,
    noticeOnUnload: 0,
    storageManager: { autoload: 0 },
    container: '#gjs',
    fromElement: true
  };

  editor = null;

  constructor() {}

  initEditor(opts = {}) {
    if (!this.editor) {
      this.editor = grapesjs.init({
        ...this.defaultOpts,
        ...opts
      });
      console.log('initEditor', this.editor);
      mQuery('#gjs').show();
    }
    return this.editor;
  }

  initEmailMjmlEditor() {
    this.addEmailMjmlPlugins();
    this.initEditor(emailMjmlOptions);
  }

  addEmailMjmlPlugins() {
    grapesjs.plugins.add('grapesjs-mjml', require('grapesjs-mjml').default);
    grapesjs.plugins.add('gjs-plugin-ckeditor', require('grapesjs-plugin-ckeditor').default);
  }

  initEmailHtmlEditor() {
    this.addEmailHtmlPlugins();
    this.initEditor(emailHtmlOptions);
  }

  addEmailHtmlPlugins() {
    grapesjs.plugins.add('gjs-preset-newsletter', require('grapesjs-preset-newsletter').default);
    grapesjs.plugins.add('gjs-plugin-ckeditor', require('grapesjs-plugin-ckeditor').default);
  }

  initPageEditor() {
    this.addPagePlugins();
    this.initEditor(pageOptions);

    this.addCommand('gjs-get-inlined-html', {
      run(editor, sender, opts = {}) {
        const tmpl = editor.getHtml() + `<style>${editor.getCss()}</style>`;
        return juice(tmpl, opts);
      }
    });
  }

  addPagePlugins() {
    grapesjs.plugins.add('gjs-preset-webpage', require('grapesjs-preset-webpage').default);
    grapesjs.plugins.add('grapesjs-lory-slider', require('grapesjs-lory-slider').default);
    grapesjs.plugins.add('grapesjs-tabs', require('grapesjs-tabs').default);
    grapesjs.plugins.add('grapesjs-custom-code', require('grapesjs-custom-code').default);
    grapesjs.plugins.add('grapesjs-touch', require('grapesjs-touch').default);
    grapesjs.plugins.add('grapesjs-parser-postcss', require('grapesjs-parser-postcss').default);
    grapesjs.plugins.add('grapesjs-tooltip', require('grapesjs-tooltip').default);
    grapesjs.plugins.add('grapesjs-tui-image-editor', require('grapesjs-tui-image-editor').default);
  }

  addCommand(name, opts = {}) {
    if (this.editor) {
      this.editor.Commands.add(name, opts);
    }
  }

  runCommand(name) {
    return this.editor.runCommand(name);
  }

  hasEditor() {
    return !!this.editor;
  }

  registerSaveBtn(formName) {
    mQuery(`#${formName}_buttons_save_toolbar`)
      .off('click')
      .on('click', e => {
        this.submitForm(formName, `#${formName}_buttons_save_toolbar`, 'save');
      });
    mQuery(`#${formName}_buttons_apply_toolbar`)
      .off('click')
      .on('click', e => {
        this.applyForm(formName, `#${formName}_buttons_apply_toolbar`, 'apply');
      });
  }

  updateCustomHtml(grapesBuilder) {
    const html = grapesBuilder.runCommand('gjs-get-inlined-html');
    const textarea = mQuery('textarea.builder-html');
    textarea.val(html);
  }

  applyForm(formName, btn, type) {
    // const bgApplyBtn = mQuery('#page_buttons_apply');
    if (document.getElementById('grapesbuilder-iframe')) {
      const grapesBuilder = document
        .getElementById('grapesbuilder-iframe')
        .contentWindow.Mautic.getGrapesBuilder();
      if (grapesBuilder && grapesBuilder.hasEditor()) {
        const form = mQuery('form[name=' + formName + ']');
        this.updateCustomHtml(grapesBuilder);
        this.ajaxForm(form, btn);
      }
    }
  }

  ajaxForm(form, btn) {
    Mautic.activateButtonLoadingIndicator(mQuery(btn));
    mQuery
      .ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize()
      })
      .done(function(data) {
        Mautic.removeButtonLoadingIndicator(mQuery(btn));
      })
      .fail(function(data) {
        Mautic.removeButtonLoadingIndicator(mQuery(btn));
      });
  }

  submitForm(formName, btn, type) {
    if (document.getElementById('grapesbuilder-iframe')) {
      const grapesBuilder = document
        .getElementById('grapesbuilder-iframe')
        .contentWindow.Mautic.getGrapesBuilder();
      if (grapesBuilder && grapesBuilder.hasEditor()) {
        const form = mQuery('form[name=' + formName + ']');
        this.updateCustomHtml(grapesBuilder);
        Mautic.activateButtonLoadingIndicator(mQuery(btn));
        this.submissionOn(form, type);
        form.submit();
        this.submissionOff();
      }
    }
  }

  submissionOn(form, type) {
    var inBuilder = mQuery(`<input type="hidden" name="page[buttons][${type}]" value="1" />`);
    form.append(inBuilder);
  }

  submissionOff() {
    mQuery('input[name="page[buttons][save]"]').remove();
  }
}

const grapesBuilder = new GrapesBuilder();

Mautic.openGrapesPageOnLoad = (container, response) => {
  grapesBuilder.registerSaveBtn('page');
  console.log('Mautic.openGrapesPageOnLoad', container, response);
};

Mautic.openGrapesEmailOnLoad = (container, response) => {
  grapesBuilder.registerSaveBtn('emailform');
  console.log('Mautic.openGrapesEmailOnLoad', container, response);
};

Mautic.openGrapesPagebuilderOnLoad = (container, response) => {
  grapesBuilder.initPageEditor();
  console.log('Mautic.openGrapesPagebuilderOnLoad', container, response);
};

Mautic.openGrapesEmailMjmlbuilderOnLoad = (container, response) => {
  grapesBuilder.initEmailMjmlEditor();
  console.log('Mautic.openGrapesEmailMjmlbuilderOnLoad', container, response);
};

Mautic.openGrapesEmailHtmlbuilderOnLoad = (container, response) => {
  grapesBuilder.initEmailHtmlEditor();
  console.log('Mautic.openGrapesEmailHtmlbuilderOnLoad', container, response);
};

Mautic.getGrapesContent = () => {
  if (grapesBuilder.hasEditor()) {
    const html = grapesBuilder.runCommand('gjs-get-inlined-html');
    console.log('getGrapesContent', html);
  }
};

Mautic.getGrapesBuilder = () => {
  return grapesBuilder;
};

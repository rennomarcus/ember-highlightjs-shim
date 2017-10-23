/* eslint-env node */
'use strict';
var fs = require('fs');

module.exports = {
  name: 'ember-highlightjs-shim',
  included(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    this._super.included.apply(this, arguments);

    this.importThemes(target);
    target.import('node_modules/highlightjs/highlight.pack.min.js');
    target.import('vendor/shims/highlight.js');
  },
  importThemes: function importThemes(app) {
    const addonENVConfig = app.project.config()['highlightThemes'] || [];
    addonENVConfig.forEach((theme) => {
      let file =`node_modules/highlightjs/styles/${theme}.css`
      if (fs.existsSync(file)) {
        app.import(file);
      }
    });
  }
};

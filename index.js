/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var stew = require('broccoli-stew');

const map = stew.map;

module.exports = {
  name: 'ember-highlightjs-shim',

  included(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included.apply(this, arguments);

    this.importOption(target);
    this.importCss(target);
    this.importJs(target);

    this._enabledExtensions = [];

    if (shouldImportShowdownShim(app, parentAddon)) {
      this._enabledExtensions.push('showdown');
    }
  },

  importOption(target) {
    const addonENVConfig = target.project.config().highlightTheme || 'atom-one-dark';
    this.theme = addonENVConfig;
  },

  importCss(target) {
    let file = `vendor/highlightjs/${this.theme}.css`;
    target.import(file);
  },

  importJs(target) {
    target.import({
      development: 'vendor/highlightjs/highlight.pack.js',
      production: 'vendor/highlightjs/highlight.pack.min.js'
    });
    target.import('vendor/shims/highlight.js');
  },

  treeForApp(tree) {
    let thisDir = path.dirname(module.filename);
    let extensions = new Funnel(path.join(thisDir, 'vendor', 'initializers'), {
      include: this._enabledExtensions.map((name) => `${name}.js`),
      destDir: 'initializers'
    });

    return mergeTrees([extensions, tree], { overwrite: true });
  },

  treeForVendor(vendorTree) {
    let trees = [];
    if (vendorTree) {
      trees.push(vendorTree);
    }
    var hlCss = new Funnel(path.dirname(require.resolve('highlightjs')), {
      srcDir: 'styles',
      files: [this.theme + '.css'],
      destDir: 'highlightjs'
    });
    trees.push(hlCss);

    var hlJs = new Funnel(path.dirname(require.resolve('highlightjs')), {
      files: ['highlight.pack.js', 'highlight.pack.min.js'],
      destDir: 'highlightjs'
    });
    trees.push(hlJs);
    return map(mergeTrees(trees), (content) => content);
  },
};

function shouldImportShowdownShim(app, parentAddon) {
  var config = app.project.config(app.env).highlightJS || {};
  var isShowdownIncluded = [parentAddon, app]
    .some((target) => target &&
      Object.keys(target.dependencies()).includes('ember-cli-showdown'));

  return isShowdownIncluded && config.includeShowdown !== false ||
    config.includeShowdown === true;
}

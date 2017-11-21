/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var stew = require('broccoli-stew');
var fs = require('fs');

const map = stew.map;

module.exports = {
  name: 'ember-highlightjs-shim',
  included(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included.apply(this, arguments);

    this.importOption(target);
    this.importCss(target);
    this.importJs(target);
  },

  importOption(target) {
    const addonENVConfig = target.project.config().highlightTheme || 'atom-one-dark';
    this.theme = addonENVConfig;
  },

  importCss(target) {
    let file = `vendor/highlightjs/${this.theme}.css`;
    if (fs.existsSync(file)) {
      target.import(file);
    }
  },

  importJs(target) {
    target.import({
      development: 'vendor/highlightjs/highlight.pack.js',
      production: 'vendor/highlightjs/highlight.pack.min.js'
    });
    target.import('vendor/shims/highlight.js');
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

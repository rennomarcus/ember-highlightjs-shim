# ember-highlightjs-shim 

[![Build Status](https://travis-ci.org/rennomarcus/ember-highlightjs-shim.svg?branch=master)](https://travis-ci.org/rennomarcus/ember-highlightjs-shim)

Shim to use the terrific library [highlight.js](https://highlightjs.org/).

## Installation

* `npm install ember-highlightjs-shim --save-dev`

## Usage

Once installed, you can import the module `hljs` as an AMD module with:

`import hljs from 'highlight';`

Then use like the code below, for example:

```
didRender() {
  this._super(...arguments);
  hljs.initHighlighting.called = false;
  hljs.initHighlighting();
}
```

You can impor the themes in your config/environment. Example of how to import a theme in your `ENV` object:

```
let ENV = {
  highlightThemes: [
    'atom-one-dark'
  ]
}
```

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

# ember-highlightjs-shim 

[![Build Status](https://travis-ci.org/rennomarcus/ember-highlightjs-shim.svg?branch=master)](https://travis-ci.org/rennomarcus/ember-highlightjs-shim)

Shim to use the terrific library [highlight.js](https://highlightjs.org/) to highlight code.

## Installation

* `ember install ember-highlightjs-shim`

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

You can import a theme in your config/environment. Example of how to import a theme in your `ENV` object:

```
let ENV = {
  highlightTheme: 'atom-one-dark'
}
```

The default theme is 'atom-one-dark'. You can find the list of themes [here](https://highlightjs.org/static/demo/)
## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

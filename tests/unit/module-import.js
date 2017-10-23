import { test, module } from 'ember-qunit';
import hljs from 'highlight';

module('Shim for highlightjs', function() {
  test('the import works', function(assert) {
    assert.ok(hljs);
  });
});

import Component from '@ember/component';
import layout from '../templates/components/code-area';
import { computed } from '@ember/object';
import hljs from 'highlight';

export default Component.extend({
  layout,
  tagName: 'pre',
  langClass: computed('lang', function() { return this.get('lang'); }),
  didRender(){
    this._super(...arguments);
    hljs.initHighlighting();
  }
});

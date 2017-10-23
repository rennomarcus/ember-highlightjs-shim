import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('code-area', 'Integration | Component | code area', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#code-area lang="c"}}
      using namespace llvm;

      //return the type of the variable for allocation and arguments of functions
      Type* typeOf(int type) {
        if (type == T_INTEGER) {
            return Type::getInt32Ty(getGlobalContext());
        }
        if (type == T_FLOAT) {
            return Type::getFloatTy(getGlobalContext());
        }
        return Type::getVoidTy(getGlobalContext());
      }
    {{/code-area}}
  `);
  let childrenClass = this.$('pre').children('code')[0].className;
  assert.ok((childrenClass.indexOf('hljs') > -1), 'initHighlighting worked');
});

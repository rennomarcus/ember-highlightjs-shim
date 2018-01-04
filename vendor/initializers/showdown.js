import showdown from 'showdown';
import hljs from 'highlight';

let matchAny = `(?:.|\\s)*?`;
let query = new RegExp(`((?:<pre${matchAny}>\\s*)?<code${matchAny}(?:\\s+class\\s*=\\s*(["'])(?:.*?\\s+)?(?:language-(.*?))?(?:\\2|\\s)${matchAny})?>)((?:.|\\s)*?)(<\\/code>(?:<\\/pre>)?)`, 'gi');

// todo: consider contrib'ing to ember-highlightjs-shim: https://github.com/rennomarcus/ember-highlightjs-shim/blob/master/index.js
// alternately, showdown-highlight

export function initialize() {
  showdown.extension('highlight', function () {
    return [{
      type: 'output',
      filter(html) {
        return html.replace(query, function(
          match,
          left,
          _quotationMark,
          languageName,
          source,
          right
        ) {
          if (source) {
            let { value } = languageName ?
              hljs.highlight(languageName, source) :
              hljs.highlightAuto(source);

            return `${left}${value}${right}`;
          } else {
            return match;
          }
        });
      }
    }];
  });
}

export default {
  name: 'highlightjs-showdown-extension',
  initialize
};

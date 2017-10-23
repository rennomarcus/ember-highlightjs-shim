(function() {
  /* globals define, self */
  function vendorModule() {
    'use strict';

    return {
      'default': self['hljs'],
      __esModule: true,
    };
  }
  // export an object with a default property that contains the 'hljs' global.
  define('highlight', [], vendorModule);
})();

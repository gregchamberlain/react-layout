'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-layout-core.min.js');
} else {
  module.exports = require('./cjs/react-layout-core.development.js');
}

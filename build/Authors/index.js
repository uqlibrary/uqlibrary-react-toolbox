'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Authors = require('./containers/Authors');

Object.defineProperty(exports, 'Authors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Authors).default;
  }
});

var _reducer = require('./reducer');

Object.defineProperty(exports, 'authorsReducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reducer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;
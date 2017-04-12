'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Authors = require('./Authors');

var _Authors2 = _interopRequireDefault(_Authors);

var _reactRedux = require('react-redux');

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./Authors');

var mockStore = (0, _reduxMockStore2.default)([]);
var store = mockStore({});

function setup() {
    return (0, _enzyme.shallow)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_Authors2.default, { form: 'aTestForm' })
    ));
}

describe('Authors snapshots tests', function () {
    it('renders authors field', function () {
        var wrapper = setup();
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(mockStore, 'mockStore', 'src/Authors/containers/Authors.snapshot.test.js');

    __REACT_HOT_LOADER__.register(store, 'store', 'src/Authors/containers/Authors.snapshot.test.js');

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/Authors/containers/Authors.snapshot.test.js');
}();

;
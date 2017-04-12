'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AuthorRow = require('../components/AuthorRow');

var _AuthorRow2 = _interopRequireDefault(_AuthorRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../components/AuthorRow');

function setup() {
    return (0, _enzyme.shallow)(_react2.default.createElement(_AuthorRow2.default, { authorID: 1, name: 'Test Author', removeAuthor: jest.fn() }));
}

describe('AuthorRow snapshots test', function () {
    it('renders an Author Row', function () {
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

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/Authors/containers/AuthorRow.snapshot.test.js');
}();

;
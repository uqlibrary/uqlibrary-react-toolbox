'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AuthorRow = require('../components/AuthorRow');

var _AuthorRow2 = _interopRequireDefault(_AuthorRow);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../components/AuthorRow');

function setup(onButtonClick) {
    return (0, _enzyme.shallow)(_react2.default.createElement(_AuthorRow2.default, { authorID: 1, name: 'Test Author', removeAuthor: onButtonClick }));
}

describe('AuthorRow snapshots test', function () {
    it('renders multiple Author Rows', function () {
        var onButtonClick = _sinon2.default.spy();
        var wrapper = setup(onButtonClick);

        wrapper.find('RaisedButton').simulate('click');
        expect(onButtonClick.calledOnce).toEqual(true);
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/Authors/containers/AuthorRow.test.js');
}();

;
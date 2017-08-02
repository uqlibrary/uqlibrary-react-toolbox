'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PartialDateForm = require('./PartialDateForm');

var _PartialDateForm2 = _interopRequireDefault(_PartialDateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./PartialDateForm');

function setup(props) {
    return (0, _enzyme.shallow)(_react2.default.createElement(_PartialDateForm2.default, props));
}

describe('PartialDateForm snapshots tests', function () {
    it('renders PartialDateForm component', function () {
        var props = {
            name: 'partialDate',
            allowPartial: true,
            onChange: function onChange() {}
        };

        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders PartialDateForm component 2', function () {
        var props = {
            name: 'partialDate',
            allowPartial: true,
            className: 'requiredField',
            onChange: function onChange() {}
        };

        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders PartialDateForm component 3', function () {
        var props = {
            name: 'partialDate',
            allowPartial: false,
            className: 'requiredField',
            onChange: function onChange() {}
        };

        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
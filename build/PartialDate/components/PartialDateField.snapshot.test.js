'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PartialDateField = require('./PartialDateField');

var _PartialDateField2 = _interopRequireDefault(_PartialDateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./PartialDateField');

function setup(props) {
    return (0, _enzyme.shallow)(_react2.default.createElement(_PartialDateField2.default, props));
}

describe('Redux-form Field PartialDateField snapshots tests', function () {
    it('renders PartialDateField component', function () {
        var props = {
            name: 'partialDate',
            allowPartial: true,
            input: {
                onChange: function onChange() {}
            }
        };

        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders PartialDateField component with requiredField class on year field', function () {
        var props = {
            name: 'partialDate',
            allowPartial: true,
            className: 'requiredField',
            input: {
                onChange: function onChange() {}
            }
        };

        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders PartialDateField component with requiredField class on all fields', function () {
        var props = {
            name: 'partialDate',
            allowPartial: false,
            className: 'requiredField',
            input: {
                onChange: function onChange() {}
            }
        };

        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
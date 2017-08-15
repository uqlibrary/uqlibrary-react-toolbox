'use strict';

var _enzyme = require('enzyme');

var _redux = require('redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FileUploader = require('./FileUploader');

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./FileUploader');

function setup(props) {
    return (0, _enzyme.mount)(_react2.default.createElement(_FileUploader.FileUploader, props), {
        context: {
            muiTheme: (0, _getMuiTheme2.default)(),
            store: (0, _redux.createStore)(_reducer2.default, _immutable2.default.Map({ fileUpload: _reducer2.default }))
        },
        childContextTypes: {
            muiTheme: _propTypes2.default.object.isRequired,
            store: _propTypes2.default.object
        }
    });
}

describe('FileUploader', function () {
    it('renders correctly without any setup', function () {
        var wrapper = setup({});

        var tree = (0, _enzymeToJson2.default)(wrapper);

        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files', function () {
        var wrapper = setup({});

        var tree = (0, _enzymeToJson2.default)(wrapper);

        expect(tree).toMatchSnapshot();

        var files = [{
            name: 'a.txt',
            size: 100
        }, {
            name: 'b.txt',
            size: 100
        }];

        wrapper.instance().setUploadedFiles(files);
        tree = (0, _enzymeToJson2.default)(wrapper);

        expect(tree).toMatchSnapshot();

        wrapper.instance().deleteFile({}, 0);
        tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance().deleteAllFiles();
        tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
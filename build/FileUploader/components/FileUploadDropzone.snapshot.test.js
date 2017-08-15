'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FileUploadDropzone = require('./FileUploadDropzone');

var _FileUploadDropzone2 = _interopRequireDefault(_FileUploadDropzone);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./FileUploadDropzone');

function setup(props) {
    return (0, _enzyme.mount)(_react2.default.createElement(_FileUploadDropzone2.default, props), {
        context: {
            muiTheme: (0, _getMuiTheme2.default)()
        },
        childContextTypes: {
            muiTheme: _propTypes2.default.object.isRequired
        }
    });
}

describe('FileUploadDropzone', function () {
    it('renders correctly without any setup', function () {
        var onDroppedCallback = jest.fn();
        var props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 3,
            uploadedFiles: [],
            clearErrors: false
        };
        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);

        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files', function () {
        var onDroppedCallback = jest.fn();
        var props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 3,
            uploadedFiles: [],
            clearErrors: false
        };
        var wrapper = setup(props);

        var tree = (0, _enzymeToJson2.default)(wrapper);

        expect(tree).toMatchSnapshot();

        var accepted = [{
            type: 'text/text',
            name: 'a.txt',
            size: 500
        }, {
            type: '',
            name: 'folder',
            size: 500
        }, {
            type: 'text/text',
            name: 'jalksjflkajsdlkfjasdlkfjalsdfjlkasdjflkajsdfkljasdlfjasljfsajlkdsjflkasdjflkjasdflkj.txt',
            size: 100
        }, {
            type: 'text/text',
            name: 'a.text.txt',
            size: 100
        }];

        var rejected = [{
            type: 'text/text',
            name: 'b.txt',
            size: 50000
        }];

        wrapper.instance().onDrop(accepted, rejected);
        tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();

        var moreFiles = [{
            type: 'text/text',
            name: 'b.txt',
            size: 100
        }, {
            type: 'text/text',
            name: 'c.txt',
            size: 100
        }, {
            type: 'text/text',
            name: 'd.txt',
            size: 100
        }];

        wrapper.instance().onDrop(moreFiles, []);
        tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
        expect(onDroppedCallback).toHaveBeenCalled();
    });
});
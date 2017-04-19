'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AppLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

require('./AppLoader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AppLoader(_ref) {
    var title = _ref.title,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText,
        progressColor = _ref.progressColor;

    return _react2.default.createElement(
        'div',
        { className: 'app-loader column layout-fill align-center justify-center' },
        _react2.default.createElement(
            'h1',
            { className: 'display-2' },
            title
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_CircularProgress2.default, { size: 80, thickness: 8, color: progressColor }),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText })
    );
}

AppLoader.propTypes = {
    title: _propTypes.PropTypes.string.isRequired,
    logoImage: _propTypes.PropTypes.string,
    logoText: _propTypes.PropTypes.string,
    progressColor: _propTypes.PropTypes.string
};

AppLoader.defaultProps = {
    progressColor: '#FFF'
};
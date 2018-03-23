'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AppLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement('br', null);

var _ref3 = _react2.default.createElement('br', null);

var _ref4 = _react2.default.createElement('br', null);

var _ref5 = _react2.default.createElement('br', null);

function AppLoader(_ref) {
    var title = _ref.title,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText,
        progressColor = _ref.progressColor;

    return _react2.default.createElement(
        'div',
        { className: 'app-loader columns is-gapless layout-fill' },
        _react2.default.createElement(
            'div',
            { className: 'app-loader-content column is-centered' },
            _react2.default.createElement(
                'h1',
                { className: 'title is-2 color-reverse' },
                title
            ),
            _ref2,
            _ref3,
            _react2.default.createElement(_CircularProgress2.default, { size: 80, thickness: 8, color: progressColor }),
            _ref4,
            _ref5,
            logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText })
        )
    );
}

AppLoader.defaultProps = {
    progressColor: '#FFF'
};
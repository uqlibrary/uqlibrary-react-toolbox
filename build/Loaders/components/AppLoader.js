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

function AppLoader(_ref) {
    var title = _ref.title,
        logoImage = _ref.logoImage,
        logoText = _ref.logoText,
        progressColor = _ref.progressColor;

    return _react2.default.createElement(
        'div',
        { className: 'app-loader columns is-gapless is-fullheight is-fullwidth' },
        _react2.default.createElement(
            'div',
            { className: 'app-loader-content column is-centered' },
            _react2.default.createElement(
                'h1',
                { className: 'display-2 color-reverse' },
                title
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_CircularProgress2.default, { size: 80, thickness: 8, color: progressColor }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            logoImage && _react2.default.createElement('img', { src: logoImage, alt: logoText })
        )
    );
}

AppLoader.propTypes = {
    title: _propTypes2.default.string.isRequired,
    logoImage: _propTypes2.default.string,
    logoText: _propTypes2.default.string,
    progressColor: _propTypes2.default.string
};

AppLoader.defaultProps = {
    progressColor: '#FFF'
};
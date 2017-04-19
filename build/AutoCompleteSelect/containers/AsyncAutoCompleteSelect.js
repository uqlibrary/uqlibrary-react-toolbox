'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = AsyncAutoCompleteSelectWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AsyncAutoCompleteSelect = require('../components/AsyncAutoCompleteSelect');

var _AsyncAutoCompleteSelect2 = _interopRequireDefault(_AsyncAutoCompleteSelect);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AsyncAutoCompleteSelectWrapper(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _AsyncAutoCompleteSelect2.default.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return _react2.default.createElement(
        'div',
        { className: 'flex column' },
        _react2.default.createElement(
            'div',
            { style: { position: 'relative', width: '100%' } },
            _react2.default.createElement(_AsyncAutoCompleteSelect2.default, consolidatedProps),
            props.helpText && _react2.default.createElement(_HelpDrawer.HelpIcon, { title: props.helpTitle, text: props.helpText, style: { right: 16 } })
        ),
        consolidatedProps.error && _react2.default.createElement(
            'div',
            { className: 'errorLabel body-2' },
            consolidatedProps.errorText
        )
    );
}

AsyncAutoCompleteSelectWrapper.propTypes = _extends({}, _AsyncAutoCompleteSelect2.default.propTypes, {
    helpTitle: _react2.default.PropTypes.string,
    helpText: _react2.default.PropTypes.any
});
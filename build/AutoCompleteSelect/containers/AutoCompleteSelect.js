'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = AutoCompleteSelectWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoCompleteSelect = require('../components/AutoCompleteSelect');

var _AutoCompleteSelect2 = _interopRequireDefault(_AutoCompleteSelect);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AutoCompleteSelectWrapper(props) {
    var consolidatedProps = (0, _filterProps2.default)(props, _AutoCompleteSelect2.default.propTypes);
    consolidatedProps.onTouchTap = props.input.onBlur;
    consolidatedProps.error = !!consolidatedProps.errorText;

    return _react2.default.createElement(
        'div',
        { className: 'flex column' },
        _react2.default.createElement(
            'div',
            { style: { position: 'relative', width: '100%' } },
            _react2.default.createElement(_AutoCompleteSelect2.default, consolidatedProps),
            props.helpText && _react2.default.createElement(_HelpDrawer.HelpIcon, { title: props.helpTitle, text: props.helpText, style: { right: 16 }, buttonLabel: 'autocomplete' })
        ),
        consolidatedProps.error && _react2.default.createElement(
            'div',
            { className: 'errorLabel body-2' },
            consolidatedProps.errorText
        )
    );
}

AutoCompleteSelectWrapper.propTypes = _extends({}, _AutoCompleteSelect2.default.propTypes, {
    helpTitle: _react2.default.PropTypes.string,
    helpText: _react2.default.PropTypes.any
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(AutoCompleteSelectWrapper, 'AutoCompleteSelectWrapper', 'src/AutoCompleteSelect/containers/AutoCompleteSelect.js');
}();

;
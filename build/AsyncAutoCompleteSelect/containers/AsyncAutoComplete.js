'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AsyncAutoCompleteSelect = require('../components/AsyncAutoCompleteSelect.component');

var _AsyncAutoCompleteSelect2 = _interopRequireDefault(_AsyncAutoCompleteSelect);

var _filterProps = require('../../helpers/_filterProps');

var _filterProps2 = _interopRequireDefault(_filterProps);

var _HelpDrawer = require('../../HelpDrawer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsyncAutoCompleteSelectWrapper = function AsyncAutoCompleteSelectWrapper(props) {
    var filteredProps = (0, _filterProps2.default)(props, _AsyncAutoCompleteSelect2.default.propTypes);
    return _react2.default.createElement(
        'div',
        { style: { position: 'relative', width: '100%' } },
        _react2.default.createElement(_AsyncAutoCompleteSelect2.default, filteredProps),
        props.helpText && _react2.default.createElement(
            'div',
            { style: { position: 'absolute', right: 0, top: 0 } },
            _react2.default.createElement(_HelpDrawer.HelpIcon, { title: props.helpTitle, text: props.helpText, buttonLabel: 'Got it!' })
        )
    );
};

AsyncAutoCompleteSelectWrapper.propTypes = _extends({}, _AsyncAutoCompleteSelect2.default.propTypes, {
    helpTitle: _propTypes2.default.string,
    helpText: _propTypes2.default.any
});

exports.default = AsyncAutoCompleteSelectWrapper;
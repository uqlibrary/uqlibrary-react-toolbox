'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Stepper = require('material-ui/Stepper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomStepper(_ref) {
    var activeStep = _ref.activeStep,
        steps = _ref.steps;

    return _react2.default.createElement(
        'div',
        { className: 'Stepper' },
        _react2.default.createElement(
            _Stepper.Stepper,
            { activeStep: activeStep, style: { padding: '0', margin: '-10px auto' } },
            steps.map(function (step, index) {
                return _react2.default.createElement(
                    _Stepper.Step,
                    { key: 'stepper_' + index },
                    _react2.default.createElement(
                        _Stepper.StepLabel,
                        {
                            style: { textOverflow: 'ellipsis', overflow: 'hidden' } },
                        step.label
                    )
                );
            })
        )
    );
}

exports.default = CustomStepper;
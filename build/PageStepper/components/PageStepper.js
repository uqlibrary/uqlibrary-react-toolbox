'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExpandTransition = require('material-ui/internal/ExpandTransition');

var _ExpandTransition2 = _interopRequireDefault(_ExpandTransition);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Stepper = require('material-ui/Stepper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageStepper = function (_React$Component) {
    _inherits(PageStepper, _React$Component);

    function PageStepper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PageStepper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageStepper.__proto__ || Object.getPrototypeOf(PageStepper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            loading: false,
            finished: false,
            stepIndex: 0
        }, _this.dummyAsync = function (cb) {
            _this.setState({ loading: true }, function () {
                _this.asyncTimer = setTimeout(cb, 500);
            });
        }, _this.handleNext = function () {
            var stepIndex = _this.state.stepIndex;


            if (!_this.state.loading) {
                _this.dummyAsync(function () {
                    _this.setState({
                        loading: false,
                        stepIndex: stepIndex + 1,
                        finished: stepIndex >= 2
                    });
                });
            }
        }, _this.handlePrev = function () {
            var stepIndex = _this.state.stepIndex;

            if (!_this.state.loading) {
                _this.dummyAsync(function () {
                    return _this.setState({
                        loading: false,
                        stepIndex: stepIndex - 1
                    });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PageStepper, [{
        key: 'getComponent',
        value: function getComponent(children, step) {
            return children.filter(function (comp) {
                return comp.props['data-stepperIndex'] === step;
            });
        }

        // React.cloneElement allows us to add extra props onto a component dynamically

    }, {
        key: 'updateProps',
        value: function updateProps() {
            var _this2 = this;

            return _react2.default.Children.map(this.props.children, function (child) {
                if (child) {
                    return _react2.default.cloneElement(child, _this2.processProps(child));
                }

                return child;
            });
        }

        // optional functions that can be attached to a child component

    }, {
        key: 'processProps',
        value: function processProps(child) {
            var propsList = {};

            if (child) {
                if (child.props.stepperOnsubmit) {
                    propsList = Object.assign({}, propsList, { onSubmit: this.handleNext });
                }

                if (child.props.stepperHandleNext) {
                    propsList = Object.assign({}, propsList, { handleNext: this.handleNext });
                }

                if (child.props.stepperHandlePrevious) {
                    propsList = Object.assign({}, propsList, { handlePrevious: this.handlePrev });
                }
            }

            return propsList;
        }
    }, {
        key: 'render',
        value: function render() {
            var loading = this.state.loading;

            // update the props of each of the components to allow interaction with the stepper

            var children = this.updateProps();

            // retrieve all the components for the current stepIndex
            var currentComponent = this.getComponent(children, '' + this.state.stepIndex);

            // build the step labels
            var steps = this.props.formSections.map(function (title, i) {
                return _react2.default.createElement(
                    _Stepper.Step,
                    { key: i },
                    _react2.default.createElement(
                        _Stepper.StepLabel,
                        { style: { textOverflow: 'ellipsis', overflow: 'hidden' } },
                        title
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'layout-fill' },
                _react2.default.createElement(
                    'h1',
                    { className: 'page-title display-1' },
                    'Add a journal article'
                ),
                _react2.default.createElement(
                    _Stepper.Stepper,
                    { activeStep: this.state.stepIndex, style: { padding: '0 25px', margin: '-10px auto' }, onChange: this.handleNext },
                    steps
                ),
                _react2.default.createElement(
                    'div',
                    { style: { width: '100%', maxWidth: '1200px', margin: 'auto' } },
                    _react2.default.createElement(
                        _ExpandTransition2.default,
                        { loading: loading, open: true },
                        currentComponent
                    )
                )
            );
        }
    }]);

    return PageStepper;
}(_react2.default.Component);

PageStepper.propTypes = {
    searchResults: _propTypes2.default.object,
    children: _propTypes2.default.array,
    formSections: _propTypes2.default.array
};
exports.default = PageStepper;
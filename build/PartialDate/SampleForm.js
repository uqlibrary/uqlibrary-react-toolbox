'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRedux = require('react-redux');

var _immutable3 = require('redux-form/immutable');

var _reduxForm = require('redux-form');

var _uqlibraryReactToolbox = require('uqlibrary-react-toolbox');

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SampleForm = function SampleForm() {
    return _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement(
            _uqlibraryReactToolbox.StandardCard,
            null,
            _react2.default.createElement(
                'h3',
                null,
                'Partial Date'
            ),
            _react2.default.createElement(_reduxForm.Field, { name: 'startDate', component: _.PartialDateField, dateFormat: 'YYYY-MM-DD', allowPartial: true })
        ),
        _react2.default.createElement(
            _uqlibraryReactToolbox.StandardCard,
            null,
            _react2.default.createElement(
                'h3',
                null,
                'Full'
            ),
            _react2.default.createElement(_reduxForm.Field, { name: 'endDate', component: _.PartialDateField, dateFormat: 'DD/MM/YYYY' })
        )
    );
}; /**
    * Created by uqvasai on 21/07/2017.
    */


var SampleReduxForm = (0, _immutable3.reduxForm)({
    form: 'SampleForm'
})(SampleForm);

var mapStateToProps = function mapStateToProps(state) {
    return {
        formValues: (0, _immutable3.getFormValues)('SampleForm')(state) || _immutable2.default.Map({})
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(SampleReduxForm);
'use strict';

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _actions = require('./actions');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HelpDrawer reducer tests ', function () {
    it('it should update state when drawer is open', function () {

        var initialState = _immutable2.default.fromJS({
            open: false,
            title: '',
            text: '',
            buttonLabel: 'OK'
        });

        var newState = (0, _reducer2.default)(initialState, { type: _actions.SHOW, payload: initialState });
        expect(newState.get('open')).toEqual(true);
    });

    it('it should update state when drawer is closed', function () {

        var initialState = _immutable2.default.fromJS({
            open: true,
            title: '',
            text: '',
            buttonLabel: 'OK'
        });

        var newState = (0, _reducer2.default)(initialState, { type: _actions.HIDE, payload: initialState });
        expect(newState.get('open')).toEqual(false);
    });
});
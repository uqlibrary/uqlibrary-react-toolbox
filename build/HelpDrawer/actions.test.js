'use strict';

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('HelpDrawer actions tests ', function () {
    it('it should create action for open help drawer', function () {
        var payload = {
            title: 'Help',
            text: 'Ask us anything....',
            buttonLabel: 'Close'
        };

        var action = actions.show(payload.title, payload.text, payload.buttonLabel);
        expect(action).toEqual({ type: actions.SHOW, payload: payload });
    });

    it('it should create action for hide help drawer', function () {
        var action = actions.hide();
        expect(action).toEqual({ type: actions.HIDE });
    });
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show = show;
exports.hide = hide;
// Types
var SHOW = exports.SHOW = 'HELP_DRAWER_SHOW';
var HIDE = exports.HIDE = 'HELP_DRAWER_HIDE';

// Actions
function show(title, text, buttonLabel) {
    return {
        type: SHOW,
        payload: { title: title, text: text, buttonLabel: buttonLabel }
    };
}

function hide() {
    return {
        type: HIDE
    };
}
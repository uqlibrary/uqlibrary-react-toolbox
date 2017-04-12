'use strict';

var _enzyme = require('enzyme');

var _enzymeToJson = require('enzyme-to-json');

var _enzymeToJson2 = _interopRequireDefault(_enzymeToJson);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HelpDrawer = require('./HelpDrawer');

var _HelpDrawer2 = _interopRequireDefault(_HelpDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('./HelpDrawer');

function setup(title, text, buttonLabel, open) {
    var props = {
        open: open,
        title: title,
        text: text,
        hide: function hide() {},
        buttonLabel: buttonLabel
    };

    return (0, _enzyme.shallow)(_react2.default.createElement(_HelpDrawer2.default, props));
}

describe('HelpDrawer snapshots tests', function () {
    it('renders menu', function () {
        var hdText = 'Integer mattis rutrum velit nec posuere. Quisque rhoncus quam elit, eu tincidunt diam feugiat eu. Quisque luctus luctus mauris faucibus ornare. Ut eu metus vitae est euismod gravida ac vel augue. Duis sapien massa, tempor id vulputate nec, auctor nec augue. Donec ullamcorper dignissim metus at vulputate. Mauris non magna enim. Quisque gravida libero augue, efficitur vestibulum leo porttitor id. Etiam quis nisi vehicula, eleifend turpis ut, accumsan nisi. Nam nec nibh auctor, placerat ex vel, rhoncus risus. In fermentum ex sit amet augue molestie sodales. Sed eleifend convallis dui id euismod. Nam eu turpis non mi facilisis euismod. Morbi congue et lectus sed tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.';

        var wrapper = setup('HelpDrawer Title', hdText, 'Close', true);
        var tree = (0, _enzymeToJson2.default)(wrapper);
        expect(tree).toMatchSnapshot();
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(setup, 'setup', 'src/HelpDrawer/components/HelpDrawer.snapshot.test.js');
}();

;
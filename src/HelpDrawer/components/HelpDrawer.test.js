jest.dontMock('./HelpDrawer');

import {shallow} from 'enzyme';
import React from 'react';
import HelpDrawer from './HelpDrawer';

function setup(title, text, buttonLabel, open) {
    const props = {
        open: open,
        title: title,
        text: text,
        buttonLabel: buttonLabel
    };

    return shallow(<HelpDrawer {...props} />);
}

describe('HelpDrawer unit tests tests', () => {
    it('renders children when passed in', () => {
        // proper unit tests are required for components with logic operations
        const hdText = 'Integer mattis rutrum velit nec posuere. Quisque rhoncus quam elit, eu tincidunt diam feugiat eu. Quisque luctus luctus mauris faucibus ornare. Ut eu metus vitae est euismod gravida ac vel augue. Duis sapien massa, tempor id vulputate nec, auctor nec augue. Donec ullamcorper dignissim metus at vulputate. Mauris non magna enim. Quisque gravida libero augue, efficitur vestibulum leo porttitor id. Etiam quis nisi vehicula, eleifend turpis ut, accumsan nisi. Nam nec nibh auctor, placerat ex vel, rhoncus risus. In fermentum ex sit amet augue molestie sodales. Sed eleifend convallis dui id euismod. Nam eu turpis non mi facilisis euismod. Morbi congue et lectus sed tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.';
        const hdTitle = 'HelpDrawer Title';

        const wrapper = setup(hdTitle, hdText, 'Close', true);

        expect(wrapper.contains(<div className="subhead">{hdText}</div>)).toEqual(true);
        expect(wrapper.contains(<h1 className="headline">{hdTitle}</h1>)).toEqual(true);
    });
});

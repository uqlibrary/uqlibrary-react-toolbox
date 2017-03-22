jest.dontMock('./HelpIcon');

import {shallow} from 'enzyme';
import React from 'react';
import HelpIcon from './HelpIcon';

function setup(title, text, buttonLabel) {
    const props = {
        title: title,
        text: text,
        buttonLabel: buttonLabel
    };

    return shallow(<HelpIcon {...props} inline />);
}

describe('HelpIcon unit tests', () => {
    it('renders children when passed in', () => {
        // proper unit tests are required for components with logic operations
        const hdText = 'Integer mattis rutrum velit nec posuere. Quisque rhoncus quam elit, eu tincidunt diam feugiat eu. Quisque luctus luctus mauris faucibus ornare. Ut eu metus vitae est euismod gravida ac vel augue. Duis sapien massa, tempor id vulputate nec, auctor nec augue. Donec ullamcorper dignissim metus at vulputate. Mauris non magna enim. Quisque gravida libero augue, efficitur vestibulum leo porttitor id. Etiam quis nisi vehicula, eleifend turpis ut, accumsan nisi. Nam nec nibh auctor, placerat ex vel, rhoncus risus. In fermentum ex sit amet augue molestie sodales. Sed eleifend convallis dui id euismod. Nam eu turpis non mi facilisis euismod. Morbi congue et lectus sed tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.';
        const hdTitle = 'HelpIcon Title';
        const buttonLabel = 'Got It!';

        const wrapper = setup(hdTitle, hdText, buttonLabel, true);
        const drawerProps = wrapper.unrendered.props;
        const iconComponent = wrapper.props().children;
        const fontIconComponent = iconComponent.props.children.props;

        // check that the inline style has been applied
        expect(wrapper.node.props.className).toBe('form-help-icon inline');

        // check that the drawerProps have been set
        expect(drawerProps.title).toBe(hdTitle);
        expect(drawerProps.text).toBe(hdText);
        expect(drawerProps.buttonLabel).toBe(buttonLabel);
        expect(drawerProps.inline).toBe(true);
        expect(drawerProps.style).toMatchObject({});

        // check that the iconButton was rendered
        expect(iconComponent.type.muiName).toBe('IconButton');
        expect(iconComponent.props.tooltipPosition).toBe('bottom-center');
        expect(iconComponent.props.tooltip).toBe('Click for more information');

        // check that the fontIcon was rendered
        expect(fontIconComponent.className).toBe('material-icons');
        expect(fontIconComponent.children).toBe('help_outline');
        expect(fontIconComponent.color).toBe('rgba(0,0,0,1) !important');


    });
});

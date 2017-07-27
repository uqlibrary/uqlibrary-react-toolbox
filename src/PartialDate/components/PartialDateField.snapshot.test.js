jest.dontMock('./PartialDateField');

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import PartialDateField from './PartialDateField';

function setup(props) {
    return shallow(<PartialDateField {...props} />);
}

describe('Redux-form Field PartialDateField snapshots tests', () => {
    it('renders PartialDateField component', () => {
        const props = {
            name: 'partialDate',
            allowPartial: true,
            input: {
                onChange: () => {}
            }
        };

        const wrapper = setup(props);

        let tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});

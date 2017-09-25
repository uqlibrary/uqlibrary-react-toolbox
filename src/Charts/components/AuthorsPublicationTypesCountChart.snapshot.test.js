jest.dontMock('./AuthorsPublicationTypesCountChart');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import AuthorsPublicationTypesCountChart from './AuthorsPublicationTypesCountChart';

function setup({series, categories, yAxisTitle}) {
    const props = {
        series
    };
    return shallow(<AuthorsPublicationTypesCountChart {...props} />);
}


describe('AuthorsPublicationTypesCountChart snapshot tests', () => {
    it('it should render chart component', () => {
        const app = setup({series: []});
        expect(toJson(app)).toMatchSnapshot();
    });
});


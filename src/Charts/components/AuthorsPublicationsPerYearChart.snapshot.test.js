jest.dontMock('./AuthorsPublicationsPerYearChart');

import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import AthorsPublicationsPerYearChart from './AuthorsPublicationsPerYearChart';
import {publicationYearsBig, publicationYearsSmall, publicationYearsTiny, publicationYearsZero} from './data/publicationYears';

function setup({series, categories, yAxisTitle}) {
    const props = {
        series,
        categories,
        yAxisTitle
    };
    return shallow(<AthorsPublicationsPerYearChart {...props} />);
}


describe('AuthorsPublicationsPerYearChart snapshot tests', () => {
    it('it should render chart component', () => {
        const app = setup({series: [], categories: [], yAxisTitle: 'title'});
        expect(toJson(app)).toMatchSnapshot();
    });
});


jest.dontMock('./FileUploader');

import { mount } from 'enzyme';
import { createStore } from 'redux';
import Immutable from 'immutable';
import fileUploadReducer from '../reducer';
import toJson from 'enzyme-to-json';
import React from 'react';
import { FileUploader } from './FileUploader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

function setup(props) {
    return mount(<FileUploader {...props} />, {
        context: {
            muiTheme: getMuiTheme(),
            store: createStore(fileUploadReducer, Immutable.Map({fileUpload: fileUploadReducer}))
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired,
            store: PropTypes.object
        }
    });
}

describe('FileUploader', () => {
    it('renders correctly without any setup', () => {
        const wrapper = setup({});

        const tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files', () => {
        const wrapper = setup({});

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const files = [
            {
                name: 'a.txt',
                size: 100
            },
            {
                name: 'b.txt',
                size: 100
            }
        ];

        wrapper.instance().setUploadedFiles(files);
        tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        wrapper.instance().deleteFile({}, 0);
        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance().deleteAllFiles();
        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files', () => {
        const wrapper = setup({ requireFileAccess: true });

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const files = [
            {
                name: 'a.txt',
                size: 100
            },
            {
                name: 'b.txt',
                size: 100
            }
        ];

        wrapper.instance().setUploadedFiles(files);
        tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        wrapper.instance().replaceFile({ name: 'a.txt', size: 100, access_condition_id: 8 }, 0);
        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance().replaceFile({ name: 'a.txt', size: 100, access_condition_id: 9 }, 0);
        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance().replaceFile({ name: 'a.txt', size: 100, access_condition_id: 9, date: '10/10/2017' }, 0);
        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });
});

jest.dontMock('./FileUploader');

import {mount} from 'enzyme';
import {createStore} from 'redux';
import Immutable from 'immutable';
import fileUploadReducer from '../reducer';
import toJson from 'enzyme-to-json';
import React from 'react';
import {FileUploader} from './FileUploader';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

function setup(props) {
    let defaultProps = {
        ...props,
        clearFileUpload: jest.fn()
    };

    return mount(<FileUploader {...defaultProps} />, {
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

beforeAll(() => {
    injectTapEventPlugin();
});

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

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        wrapper.instance()._deleteFile({}, 0);
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance()._deleteAllFiles();
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files with access required', () => {
        const wrapper = setup({ requireOpenAccessStatus: true });

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

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        wrapper.instance()._replaceFile({ name: 'a.txt', size: 100, access_condition_id: 8 }, 0);
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance()._replaceFile({ name: 'a.txt', size: 100, access_condition_id: 9 }, 0);
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        wrapper.instance()._replaceFile({ name: 'a.txt', size: 100, access_condition_id: 9, date: '10/10/2017' }, 0);
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files with default access condition based on quick template Id', () => {
        const wrapper = setup({ defaultQuickTemplateId: 3 });

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

        wrapper.instance()._setUploadedFiles(files);
        wrapper.update();

        tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();
    });
});

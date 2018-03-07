jest.dontMock('./FileUploadRow');

import {mount} from 'enzyme';
import {createStore} from 'redux';
import Immutable from 'immutable';
import fileUploadReducer from '../reducer';
import toJson from 'enzyme-to-json';
import React from 'react';
import {FileUploadRow} from './FileUploadRow';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';

function setup({index, uploadedFile, requireOpenAccessStatus, onDelete, onAttributeChanged, progress, uploadInProgress}) {
    let defaultProps = {
        index: index || 0,
        uploadedFile: uploadedFile || {name: 'a.txt', size: 100},
        requireOpenAccessStatus: requireOpenAccessStatus || false,
        onDelete: onDelete || jest.fn(),
        onAttributeChanged: onAttributeChanged || jest.fn(),
        progress: progress || 0,
        uploadInProgress: uploadInProgress || false
    };

    return mount(<FileUploadRow {...defaultProps} />, {
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

describe('FileUploadRow', () => {
    it('renders correctly with uploaded file', () => {
        const wrapper = setup({});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with uploaded file with some progress', () => {
        const wrapper = setup({progress: 50, uploadInProgress: true});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly for edge browser if file is being uploaded but no progress data', () => {
        const wrapper = setup({progress: 0, uploadInProgress: true});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with file upload success', () => {
        const wrapper = setup({progress: 100, uploadInProgress: true});
        const tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
    });

    it('shows confirmation on delete file', () => {
        const testFunction = jest.fn();
        const wrapper = setup({onDelete: testFunction});

        wrapper.instance()._showConfirmation();
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Dialog').props().open).toBeTruthy();

        wrapper.instance()._deleteFile();
        wrapper.update();

        expect(testFunction).toBeCalled();
    });

    it('updates file metadata correctly with closed access', () => {
        const testFunction = jest.fn();
        const file = {
            name: 'a.txt',
            size: 100,
            date: '2017-01-01'
        };
        const wrapper = setup({requireOpenAccessStatus: true, onAttributeChanged: testFunction, uploadedFile: file});

        wrapper.instance()._updateFileMetadata({key: 'access_condition_id', value: 8});
        wrapper.update();

        expect(testFunction).toBeCalled();
        expect(wrapper.state().access_condition_id).toEqual(8);
        expect(wrapper.props().uploadedFile.date).toBeUndefined();
    });


    it('updates file metadata correctly with open access', () => {
        const testFunction = jest.fn();
        const wrapper = setup({requireOpenAccessStatus: true, onAttributeChanged: testFunction});

        wrapper.instance()._updateFileMetadata({key: 'access_condition_id', value: 9});
        wrapper.update();

        expect(testFunction).toBeCalled();
        expect(wrapper.state().access_condition_id).toEqual(9);
        expect(wrapper.props().uploadedFile.date).toBeDefined();
    });
});

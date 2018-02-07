jest.dontMock('./FileUploadDropzone');

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import FileUploadDropzone from './FileUploadDropzone';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';

const locale = {
    validation: {
        single: {
            ['folder']: 'Invalid file ([filename])',
            ['fileName']: 'Invalid file name ([filename])',
            ['fileNameLength']: 'Filename ([filename]) is too long',
            ['maxFileSize']: 'File ([filename]) is too big',
            ['maxFiles']: 'Only [maxNumberOfFiles] files are allowed to be uploaded. File ([filename]) ignored'
        },
        multiple: {
            ['folder']: 'Invalid files ([filenames])',
            ['fileName']: '[numberOfFiles] files ([filenames]) have an invalid file name',
            ['fileNameLength']: '[numberOfFiles] filenames ([filenames]) are too long',
            ['maxFileSize']: '[numberOfFiles] files ([filenames]) are too big',
            ['maxFiles']: 'Only [maxNumberOfFiles] files are allowed to be uploaded.  Files ([filenames]) ignored'
        }
    },
    errorTitle: 'Upload Errors',
    fileUploadRestrictionHeading: (<h3>File upload restrictions</h3>),
    fileUploadRestrictions: (
        <div>
            Please ensure your files:
            <ul>
                <li>begin with a letter and are less than 45 characters long</li>
                <li>contain only upper and lowercase alphanumeric characters, and underscores</li>
                <li>have only a single period which precedes the file extension: “.pdf”</li>
                <li>are uploaded individually and not inside a folder</li>
            </ul>
        </div>
    ),
    fileUploadInstruction: (
        <p>Click here to select files, or drag files into this area to upload</p>
    )
};

function setup(props) {
    return mount(<FileUploadDropzone {...props} locale={locale} />, {
        context: {
            muiTheme: getMuiTheme()
        },
        childContextTypes: {
            muiTheme: PropTypes.object.isRequired
        }
    });
}

describe('FileUploadDropzone', () => {
    it('renders correctly without any setup', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 3,
            uploadedFiles: [],
            clearErrors: false
        };
        const wrapper = setup(props);

        const tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();
    });

    it('renders row for uploaded files', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 3,
            uploadedFiles: [],
            clearErrors: false
        };
        const wrapper = setup(props);

        let tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();

        const accepted = [
            {
                type: 'text/text',
                name: 'a.txt',
                size: 500
            },
            {
                type: '',
                name: 'folder',
                size: 500
            },
            {
                type: 'text/text',
                name: 'jalksjflkajsdlkfjasdlkfjalsdfjlkasdjflkajsdfkljasdlfjasljfsajlkdsjflkasdjflkjasdflkj.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'a.text.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'a b.txt',
                size: 100
            }
        ];

        const rejected = [
            {
                type: 'text/text',
                name: 'b.txt',
                size: 50000
            }
        ];

        wrapper.instance()._onDrop(accepted, rejected);
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();

        const moreFiles = [
            {
                type: 'text/text',
                name: 'b.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'c.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'd.txt',
                size: 100
            }
        ];

        wrapper.instance()._onDrop(moreFiles, []);
        wrapper.update();

        tree = toJson(wrapper);
        expect(tree).toMatchSnapshot();
        expect(onDroppedCallback).toHaveBeenCalled();
    });
});

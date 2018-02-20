jest.dontMock('./FileUploadDropzone');

import React from 'react';
import FileUploadDropzone from './FileUploadDropzone';

const locale = {
    validation: {
        ['folder']: 'Invalid files ([filenames])',
        ['fileName']: 'File(s) ([filenames]) have invalid file name',
        ['maxFileSize']: 'File(s) ([filenames]) exceed maximum allowed upload file size',
        ['maxFiles']: 'Maximum number of files ([maxNumberOfFiles]) has been exceeded. File(s) Files ([filenames]) will not be uploaded',
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

function setup(testProps, isShallow = true) {
    const props = {
        ...testProps
    };

    return getElement(<FileUploadDropzone {...props} />, isShallow);
}

describe('Component FileUploadDropzone', () => {
    beforeEach(() => {
        const FILE_READER_TO_USE = new FileReader();
        window.FileReader = jest.fn(() => FILE_READER_TO_USE);
        window.FileReader.onerror = () => resolve();
        window.FileReader.onload = () => resolve();
        window.FileReader.readAsDataURL = () => (window.FileReader.onload);
    });

    it('should render correctly without any setup', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 3,
            uploadedFiles: [],
            clearErrors: false,
            locale: locale
        };
        const wrapper = setup({...props});

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render files discarding folders', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 5,
            uploadedFiles: [],
            clearErrors: false,
            locale: locale,
        };
        const wrapper = setup({...props});

        expect(toJson(wrapper)).toMatchSnapshot();

        const accepted = [
            {
                type: 'text/text',
                name: 'a.txt',
                size: 500
            },
            {
                type: 'text/text',
                name: 'a.text.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'ab.txt',
                size: 100
            },
            {
                type: '',
                name: 'test',
                size: 100
            },
            {
                type: 'text/text',
                name: 'web_a.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'WEB_b.txt',
                size: 100
            },
            {
                type: 'text/text',
                name: 'Web_c.txt',
                size: 100
            }
        ];

        const event = {
            dataTransfer: {
                items: [
                    {
                        webkitGetAsEntry: () => ({
                            name: 'test',
                            isDirectory: true
                        })
                    }
                ]
            }
        };

        wrapper.instance()._onDrop(accepted, [], event);
        wrapper.update();

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(onDroppedCallback).toHaveBeenCalled();
    });


    it('should open files selection dialog', () => {
        const onDroppedCallback = jest.fn();
        const props = {
            onDropped: onDroppedCallback,
            maxSize: 1000,
            maxFiles: 5,
            uploadedFiles: [],
            clearErrors: false,
            locale: locale
        };
        const wrapper = setup({...props}, false);

        expect(toJson(wrapper)).toMatchSnapshot();

        const testFn = jest.fn();
        wrapper.instance().dropzoneRef.open = testFn;

        wrapper.instance()._onKeyPress();
        wrapper.update();

        expect(testFn).toHaveBeenCalled();
    });
});

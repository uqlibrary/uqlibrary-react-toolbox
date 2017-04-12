import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import {Field} from 'redux-form/immutable';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import {AutoCompleteSelect} from '../../AutoCompleteSelect';
import AuthorRow from './AuthorRow';

import './Authors.scss';

export default class Authors extends Component {

    static propTypes = {
        addAuthor: PropTypes.func,
        removeAuthor: PropTypes.func,
        formValues: PropTypes.object,
        loadAuthors: PropTypes.func,
        listOfAuthors: PropTypes.object,
        selectedAuthors: PropTypes.object,
        form: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.loadAuthors();
    }

    addAuthor = () => {
        this.props.addAuthor(this.props.formValues.get('authorName'));
    }

    removeAuthor = (i) => {
        this.props.removeAuthor(i);
    }

    createAuthorRow = (selectedAuthors) => {
        if (typeof selectedAuthors === 'undefined') {
            return '';
        } else {
            console.log('createAuthorRow start');
            return selectedAuthors.valueSeq().map((author, i) => {
                console.log('createAuthorRow author', author);
                return (
                    <AuthorRow key={i} authorID={author.get('id')} name={author.get('name')}
                               removeAuthor={this.removeAuthor}/>
                );
            });
        }
    }

    createListofAuthors = (listOfAuthors) => {
        const authors = [];

        if (typeof listOfAuthors !== 'undefined') {
            listOfAuthors.map((author) => {
                authors.push(
                    {'id': author.get('id'), 'name': author.get('name')}
                );
            });
        }

        return authors;
    }

    render() {
        const { listOfAuthors, formValues, selectedAuthors } = this.props;
        const ListOfAuthors = this.createAuthorRow(selectedAuthors);

        const authors = this.createListofAuthors(listOfAuthors);

        return (
            <div>
                <div className="row" style={{marginBottom: '50px'}}>
                    <div className="flex inputPadding">
                        <Field component={AutoCompleteSelect} name="authorName"
                               maxSearchResults={10}
                               label="Author name (as published, in order)"
                               dataSource={authors}
                               dataSourceConfig={{text: 'name', value: 'id'}}
                               openOnFocus
                               fullWidth />
                    </div>
                    <div className="flex" style={{flex: '0 0 80px', textAlign: 'right'}}>
                        <RaisedButton label="Add" secondary style={{marginTop: '30px'}} onClick={this.addAuthor} disabled={formValues && formValues.size === 0} />
                    </div>
                </div>

                {ListOfAuthors}
                {ListOfAuthors.length > 0 &&
                    <Divider style={{margin: '10px 0 0 0'}}/>
                }
            </div>
        );
    }
}

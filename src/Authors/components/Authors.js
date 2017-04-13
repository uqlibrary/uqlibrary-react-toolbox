import React, {Component} from 'react';
import {Field} from 'redux-form/immutable';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import {AutoCompleteSelect} from '../../AutoCompleteSelect';
import AuthorRow from './AuthorRow';

import './Authors.scss';

export default class Authors extends Component {

    static propTypes = {
        dataSource: React.PropTypes.object.isRequired,
        addAuthor: React.PropTypes.func,
        removeAuthor: React.PropTypes.func,
        formValues: React.PropTypes.object,
        listOfAuthors: React.PropTypes.object,
        selectedAuthors: React.PropTypes.object,
        form: React.PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
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
            return selectedAuthors.valueSeq().map((author, i) => {
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
        const { dataSource, formValues, selectedAuthors } = this.props;
        const ListOfAuthors = this.createAuthorRow(selectedAuthors);

        const authorsDataSource = this.createListofAuthors(dataSource);

        return (
            <div>
                <div className="row" style={{marginBottom: '50px'}}>
                    <div className="flex inputPadding">
                        <Field component={AutoCompleteSelect} name="authorName"
                               maxSearchResults={10}
                               label="Author name (as published, in order)"
                               dataSource={authorsDataSource}
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

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import Divider from 'material-ui/Divider';
import SocialPerson from 'material-ui/svg-icons/social/person';
import RaisedButton from 'material-ui/RaisedButton';

// import './Authors.scss';

class AuthorRow extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        authorID: PropTypes.number.isRequired,
        removeAuthor: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    remove = () => {
        this.props.removeAuthor(this.props.authorID);
    }

    render() {
        return (
            <div className="Author">
                <Divider />
                <div className="row">
                    <div className="flex authorLeftIcon"><SocialPerson /></div>
                    <div className="flex-100 authorName">{this.props.name}</div>
                    <div className="flex authorRightIcon"><RaisedButton label="Remove" onClick={this.remove} /></div>
                </div>
            </div>
        );
    }
}

export default AuthorRow;

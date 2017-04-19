import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import {findDOMNode} from 'react-dom';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Popover from 'material-ui/Popover';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class AsyncAutoCompleteSelect extends Component {
    static propTypes = {
        debounceDuration: PropTypes.number,
        disabled: PropTypes.bool,
        emptySearchText: PropTypes.string,
        error: PropTypes.bool,
        label: PropTypes.string.isRequired,
        labelField: PropTypes.string,
        noResultsText: PropTypes.string,
        popoverFloatingLabelText: PropTypes.string,
        minLength: PropTypes.number,
        value: PropTypes.object,
        filterItems: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        debounceDuration: 300,
        disabled: false,
        error: false,
        minLength: 3,
        emptySearchText: 'Start typing to filter data...',
        noResultsText: 'No results found with those search details',
        popoverFloatingLabelText: 'Start typing to filter',
        value: null
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            filterLoading: false,
            pendingBounce: null,
            baseInputLabel: '',
            isOpen: false,
            isFocused: false,
            anchorElement: null,
            searchElement: null,
            filteredItems: []
        };
    }

    updateSearch = (e, value) => {
        if (this.state.pendingBounce) {
            clearTimeout(this.state.pendingBounce);
        }

        const valid = this.validateSearchInput(value);
        this.setState({
            searchText: value,
            pendingBounce: valid ? setTimeout(this.updateAutocomplete, 500) : null,
            filterLoading: valid,
            filteredItems: []
        }, this.focusSearchInput);
    };

    validateSearchInput = (value) => {
        return value.length >= this.props.minLength;
    };

    updateAutocomplete = () => {
        Promise.resolve(this.props.filterItems(this.state.searchText)).then(data => {
            this.setState({
                filteredItems: data,
                filterLoading: false
            }, this.focusSearchInput);
        }).catch(() => {
            this.setState({
                filteredItems: [],
                filterLoading: false
            }, this.focusSearchInput);
        });
    };

    togglePopover = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            filterLoading: false,
            filteredItems: [],
            searchText: ''
        }, this.focusSearchInput);
    };

    selectItem = (e, item) => {
        this.props.onChange(item);
        this.togglePopover();
    };

    focusSearchInput = () => {
        findDOMNode(this.state.searchElement).getElementsByTagName('input')[0].focus();
    };

    receivesFocus = () => {
        this.setState({isFocused: true});
    };

    receivesBlur = () => {
        this.setState({isFocused: false});
    };

    setAnchorElement = input => {
        this.setState({anchorElement: input});
    };

    setSearchElement = input => {
        this.setState({searchElement: input});
    };

    render() {
        const theme = this.context.muiTheme;

        const labelStyle = {color: 'rgb(224, 224, 224)', top: '12px', cursor: 'pointer'};
        const valueStyle = {
            color: this.props.disabled ? theme.textField.disabledTextColor : theme.textField.textColor
        };
        const baseContainerProps = {
            style: {
                cursor: this.props.disabled ? 'not-allowed' : 'pointer'
            },
            onTouchTap: this.props.disabled ? null : this.togglePopover
        };

        return (
            <div className="auto-complete-select row align-end">
                <div className="base-input-container flex" ref={this.setAnchorElement} {...baseContainerProps}>
                    <TextFieldLabel muiTheme={theme}
                                    style={labelStyle}
                                    shrink={this.props.value !== null}>
                        {this.props.label}
                    </TextFieldLabel>
                    <TextFieldUnderline focus={this.state.isFocused}
                                        error={this.props.error}
                                        muiTheme={theme}
                                        disabled={this.props.disabled} />
                    {this.props.value && (
                        <span className="value" style={valueStyle}>
                            {this.props.value[this.props.labelField]}
                        </span>
                    )}
                    <IconButton
                        style={{right: 0, position: 'absolute'}}
                        disabled={this.props.disabled}
                        onFocus={this.receivesFocus}
                        onTouchTap={this.togglePopover}
                        onBlur={this.receivesBlur}>
                        <DropDownArrow className="arrow" />
                    </IconButton>
                </div>
                <Popover open={this.state.isOpen}
                         className="auto-complete-select-popover"
                         style={{minWidth: 500}}
                         canAutoPosition={false}
                         useLayerForClickAway
                         anchorEl={this.state.anchorElement}
                         onRequestClose={this.togglePopover}>
                    <div className="search-input-container">
                        <TextField ref={this.setSearchElement}
                                   name="auto-complete-select-filter-field"
                                   fullWidth
                                   floatingLabelText={this.props.popoverFloatingLabelText}
                                   value={this.state.searchText}
                                   onChange={this.updateSearch} />
                        {this.state.filterLoading === true && (
                            <div className="loading-indicator">
                                <CircularProgress size={20} />
                            </div>
                        )}
                    </div>

                    <Divider />

                    <Menu onChange={this.selectItem} value={this.props.value}>
                        {this.state.filteredItems.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    tabIndex={index}
                                    value={item}
                                    primaryText={item[this.props.labelField]}/>
                            );
                        })}
                    </Menu>

                    <div className="message-container">
                        {this.state.searchText === '' && (
                            <span className="body-1">{this.props.emptySearchText}</span>
                        )}

                        {(this.state.searchText !== '' && this.state.filteredItems.length === 0 && this.state.filterLoading === false) && (
                            <span className="body-1">{this.props.noResultsText}</span>
                        )}
                    </div>
                </Popover>
            </div>
        );
    }
}

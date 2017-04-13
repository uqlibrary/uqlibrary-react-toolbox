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
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// import './AutoCompleteSelect.scss';

export default class AutoCompleteSelect extends Component {
    static propTypes = {
        dataSource: PropTypes.array,
        dataSourceConfig: PropTypes.object,
        disabled: PropTypes.bool,
        emptySearchText: PropTypes.string,
        error: PropTypes.bool,
        label: PropTypes.string.isRequired,
        maxSearchResults: PropTypes.number,
        noResultsText: PropTypes.string,
        popoverFloatingLabelText: PropTypes.string,
        value: PropTypes.any,
        filterItems: PropTypes.func,
        onChange: PropTypes.func
    };

    static defaultProps = {
        dataSource: [],
        dataSourceConfig: {text: 'text', value: 'value'},
        disabled: false,
        error: false,
        maxSearchResults: 10,
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

        this.setState({
            searchText: value,
            pendingBounce: setTimeout(this.updateAutocomplete, 500),
            filteredItems: []
        }, this.focusSearchInput);
    };

    getFilteredItems = () => {
        return this.props.dataSource.filter((item) => {
            const label = item[this.props.dataSourceConfig.text];
            return !label || !this.state.searchText || label.toLowerCase().includes(this.state.searchText.toLowerCase());
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

        const selectedItem = this.props.dataSource.find(item => item[this.props.dataSourceConfig.value] === this.props.value);
        const filteredItems = this.getFilteredItems();

        return (
            <div className="auto-complete-select row align-end">
                <div className="base-input-container flex" ref={this.setAnchorElement} {...baseContainerProps}>
                    <TextFieldLabel muiTheme={theme}
                                    style={labelStyle}
                                    shrink={selectedItem !== undefined}>
                        {this.props.label}
                    </TextFieldLabel>
                    <TextFieldUnderline
                        focus={this.state.isFocused}
                        error={this.props.error}
                        muiTheme={theme}
                        disabled={this.props.disabled}  />
                    {selectedItem && (
                        <span className="value" style={valueStyle}>
                            {selectedItem[this.props.dataSourceConfig.text]}
                        </span>
                    )}
                    <IconButton
                        style={{right: '-10px', position: 'absolute'}}
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
                    </div>

                    <Divider />

                    <Menu onChange={this.selectItem} value={this.props.value}>
                        {filteredItems.slice(0, this.props.maxSearchResults).map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    tabIndex={index}
                                    value={item[this.props.dataSourceConfig.value]}
                                    primaryText={item[this.props.dataSourceConfig.text]}/>
                            );
                        })}
                    </Menu>

                    {this.state.searchText === '' && (
                        <div className="message-container">
                            <span className="body-1">{this.props.emptySearchText}</span>
                        </div>
                    )}

                    {(this.state.searchText !== '' && filteredItems.length === 0 && this.state.filterLoading === false) && (
                        <div className="message-container">
                            <span className="body-1">{this.props.noResultsText}</span>
                        </div>
                    )}
                </Popover>
            </div>
        );
    }
}

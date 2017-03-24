# AutoCompleteSelect and AsyncAutoCompleteSelect

smart component that hits an endpoint to retrieve and set the data in the select field for UQ Library applications using ReactJs


## AsyncAutoCompleteSelect
## Props
- `title: React.PropTypes.string`
- `debounceDuration: React.PropTypes.number`
- `disabled: React.PropTypes.bool`
- `emptySearchText: React.PropTypes.string`
- `error: React.PropTypes.bool`
- `label: React.PropTypes.string.isRequired`
- `labelField: React.PropTypes.string`
- `noResultsText: React.PropTypes.string`
- `minLength: React.PropTypes.number`
- `value: React.PropTypes.object`
- `filterItems: React.PropTypes.func`
- `onChange: React.PropTypes.func`
    
## Usage

```jsx
<AsyncAutoCompleteSelect name="uq"
     error={!!this.props.errorText}
     label={leadLabel}
     disabled={true/false}
     onChange={this.funct}
     filterItems={listOfItems}
     labelField="labelField"
     value={value} />
```

## AutoCompleteSelect
- `dataSource: React.PropTypes.array`
- `dataSourceConfig: React.PropTypes.object`
- `disabled: React.PropTypes.bool`
- `emptySearchText: React.PropTypes.string`
- `error: React.PropTypes.bool`
- `label: React.PropTypes.string.isRequired`
- `maxSearchResults: React.PropTypes.number`
- `noResultsText: React.PropTypes.string`
- `value: React.PropTypes.any`
- `filterItems: React.PropTypes.func`
- `onChange: React.PropTypes.func`

## Usage

```jsx
<Field component={AutoCompleteSelect} name="school_id"
       disabled={true/false}
       maxSearchResults={10}
       label="label"
       dataSource={formData.jsonObject}
       dataSourceConfig={{text: 'name', value: 'id'}}
       openOnFocus
       helpTitle={helpTitle}
       helpText={helpText}
       fullWidth />
```
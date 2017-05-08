# AutoCompleteSelect

A smart select field component that lists items for UQ Library applications using ReactJs

## Props
- `label: PropTypes.string.isRequired`
- `dataSource: PropTypes.array`
- `dataSourceConfig: PropTypes.object`
- `disabled: PropTypes.bool`
- `emptySearchText: PropTypes.string`
- `error: PropTypes.bool`
- `maxSearchResults: PropTypes.number`
- `noResultsText: PropTypes.string`
- `popoverFloatingLabelText: PropTypes.string`
- `value: PropTypes.any`
- `filterItems: PropTypes.func`
- `onChange: PropTypes.func`


## Context
- `muiTheme: PropTypes.object.isRequired`

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {AutoCompleteSelect} from 'uqlibrary-react-toolbox';

const schools = [
    {"id":1,"name":"School of Agriculture and Food Sciences"},
    {"id":2,"name":"School of Architecture"},
    {"id":3,"name":"School of Biological Sciences"},
    {"id":4,"name":"School of Biomedical Sciences"},
    {"id":5,"name":"School of Business"}];
 
const App = () => (
  <div>
    <AutoCompleteSelectWrapper name="school_id"
       disabled={false}
       maxSearchResults={10}
       label="Label"
       dataSource={schools}
       dataSourceConfig={{text: 'name', value: 'id'}}
       popoverFloatingLabelText="This is a sample label"
       />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


# AsyncAutoCompleteSelect

A smart select field component that filters the select field data as you type for UQ Library applications using ReactJs

## Props
- `label: PropTypes.string.isRequired`
- `debounceDuration: PropTypes.number`
- `disabled: PropTypes.bool`
- `emptySearchText: PropTypes.string`
- `error: PropTypes.bool`
- `labelField: PropTypes.string`
- `noResultsText: PropTypes.string`
- `popoverFloatingLabelText: PropTypes.string`
- `minLength: PropTypes.number`
- `value: PropTypes.object`
- `filterItems: PropTypes.func`
- `onChange: PropTypes.func`

## Context
- `muiTheme: PropTypes.object.isRequired`

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {AutoCompleteSelect} from 'uqlibrary-react-toolbox';

const users = [
        {"username":"test1","name":"Test User 1","mail":null},
        {"username":"test2","name":"Test User 2","mail":"test2@test.com"},
        {"username":"test3","name":"Test User 3","mail":"test3@test.com"},
        {"username":"test4","name":"Test User 4","mail":"test4@test.com"}
    ];
    
    const autoCompleteOwner = {
        name: 'A Name',
        mail: 'Mail Text'
    };
 
const App = () => (
  <div>
    <AsyncAutoCompleteSelect name="owner"
        label="Owner"
        disabled
        filterItems={users}
        labelField="name"
        value={autoCompleteOwner}
        popoverFloatingLabelText="This is a sample label"
        errorText="" />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

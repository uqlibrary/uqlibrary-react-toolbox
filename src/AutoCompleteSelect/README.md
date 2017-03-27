# AutoCompleteSelect

A smart select field component that lists items for UQ Library applications using ReactJs

## Props
- `dataSource: React.PropTypes.array`
- `dataSourceConfig: React.PropTypes.object`
- `disabled: React.PropTypes.bool`
- `emptySearchText: React.PropTypes.string`
- `error: React.PropTypes.bool`
- `filterItems: React.PropTypes.func`
- `label: React.PropTypes.string.isRequired`
- `maxSearchResults: React.PropTypes.number`
- `noResultsText: React.PropTypes.string`
- `onChange: React.PropTypes.fun`
- `value: React.PropTypes.any`

## Context
- `muiTheme: React.PropTypes.object.isRequired`

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {AutoCompleteSelect} from 'uqlibrary-react-toolbox';

const schools = [{"id":1,"name":"School of Agriculture and Food Sciences"},{"id":2,"name":"School of Architecture"},{"id":3,"name":"School of Biological Sciences"},{"id":4,"name":"School of Biomedical Sciences"},{"id":5,"name":"School of Business"}];
 
const App = () => (
  <div>
    <AutoCompleteSelectWrapper name="school_id"
       disabled={false}
       maxSearchResults={10}
       label="Label"
       dataSource={schools}
       dataSourceConfig={{text: 'name', value: 'id'}}
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
- `debounceDuration: React.PropTypes.number`
- `disabled: React.PropTypes.bool`
- `emptySearchText: React.PropTypes.string`
- `error: React.PropTypes.bool`
- `filterItems: React.PropTypes.func`
- `label: React.PropTypes.string.isRequired`
- `labelField: React.PropTypes.string`
- `minLength: React.PropTypes.number`
- `noResultsText: React.PropTypes.string`
- `onChange: React.PropTypes.fun`
- `value: React.PropTypes.object`


## Context
- `muiTheme: React.PropTypes.object.isRequired`

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {AutoCompleteSelect} from 'uqlibrary-react-toolbox';

const users = [{"username":"MIS-Ben","name":"Ben Howland","mail":null},{"username":"uqbmckai","name":"Ben Konarov","mail":"b.konarov@uq.edu.au"},{"username":"ccblanci","name":"Ben Lancini","mail":"b.lancini@its.uq.edu.au"},{"username":"uqbhowla","name":"Benjamin Howland","mail":"b.howland@uq.edu.au"},{"username":"uqkbenso","name":"Karen Benson","mail":"k.benson@business.uq.edu.au"},{"username":"anmbenne","name":"Mike Bennett","mail":"m.bennett@uq.edu.au"},{"username":"uqrhorne","name":"Reuben Horne","mail":"r.horne@uq.edu.au"},{"username":"uqsbenn3","name":"Sally Bennett","mail":"sally.bennett@uq.edu.au"},{"username":"pasbenne","name":"Sue Bennett","mail":"s.bennett@uq.edu.au"},{"username":"vpzbensi","name":"Zuhara Bensink","mail":"z.bensink@uq.edu.au"}];
 
const App = () => (
  <div>
    <AsyncAutoCompleteSelect name="owner"
        label="Owner"
        disabled
        filterItems={users}
        labelField="name"
        value={autoCompleteOwner}
        errorText="" />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

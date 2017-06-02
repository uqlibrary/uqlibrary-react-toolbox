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

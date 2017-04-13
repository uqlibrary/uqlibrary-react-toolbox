# Authors

Smart component that lists authors for UQ Library applications using ReactJs

## Props
- `dataSource: React.PropTypes.object.isRequired`
- `title: React.PropTypes.string`
- `addAuthor: React.PropTypes.func`
- `removeAuthor: React.PropTypes.func`
- `formValues: React.PropTypes.object`
- `loadAuthors: React.PropTypes.func.isRequired`
- `listOfAuthors: React.PropTypes.object.isRequired`
- `selectedAuthors: React.PropTypes.object`
- `form: React.PropTypes.string.isRequired.isRequired`
    
## Usage

**./App.js**
```jsx
import React from 'react';
...

import {Authors} from 'uqlibrary-react-toolbox';
export const authorDataSource = [
    {'id': 202, 'name': 'Author 1'},
    {'id': 263, 'name': 'Author 2'},
    {'id': 174, 'name': 'Author 3'},
    {'id': 177, 'name': 'Author 4'}
];
      
const App = () => (
  <div>
    <Authors 
        form="someFormName"
        dataSource={authorDataSource}
         />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


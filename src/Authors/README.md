# Authors

Smart component that lists authors for UQ Library applications using ReactJs

## Props
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
      
const App = () => (
  <div>
    <Authors 
        form="someFormName" />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


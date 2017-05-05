# StaticPage

component for a simple text page with title and help icon

## Props

- `title: PropTypes.string.isRequired`
- `text: PropTypes.string.isRequired`
- `help: PropTypes.object`, eg {title: 'About', text: 'help text..', buttonLabel:'Close'}

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {StaticPage} from 'uqlibrary-react-toolbox';
        
const App = () => (
  <div>
    <StaticPage 
      title='Contact us' 
      text='contact details here...' 
      help={title: 'About', text: 'help text..', buttonLabel:'Close'} 
       />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


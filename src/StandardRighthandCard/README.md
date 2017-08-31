# StandardRighthandCard

component for a right hand panel wrapper

## Props

- `title: PropTypes.string.isRequired`
- `help: PropTypes.object`, eg {title: 'About', text: 'help text..', buttonLabel:'Close'}

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {StandardRighthandCard} from 'uqlibrary-react-toolbox';
        
const App = () => (
  <div>
    <StandardRighthandCard title='Title' help={locale.components.somthing.help}>
      Content
    </StandardRighthandCard>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


# Alert

Prorotype component to display alerts/warnings/errors

## Props
- `message: PropTypes.string`
- `title: PropTypes.string`
- `type PropTypes.string - valid values ['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline']`


## Usage
```jsx
import React from 'react';
...

import {Alerts} from 'uqlibrary-react-toolbox';
      
const App = () => (
  <div>
  
    <Alerts 
        title="This is a title"
        message="Some body text."
        type="error_outline"
    />
    
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


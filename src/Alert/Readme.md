# Alert

Prorotype component to display alerts/warnings/errors

## Props
- `alertText: PropTypes.string`
- `alertType PropTypes.string - valid values ['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline']`


## Usage

**./App.js**
```jsx
import React from 'react';
...

import {Alerts} from 'uqlibrary-react-toolbox';
      
const App = () => (
  <div>
    <Alerts 
        alertText="Some body text."
        alertType="error_outline"
    />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


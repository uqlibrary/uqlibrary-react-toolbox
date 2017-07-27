# PartialDateField

simple date-picker for UQ Library applications using ReactJs.


## PartialDateField Props
- `dateFormat: PropTypes.string`
- `allowPartial: PropTypes.bool`
- `locale: PropTypes.object`
- `months: PropTypes.array`
- `onChange: PropTypes.func`

## PartialDateField defaultProps
- `dateFormat: 'YYYY-MM-DD'`
- `allowPartial: false`
- `months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`


## Usage

**./App.js**
```jsx harmony
import React from 'react';
...

import { PartialDateField } from 'uqlibrary-react-toolbox';

const App = () => (
  <div>
    <PartialDateField
        dateFormat="YYYY-MM-DD"
        allowPartial />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


**With Redux-form**
```jsx harmony
import React from 'react';
import { PartialDateField } from 'uqlibrary-react-toolbox';

const App = () => (
  <form>
    <Field
        name="rek_date"
        component={ PartialDateField }
        allowPartial />
    <Field
        name="published_date"
        component={ PartialDateField }
        dateFormat="DD/MM/YYYY" />
  </form>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
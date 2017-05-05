# Notification

simple reusable notification panel for UQ Library applications using ReactJs

## Props
- `notifcationDetails: PropTypes.object`
- `duration: PropTypes.number`
    
## Usage``

**./component/App.js**
```jsx
import React from 'react';
...

import {Notification} from 'uqlibrary-react-toolbox';
  
  :

showNotification = () => {
   this.props.loadNotification('This is a test message');
}

const App = () => (
  <div>
    <Notification />
    <RaisedButton
              onTouchTap={this.showNotification}
              label="Test Button"
            />
  </div>
);

```

**./container/App.js**
```
import {connect} from 'react-redux';
import {loadNotification} from 'uqlibrary-react-toolbox';

AppContainer = connect(null, dispatch => {
    return {
        loadNotification: (message) => dispatch(loadNotification(message))
    };
})(App);

export default AppContainer;
```



**./SomeComponent.js**
```
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
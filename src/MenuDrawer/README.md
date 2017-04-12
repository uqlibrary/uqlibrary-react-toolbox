# MenuDrawer

simple reusable menu for UQ Library applications using ReactJs

## Props
- `menuItems: React.PropTypes.array.isRequired` - a list of menu items, see usage
- `drawerOpen: React.PropTypes.bool`
- `docked: React.PropTypes.bool`
- `toggleDrawer: React.PropTypes.func`
    
## Usage

**./App.js**
```jsx
import React from 'react';
...

import {MenuDrawer} from 'uqlibrary-react-toolbox';

// Icon import is required to display an icon in the menu
import ActionHome from 'material-ui/svg-icons/action/home';


// Menu configuration
const menuItems = [
            {
                linkTo: '/',
                primaryText: 'Home',
                leftIcon: <ActionHome />,
            },
            {
                divider: true
            },
            {
                linkTo: '/Help',
                primaryText: 'Help'
            }
        ];
        
const App = () => (
  <div>
    <MenuDrawer 
      menuItems={menuItems}
      drawerOpen={docked ? true : drawerOpen}
      docked={docked}
      toggleDrawer={this.toggleDrawer}
      imgAltText: 'Image Alt Text',
      imgLogo: 'https://url/to/image'
       />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


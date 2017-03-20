# HelpDrawer

simple content menu for UQ Library applications using ReactJs

## Props
- `title: React.PropTypes.string`
- `text: React.PropTypes.any.isRequired` 
- `buttonLabel: React.PropTypes.any.isRequired`
- `displayType: React.PropTypes.bool` - currently only inline
- `style: React.PropTypes.object`
    
## Usage

**./App.js**
```jsx
import React from 'react';
...

import {HelpDrawer} from 'uqlibrary-react-toolbox';

// Data configuration
const text = 'Where ever additional cues or explanation are required to clarify a process or procedure. Can be used as a card cue (inline inside of <CardHeader> to offer the icon in the top right of the card, or inline in text or form elements. Additionally, by adding 2 parameters (helpTitle and helpText) to a <Field> element, an integrated help icon can be produced. More info on this implementation in forms.'
        
const App = () => (
  <div>
    <HelpIcon 
        title="Contextual help drawer" 
        text={text} 
        buttonLabel="Got it!" 
        inline />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


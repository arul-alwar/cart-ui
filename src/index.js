import React from 'react';
import ReactDOM from 'react-dom';
import CartMain from './CartMain';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CartMain/>, document.getElementById('root'));

serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './components/menu/Menu';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Menu />, document.getElementById('root'));


serviceWorker.unregister();

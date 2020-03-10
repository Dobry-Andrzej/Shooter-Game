import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './components/menu/Menu';
import App from './scripts/app';

ReactDOM.render(<Menu />, document.getElementById('root'));

var app;

window.onload = function() {
	var canvas = document.getElementById('webGlcanvas');
	app = new App(canvas);
	app.initialize();
};

window.onresize = function() {
	app.resize();
};

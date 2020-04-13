
import App from './App';

let app: App | null = null;

const init = function (canvas: HTMLCanvasElement) {
	app = new App(canvas);
	app.initialize();
	
	app.events.attachEvent("mousedown", function(event) {
		
	});
};

export default {
	init: init,
	app: app
};

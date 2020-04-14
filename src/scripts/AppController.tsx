
import App from './App';

import { vec3 } from 'gl-matrix';

let app: App | null = null;

/*	* Function to initialize the app and events
	* @param {HTMLCanvasElement} canvas
 *	*/
const init = function (canvas: HTMLCanvasElement) {
	app = new App(canvas);
	app.initialize();
	
	app.events.attachEvent(canvas, "mousedown", function(event: MouseEvent) {
		event.preventDefault();
		
		if (app != null) {
			app.editor.tryToUpdateGridSquare(event);
		}
	});
	
	app.events.attachEvent(document, "keydown", function(event: KeyboardEvent) {
		if (event.keyCode != 65 && event.keyCode != 68 && event.keyCode != 83 && event.keyCode != 87) {
			return;
		}
		// w - 87, s - 83, d - 68, a - 65
		event.preventDefault();
		console.log(event.key);
	});
};

export default {
	init: init,
	app: app
};

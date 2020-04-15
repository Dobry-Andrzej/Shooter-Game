
import App from './App';

import { vec3 } from 'gl-matrix';

let app: App | null = null;

/*	* Function to initialize the app and events
	* @param {HTMLCanvasElement} canvas
 *	*/
const init = async function (canvas: HTMLCanvasElement) {
	app = new App(canvas);
	await app.initialize();
	
	app.events.attachEvent(canvas, "mousedown", function(event: MouseEvent) {
		event.preventDefault();
		
		if (app != null) {
			app.editor.tryToUpdateGridSquare(event);
		}
	});
	
	let viewIndex: number = 0;
	app.events.attachEvent(document, "mousewheel", function(event: WheelEvent) {
		
		if (app != null) {
			viewIndex -= event.deltaY / 125;
			viewIndex = Math.min(Math.max(Math.floor(viewIndex), 0), 5);
			
			app.camera.toggleView(viewIndex);	
		}
	});
	
	app.events.attachEvent(document, "keydown", function(event: KeyboardEvent) {
		// wsad 1234 z
		if (app == null) return;
		
		if (event.keyCode != 49 && event.keyCode != 50 && event.keyCode != 51 && event.keyCode != 52 && 
			event.keyCode != 65 && event.keyCode != 68 && event.keyCode != 83 && event.keyCode != 87 &&
			event.keyCode != 90) {
			return;
		}
		// w - 87, s - 83, d - 68, a - 65
		// 1 - 49, 2 - 50, 3 - 51, 4 - 52
		event.preventDefault();
		
		if (event.keyCode == 90) {
			app.scene.meshes[0].visible = !app.scene.meshes[0].visible;
		}
		
		if (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52) {
			app.editor.assetIndex = event.keyCode - 49;
		}		
		
	});
};

export default {
	init: init,
	app: app
};

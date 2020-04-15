
import App from './App';

import { vec2, vec3 } from 'gl-matrix';

let app: App | null = null;

/*	* Function to initialize the app and events
	* @param {HTMLCanvasElement} canvas
 *	*/
const init = async function (canvas: HTMLCanvasElement) {
	app = new App(canvas);
	await app.initialize();
	
	let panEnabled: boolean = false;
	let rotationEnabled: boolean = false;
	
	let mouseXY: vec2 = vec2.create();
	
	let vStart: vec3 = vec3.create();
	let vEnd: vec3 = vec3.create();
	
	app.events.attachEvent(canvas, "mousedown", function(event: MouseEvent) {
		event.preventDefault();
		
		if (app != null) {
			if (event.which == 1) {
				app.editor.tryToUpdateGridSquare(event);
			} else if (event.which == 2) {
				panEnabled = true;
				rotationEnabled = false;
			} else if (event.which == 3) {
				panEnabled = false;
				rotationEnabled = true;
			}
			
			vec2.set(mouseXY, event.offsetX, event.offsetY);
		}
	}, true);
	
	app.events.attachEvent(canvas, "mousemove", function(event: MouseEvent) {
		event.preventDefault();
		
		if (app != null) {
			if (panEnabled == true) {				
				vStart = app.camera.unproject(mouseXY[0], mouseXY[1], 0.0);
				vEnd = app.camera.unproject(event.offsetX, event.offsetY, 0.0);
				
				app.camera.pan(vEnd[0] - vStart[0], vEnd[1] - vStart[1], vEnd[2] - vStart[2]);
			}
			
			vec2.set(mouseXY, event.offsetX, event.offsetY);
		}
	}, true);
	
	app.events.attachEvent(canvas, "mouseup", function(event: MouseEvent) {
		event.preventDefault();
		
		if (app != null) {
			panEnabled = false;
			rotationEnabled = false;
		}
	}, true);
	
	app.events.attachEvent(canvas, "mouseout", function(event: MouseEvent) {
		event.preventDefault();
		
		if (app != null) {
			panEnabled = false;
			rotationEnabled = false;
		}
	}, true);
	
	app.events.attachEvent(canvas, "mousewheel", function(event: WheelEvent) {
		event.preventDefault();
		
		if (app != null) {
			app.camera.zoom(event.deltaY / 125);
		}
	});
	
	app.events.attachEvent(document, "keydown", function(event: KeyboardEvent) {
		// 12345678 wsad z
		if (app == null) return;
		
		if (event.keyCode != 49 && event.keyCode != 50 && event.keyCode != 51 && event.keyCode != 52 && 
			event.keyCode != 53 && event.keyCode != 54 && event.keyCode != 55 && event.keyCode != 56 &&
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
		
		if (event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 ||
			event.keyCode == 53 || event.keyCode == 54 || event.keyCode == 55 || event.keyCode == 56) {
			let assetIndex: number = event.keyCode - 49;
			
			if (assetIndex < app.assets.length) {
				app.editor.assetIndex = assetIndex;
			}
		}		
		
	});
};

export default {
	init: init,
	app: app
};

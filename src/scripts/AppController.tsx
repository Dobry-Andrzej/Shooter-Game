
import App from './App';

import { vec2, vec3 } from 'gl-matrix';

let app: App | null = null;

/*	* Function to initialize the app and events
	* @param {HTMLCanvasElement} canvas
 *	*/
const init = async function (canvas: HTMLCanvasElement) {
	if (app != null) return;
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	app = new App(canvas);
	await app.initialize();
	
	let panEnabled: boolean = false;
	let rotationEnabled: boolean = false;
	
	let mouseXY: vec2 = vec2.create();
	
	let vStart: vec3 = vec3.create();
	let vEnd: vec3 = vec3.create();
	
	app.events.attachEvent(window, "resize", function(event: Event) {
		if (app != null) {
			app.resize(window.innerWidth, window.innerHeight);
		}
	}, true);
	
	app.events.attachEvent(canvas, "contextmenu", function(event: Event) {
		event.preventDefault();
		event.stopPropagation();
	});
	
	app.events.attachEvent(canvas, "mousedown", function(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		
		if (app != null) {
			if (event.which == 1) {
				app.assets.tryToUpdateGridSquare(event, undefined);
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
		event.stopPropagation();
		
		if (app != null) {
			if (panEnabled == true || rotationEnabled == true) {
				vStart = app.camera.unproject(mouseXY[0], mouseXY[1], 0.0);
				vEnd = app.camera.unproject(event.offsetX, event.offsetY, 0.0);
				if (panEnabled == true) {				
					app.camera.pan(vEnd[0] - vStart[0], vEnd[1] - vStart[1], vEnd[2] - vStart[2]);
				} else if (rotationEnabled == true) {
					app.camera.rotate(vEnd[0] - vStart[0], vEnd[1] - vStart[1], vEnd[2] - vStart[2]);
				}
			} else {
				app.assets.tryToPreviewOnGridSquare(event, undefined);
			}
			
			vec2.set(mouseXY, event.offsetX, event.offsetY);
		}
	}, true);
	
	app.events.attachEvent(canvas, "mouseup", function(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		
		if (app != null) {
			panEnabled = false;
			rotationEnabled = false;
		}
	}, true);
	
	app.events.attachEvent(canvas, "mouseout", function(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		
		if (app != null) {
			panEnabled = false;
			rotationEnabled = false;
		}
	}, true);
	
	app.events.attachEvent(canvas, "wheel", function(event: WheelEvent) {
		event.preventDefault();
		
		if (app != null) {
			app.camera.zoom(Math.sign(event.deltaY));
		}
	});
	
	app.events.attachEvent(document, "keydown", function(event: KeyboardEvent) {
		if (app == null) return;
		
		switch (event.keyCode) {
			case 90: //Z
				app.scene.meshes[0].visible = !app.scene.meshes[0].visible;
				event.preventDefault();
				break;
			case 88: //X
				app.assets.coloringIndex++;
				if (app.assets.coloringIndex > 4) {
					app.assets.coloringIndex = 0;
				}
				break;
			case 69: //Q
				app.assets.rotateAsset(1);
				event.preventDefault();
				break;
			case 81: //E
				app.assets.rotateAsset(-1);
				event.preventDefault();
				break;
			case 48: //0
			case 49: //1
			case 50: //2
			case 51: //3
			case 52: //4
			case 53: //5
			case 54: //6
			case 55: //7
			case 56: //8
			case 57: //9
				let i: number;
				let assetIndex: number = event.keyCode - 48;
			
				app.assets.setActiveAssetIndex(assetIndex);
				event.preventDefault();
				break;
			case 65: //A
				app.assets.setActiveAssetCategory(0);
				event.preventDefault();
				break;
			case 83: //S
				app.assets.setActiveAssetCategory(1);
				event.preventDefault();
				break;
			case 68: //D
				app.assets.setActiveAssetCategory(2);
				event.preventDefault();
				break;
			case 70: //F
				app.assets.setActiveAssetCategory(3);
				event.preventDefault();
				break;
			case 71: //G
				app.assets.setActiveAssetCategory(4);
				event.preventDefault();
				break;
			case 72: //H
				app.assets.setActiveAssetCategory(5);
				event.preventDefault();
				break;
			default:
				break;
		}
		
		app.assets.tryToPreviewOnGridSquare(undefined, mouseXY);
		
	});
	
};

export default {
	init: init,
	app: app
};

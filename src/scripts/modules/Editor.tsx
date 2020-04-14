
import App from '../App';

import { vec3 } from 'gl-matrix';

class Editor {
	private _main: App;
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
	}
	
	/*	* Uaktualnie dany fragment mapy
		* @param {MouseEvent} event
	 *	*/
	public tryToUpdateGridSquare (event: MouseEvent) : void {
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1];
		
		let vNear: vec3 = camera.unproject(event.offsetX, event.offsetY, 0.0);
		let vFar: vec3 = camera.unproject(event.offsetX, event.offsetY, 0.1);
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		plane.intersectTriangles(vNear, vDir);
	}

}

export default Editor;

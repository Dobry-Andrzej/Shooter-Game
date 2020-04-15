
import App from '../App';

import { vec3 } from 'gl-matrix';

class Editor {
	private _main: App;
	private _assetIndex: number;
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._assetIndex = 0;
	}
	
	/*	* Setter do assetIndex
		* @param {number} assetIndex
	 *	*/
	public set assetIndex (assetIndex: number) {
		this._assetIndex = assetIndex;
	}
	
	/*	* Getter do assetIndex
		* @returns {number}
	 *	*/
	public get assetIndex () : number {
		return this._assetIndex;
	}
	
	/*	* Uaktualnie dany fragment mapy
		* @param {MouseEvent} event
	 *	*/
	public tryToUpdateGridSquare (event: MouseEvent) : void {
		let scene = this._main.scene;
		let assets = this._main.assets;
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1];
		
		let vNear: vec3 = camera.unproject(event.offsetX, event.offsetY, 0.0);
		let vFar: vec3 = camera.unproject(event.offsetX, event.offsetY, 0.1);
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		let vInt: vec3 = vec3.create();
		let distance: number = plane.intersectTriangles(vNear, vDir, vInt);
		
		if (distance >= 0) {
			let mesh = assets[this._assetIndex].clone(this._main.gl);
			
			mesh.setPosition(Math.floor(vInt[0] * 4) / 4 + 0.125, 0, Math.floor(vInt[2] * 4) / 4 + 0.125);
			mesh.updateBuffers();
			mesh.updateMatrices();
			
			scene.meshes.push(mesh);
		}
	}

}

export default Editor;

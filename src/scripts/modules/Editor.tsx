
import App from '../App';

import { vec3, quat } from 'gl-matrix';

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
	
	/*	* Uaktualnia dany fragment mapy
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
	
	/*	* Pokazuje podglad na aktualnym fragmencie mapy
		* @param {MouseEvent} event
	 *	*/
	public tryToPreviewOnGridSquare (event: MouseEvent) : void {
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
			let mesh = assets[this._assetIndex];
			
			mesh.visible = true;
			
			mesh.setPosition(Math.floor(vInt[0] * 4) / 4 + 0.125, 0, Math.floor(vInt[2] * 4) / 4 + 0.125);
			mesh.updateBuffers();
			mesh.updateMatrices();
		}
	}
	
	/*	* Pokazuje podglad na aktualnym fragmencie mapy
		* @param {MouseEvent} event
	 *	*/
	public rotateAsset (sign: number) : void {
		let mesh = this._main.assets[this._assetIndex];
		let tmp_quat: quat = quat.create();
			
		mesh.visible = true;
		
		quat.fromEuler(tmp_quat, 0, 90 * sign, 0);
		quat.mul(mesh.rotation, mesh.rotation, tmp_quat);
		
		mesh.updateBuffers();
		mesh.updateMatrices();
	}

}

export default Editor;


import App from '../App';

import { vec2, vec3 } from 'gl-matrix';

class Editor {
	private _main: App;
	
	private _coloringIndex: number;
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._coloringIndex = 0;
	}
	
	/*	* Setter do coloringIndex
		* @param {number} coloringIndex
	 *	*/
	public set coloringIndex (coloringIndex: number) {
		this._coloringIndex = coloringIndex;
	}
	
	/*	* Getter do coloringIndex
		* @returns {number}
	 *	*/
	public get coloringIndex () : number {
		return this._coloringIndex;
	}
	
	/*	* Uaktualnia dany fragment mapy
		* @param {MouseEvent} event?
		* @param {vec2} position?
	 *	*/
	public tryToUpdateGridSquare (event?: MouseEvent, position?: vec2) : void {
		let assets = this._main.assets;
		// W przypadku assetu 0, nie rób nic
		if (assets.assetIndex == 0) return;
		
		let scene = this._main.scene;
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1];
		
		let vNear: vec3;
		let vFar: vec3;
		
		if (event) {
			vNear = camera.unproject(event.offsetX, event.offsetY, 0.0);
			vFar = camera.unproject(event.offsetX, event.offsetY, 0.1);
		} else if (position) {
			vNear = camera.unproject(position[0], position[1], 0.0);
			vFar = camera.unproject(position[0], position[1], 0.1);
		} else {
			return;
		}
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		let vInt: vec3 = vec3.create();
		let distance: number = plane.intersect(vNear, vDir, vInt);
		
		if (distance >= 0) {
			let mesh = assets.assetMeshes[assets.assetCategory][assets.assetIndex - 1].clone(this._main.gl);
			
			if (mesh) {
				mesh.setPosition(Math.floor(vInt[0]) + 0.5, 0, Math.floor(vInt[2]) + 0.5);
				
				mesh.renderData.updateRenderingArrays();
				
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				scene.meshes.push(mesh);
			}
		}
	}
	
	/*	* Pokazuje podglad na aktualnym fragmencie mapy
		* @param {MouseEvent} event?
		* @param {vec2} position?
	 *	*/
	public tryToPreviewOnGridSquare (event?: MouseEvent, position?: vec2) : void {
		let assets = this._main.assets;
		// W przypadku assetu 0, nie rób nic
		if (assets.assetIndex == 0) return;
		
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1];
		
		let vNear: vec3;
		let vFar: vec3;
		
		if (event) {
			vNear = camera.unproject(event.offsetX, event.offsetY, 0.0);
			vFar = camera.unproject(event.offsetX, event.offsetY, 0.1);
		} else if (position) {
			vNear = camera.unproject(position[0], position[1], 0.0);
			vFar = camera.unproject(position[0], position[1], 0.1);
		} else {
			return;
		}
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		let vInt: vec3 = vec3.create();
		let distance: number = plane.intersect(vNear, vDir, vInt);
		
		if (distance >= 0) {
			let mesh = assets.assetMeshes[assets.assetCategory][assets.assetIndex - 1];
			
			if (mesh) {
				mesh.visible = true;
				
				mesh.setPosition(Math.floor(vInt[0]) + 0.5, 0, Math.floor(vInt[2]) + 0.5);
				mesh.vertexData.vertexColors = mesh.colorData.colorVariants[this._coloringIndex];
				
				mesh.renderData.updateRenderingArrays();
				mesh.updateBuffers();
				mesh.updateMatrices();
			}
		}
	}

}

export default Editor;

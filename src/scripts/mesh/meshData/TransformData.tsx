
import Mesh from '../Mesh';

import { vec3, quat, quat2, mat4 } from 'gl-matrix';

class TransformData {
	private _mesh: Mesh;
	
	private _matrix: mat4;
	
	private _projectionMatrix: mat4;
	private _modelViewMatrix: mat4;
	
	/*	* Tworzy nową instancję TransformData
		* @param {Mesh) mesh
	 *	*/
	public constructor (mesh: Mesh) {
		this._mesh = mesh;
		
		this._matrix = mat4.create();
		// view bydzie z camery i odpowiada za to gdzie camera patrzy i jej rotacje
		// this._view = mat4.create();
		
		this._projectionMatrix = mat4.create();		
		this._modelViewMatrix = mat4.create();
		
		mat4.perspective(this._projectionMatrix, (Math.PI / 4), (800 / 600), 0.1, 1000);
	}
	
	/*	* Setter do projectionMatrix
		* @param {mat4} projectionMatrix
	 *	*/
	public set projectionMatrix (projectionMatrix: mat4) {
		this._projectionMatrix = projectionMatrix;
	}
	
	/*	* Getter do projectionMatrix
		* @param {mat4} projectionMatrix
	 *	*/
	public get projectionMatrix () : mat4 {
		return this._projectionMatrix;
	}
	
	/*	* Setter do modelViewMatrix
		* @param {mat4} modelViewMatrix
	 *	*/
	public set modelViewMatrix (modelViewMatrix: mat4) {
		this._modelViewMatrix = modelViewMatrix;
	}
	
	/*	* Getter do modelViewMatrix
		* @param {mat4} modelViewMatrix
	 *	*/
	public get modelViewMatrix () : mat4 {
		return this._modelViewMatrix;
	}
	
	/*	* Aktualizuje macierze
		* @param {vec3} position
		* @param {quat} rotation
		* @param {vec3} scale
	 *	*/
	public updateMatrices (position: vec3, rotation: quat, scale: vec3) : void {
		let tmp_quat2: quat2 = quat2.create();
		
		quat2.fromRotation(tmp_quat2, rotation);
		
		mat4.identity(this._modelViewMatrix);	
		//Na razie bezposrednio uaktualniam tą macierz, docelowo camera tu bedzie śmigać		
		mat4.fromRotationTranslationScale(this._modelViewMatrix, tmp_quat2, position, scale);
	}
	
}

export default TransformData;

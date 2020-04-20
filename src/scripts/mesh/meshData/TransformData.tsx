
import Mesh from '../Mesh';

import { vec3, quat, quat2, mat4 } from 'gl-matrix';

class TransformData {
	private _mesh: Mesh;
	
	private _matrix: mat4;
	
	/*	* Tworzy nową instancję TransformData
		* @param {Mesh) mesh
	 *	*/
	public constructor (mesh: Mesh) {
		this._mesh = mesh;
		
		this._matrix = mat4.create();
	}
	
	/*	* Setter do matrix
		* @param {mat4} matrix
	 *	*/
	public set matrix (matrix: mat4) {
		this._matrix = matrix;
	}
	
	/*	* Getter do matrix
		* @param {mat4} matrix
	 *	*/
	public get matrix () : mat4 {
		return this._matrix;
	}
	
	/*	* Funkcja do zwracania kopii TransformData
		* @param {Mesh} mesh
		* @returns {TransformData}
	 *	*/
	public clone (mesh: Mesh) : TransformData {
		var transformData = new TransformData(mesh);
		
		let matrix = mat4.create();
		mat4.copy(matrix, this._matrix);
		transformData.matrix = matrix;
		
		return transformData;
	}
	
	/*	* Aktualizuje macierze
		* @param {vec3} position
		* @param {quat} rotation
		* @param {vec3} scale
	 *	*/
	public updateMatrices (position: vec3, rotation: quat, scale: vec3) : void {
		let tmp_quat2: quat2 = quat2.create();
		
		quat2.fromRotation(tmp_quat2, rotation);
		
		mat4.identity(this._matrix);
		//Na razie bezposrednio uaktualniam tą macierz, docelowo camera tu bedzie śmigać		
		mat4.fromRotationTranslationScale(this._matrix, tmp_quat2, position, scale);
	}
	
}

export default TransformData;

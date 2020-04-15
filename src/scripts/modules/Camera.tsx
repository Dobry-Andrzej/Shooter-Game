
import App from '../App';

import { vec3, mat4 } from 'gl-matrix';

class Camera {
	
	private _main: App;
	
	private _width: number;
	private _height: number;
	
	private _eye: vec3; // pozycja kamery
	private _center: vec3; // punkt na który kamera patrzy
	private _up: vec3; // wektor kierunku, raczej na ogół 0, 1, 0
	
	private _viewMatrix: mat4;
	private _projectionMatrix: mat4;
	private _viewportMatrix: mat4;
	
	private _tmpVec3: vec3;
	private _tmpMatrix: mat4;
	
	/*	* Tworzy nową instancję Camera
		* @param {App} main
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._width = main.canvas.width;
		this._height = main.canvas.height;
		
		this._viewMatrix = mat4.create();
		this._projectionMatrix = mat4.create();
		this._viewportMatrix = mat4.create();
		
		this._tmpVec3 = vec3.create();
		this._tmpMatrix = mat4.create();
		
		mat4.scale(this._viewportMatrix, this._viewportMatrix, vec3.set(this._tmpVec3, 0.5 * this._width, 0.5 * this._height, 0.5));
		mat4.translate(this._viewportMatrix, this._viewportMatrix, vec3.set(this._tmpVec3, 1.0, 1.0, 1.0));
		
		mat4.perspective(this._projectionMatrix, (Math.PI / 4), (800 / 600), 0.01, 1000);
		
		this._eye = vec3.create();
		this._center = vec3.create();
		this._up = vec3.create();
		
		vec3.set(this._eye, 4, 7, 4);
		vec3.set(this._center, 0, 0, 0);
		vec3.set(this._up, 0, 1, 0);
		
		mat4.lookAt(this._viewMatrix, this._eye, this._center, this._up);
	}
	
	/*	* Setter do viewMatrix
		* @param {mat4} viewMatrix
	 *	*/
	public set viewMatrix (viewMatrix: mat4) {
		this._viewMatrix = viewMatrix;
	}
	
	/*	* Getter do viewMatrix
		* @param {mat4} viewMatrix
	 *	*/
	public get viewMatrix () : mat4 {
		return this._viewMatrix;
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
	
	/*	* Funkcja do zoomowania kamery
		* @param {number} delta
	 *	*/
	public zoom(delta: number) : void {
		let dir: vec3 = vec3.create();
		let distance: number = vec3.distance(this._eye, this._center);
		
		if (distance + delta > 0.1 && distance + delta < 20) {
		
			vec3.sub(dir, this._eye, this._center);
			vec3.normalize(dir, dir);
			vec3.scaleAndAdd(this._eye, this._eye, dir, delta);
			
			mat4.lookAt(this._viewMatrix, this._eye, this._center, this._up);
		}
	}
	
	/*	* Funkcja do panowania kamery
		* @param {number} deltaX
		* @param {number} deltaY
		* @param {number} deltaZ
	 *	*/
	public pan(deltaX: number, deltaY: number, deltaZ: number) : void {
		let delta: vec3 = vec3.create();
		
		vec3.set(delta, -deltaX * 1e3, -deltaY * 1e3, -deltaZ * 1e3);
		
		vec3.add(this._eye, this._eye, delta);
		vec3.add(this._center, this._center, delta);
		
		mat4.lookAt(this._viewMatrix, this._eye, this._center, this._up);
		
	}
	
	/*	* Konwersja z pozycji ekranu na pozycje w 3d
		* @param {number} mouseX
		* @param {number} mouseY
		* @param {number} z
	 *	*/
	public unproject(mouseX: number, mouseY: number, z: number) {
		var out = vec3.create();
		mat4.invert(this._tmpMatrix, this.computeWorldToScreenMatrix(this._tmpMatrix));
		return vec3.transformMat4(out, vec3.set(out, mouseX, this._height - mouseY, z), this._tmpMatrix);
	}
	
	/*	* Oblicza macierz projekcji z 3d na 2d
		* @param {number} mouseX
		* @param {number} mouseY
		* @param {number} z
	 *	*/
	private computeWorldToScreenMatrix (matrix: mat4) : mat4 {
		return mat4.mul(matrix, mat4.mul(matrix, this._viewportMatrix, this._projectionMatrix), this._viewMatrix);
	}

}

export default Camera;

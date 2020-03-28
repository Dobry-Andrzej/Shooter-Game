
class Matrix {
	private _elements: Float32Array;

	/*	* Tworzy nową instancję Matrix
		*
	 *	*/
	public constructor () {
		let elements = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
		this._elements = new Float32Array(elements);
	}
	
	/*	* Setter do elements
		* @param {Float32Array} _elements
	 *	*/
	public set elements (_elements: Float32Array) {
		this._elements = _elements;
	}
	
	/*	* Getter do elements
		* @returns {Float32Array}
	 *	*/
	public get elements () : Float32Array {
		return this._elements;
	}
	
	/*	* Nadpisuje elementy odpowiedzialne za pozycje w macierzy
		* @param {number} x
		* @param {number} y
		* @param {number} z
	 *	*/
	public setPosition (x: number, y: number, z: number) : void {
		this._elements[12] = x;
		this._elements[13] = y;
		this._elements[14] = z;
	}
	
	/*	* Generuje orthographiczną macierz
		* @param {number} left
		* @param {number} right
		* @param {number} top
		* @param {number} bottom
		* @param {number} near
		* @param {number} far
	 *	*/
	public makeOrthographic (left: number, right: number, top: number, bottom: number, near: number, far: number) : Matrix {
		let elements = this._elements;
		
		let w = 1.0 / (right - left);
		let h = 1.0 / (top - bottom);
		let p = 1.0 / (far - near);
		
		let x = (right + left) * w;
		let y = (top + bottom) * h;
		let z = (far + near) * p;

		elements[ 0 ] = 2 * w;
		elements[ 1 ] = 0;
		elements[ 2 ] = 0;
		elements[ 3 ] = 0;
		elements[ 4 ] = 0;
		elements[ 5 ] = 2 * h;
		elements[ 6 ] = 0;
		elements[ 7 ] = 0;
		elements[ 8 ] = 0;
		elements[ 9 ] = 0;
		elements[ 10 ] = -2 * p;
		elements[ 11 ] = 0;
		elements[ 12 ] = -x;
		elements[ 13 ] = -y;
		elements[ 14 ] = -z;
		elements[ 15 ] = 1;
		
		return this;
	}
	
	/*	* Generuje perspectywiczna macierz
		* @param {number} left
		* @param {number} right
		* @param {number} top
		* @param {number} bottom
		* @param {number} near
		* @param {number} far
	 *	*/
	public makePerspective (left: number, right: number, top: number, bottom: number, near: number, far: number) : Matrix {
		let elements = this._elements;
		
		let x = 2 * near / (right - left);
		var y = 2 * near / (top - bottom);

		let a = (right + left) / (right - left);
		let b = (top + bottom) / (top - bottom);
		let c = -(far + near) / (far - near);
		let d = -2 * far * near / (far - near);

		elements[ 0 ] = x;
		elements[ 1 ] = 0;
		elements[ 2 ] = 0;
		elements[ 3 ] = 0;
		elements[ 4 ] = 0;
		elements[ 5 ] = y;
		elements[ 6 ] = 0;
		elements[ 7 ] = 0;
		elements[ 8 ] = a;
		elements[ 9 ] = b;
		elements[ 10 ] = c;
		elements[ 11 ] = -1;
		elements[ 12 ] = 0;
		elements[ 13 ] = 0;
		elements[ 14 ] = d;
		elements[ 15 ] = 0;
		
		return this;
	}
}

export default Matrix;

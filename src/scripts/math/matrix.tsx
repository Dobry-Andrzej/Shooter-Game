
class Matrix {
	private _elements: Float32Array;

	/*	* Tworzy nową instancję Matrix
		*
	 *	*/
	public constructor () {
		let elements = [
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0
		];
		this._elements = new Float32Array(elements);
	}
}

export default Matrix;

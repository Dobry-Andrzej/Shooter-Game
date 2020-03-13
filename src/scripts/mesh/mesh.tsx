class Mesh {
	private _name: string;
	private _gl: WebGLRenderingContext;
	private _vertices: number[];
	private _buffer: WebGLBuffer;
	
	/*	* Tworzy nową instancję Mesh
		* @param {string} _name
		* @param {WebGLRenderingContext} _gl
	 *	*/
	public constructor (_name: string, _gl: WebGLRenderingContext) {
		this._name = _name;
		this._gl = _gl;
		this._vertices = [];
		this._buffer = _gl.createBuffer() as WebGLBuffer;
	}
	
	/*	* Setter do name
		* @param {string} _name
	 *	*/
	public set name (_name: string) {
		this._name = _name;
	}
	
	/*	* Getter do name
		* @returns {string}
	 *	*/
	public get name () : string {
		return this._name;
	}
	
	
	/*	* Setter do vertices
		* @param {number[]} _vertices
	 *	*/
	public set vertices (_vertices: number[]) {
		this._vertices = _vertices;
		
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
		this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 0, 0);
		this._gl.enableVertexAttribArray(0);
		this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(_vertices), this._gl.STATIC_DRAW);
		
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
		this._gl.disableVertexAttribArray(0);
	}
	
	/*	* Getter do vertices
		* @returns {number[]}
	 *	*/
	public get vertices () : number[] {
		return this._vertices;
	}
	
	/*	* Funkcja do zwracania vertexAmount
		* @returns {number[]}
	 *	*/
	public getVertexAmount () : number {
		return this.vertices.length / 3;
	}
	
	/*	* Rysuje buffery dla tego mesha
		*
	 *	*/
	public draw () : void {
		this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
		this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 0, 0);
		this._gl.enableVertexAttribArray(0);
		
		this._gl.drawArrays(this._gl.TRIANGLES, 0, this.getVertexAmount());
	}

}

export default Mesh;


import RenderData from './renderData';

class Mesh {
	private _name: string;
	private _gl: WebGLRenderingContext;
	private _renderData: RenderData;
	
	private _vertices: number[];
	private _colors: number[];
	
	/*	* Tworzy nową instancję Mesh
		* @param {string} _name
		* @param {WebGLRenderingContext} _gl
	 *	*/
	public constructor (_name: string, _gl: WebGLRenderingContext) {
		this._name = _name;
		this._gl = _gl;
		this._renderData = new RenderData(_gl, "standardShader");
		
		this._vertices = [];
		this._colors = [];
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
	}
	
	/*	* Getter do vertices
		* @returns {number[]}
	 *	*/
	public get vertices () : number[] {
		return this._vertices;
	}
	
	/*	* Setter do colors
		* @param {number[]} _colors
	 *	*/
	public set colors (_colors: number[]) {
		this._colors = _colors;
	}
	
	/*	* Getter do colors
		* @returns {number[]}
	 *	*/
	public get colors () : number[] {
		return this._colors;
	}
	
	/*	* Setter do renderData
		* @param {RenderData} _renderData
	 *	*/
	public set renderData (_renderData: RenderData) {
		this._renderData = _renderData;
	}
	
	/*	* Getter do renderData
		* @returns {RenderData}
	 *	*/
	public get renderData () : RenderData {
		return this._renderData;
	}
	
	/*	* Funkcja do zwracania vertexAmount
		* @returns {number[]}
	 *	*/
	public getVertexAmount () : number {
		return this._vertices.length / 3;
	}
	
	public updateMatrices () : void {
		//this._renderData.bindUniforms(this._projectionMatrix, this._modelViewMatrix);
	}
	
	public bindArrays () : void {
		this._renderData.bindVertexArray(this._vertices);
		//this._renderData.bindUniforms(this._projectionMatrix, this._modelViewMatrix);
	}
	
	/*	* Rysuje buffery dla tego mesha
		*
	 *	*/
	public draw () : void {
		this._renderData.draw(this.getVertexAmount());
	}

}

export default Mesh;

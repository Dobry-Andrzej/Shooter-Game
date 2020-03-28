
import ShaderList from '../shader/ShaderList';
import RenderData from './meshData/RenderData';
import Matrix from '../math/Matrix';

class Mesh {
	private _name: string;
	private _renderData: RenderData;
	
	private _vertices: number[];
	private _colors: number[];
	
	private _matrix: Matrix;
	
	/*	* Tworzy nową instancję Mesh
		* @param {string} _name
		* @param {WebGLRenderingContext} _gl
	 *	*/
	public constructor (_name: string, _gl: WebGLRenderingContext) {
		this._name = _name;
		this._renderData = new RenderData(_gl);
		
		this._vertices = [];
		this._colors = [];
		
		this._matrix = new Matrix();
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
	
	/*	* Funkcja do zwracania zmieniania pozycji mesha
		* @param {number} x
		* @param {number} y
		* @param {number} z
	 *	*/
	public setPosition (x: number, y: number, z: number) : void {
		this._matrix.setPosition(x, y, z);
	}
	
	/*	* Funkcja do zwracania vertexAmount
		* @returns {number[]}
	 *	*/
	public getVertexAmount () : number {
		return this._vertices.length / 3;
	}
	
	/*	* Aktualizuje macierze i binduje na nowo do uniformów
		*
	 *	*/
	public updateMatrices () : void {
		
	}
	
	/*	* Odpala shader rendering dla tego mesha
		*
	 *	*/
	public render () : void {
		ShaderList[this._renderData.shaderType].getOrCreate(this._renderData.gl).draw(this);
	}
	
	/*	* Oblicza na nowo macierze do projekcji na podstawie podanej camery
		* @param {Camera} camera
		*
	 *	*/
	private computeProjectAndModelViewMatrices () : void {
		//TODO: camera
	}

}

export default Mesh;

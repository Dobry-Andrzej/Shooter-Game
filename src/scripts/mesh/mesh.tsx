
import ShaderList from '../shader/ShaderList';
import RenderData from './meshData/RenderData';

import { mat4 } from 'gl-matrix';

class Mesh {
	private _name: string;
	private _renderData: RenderData;
	
	private _vertices: Float32Array;
	private _colors: Float32Array;
	
	private _matrix: mat4;
	
	/*	* Tworzy nową instancję Mesh
		* @param {string} name
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (name: string, gl: WebGLRenderingContext) {
		this._name = name;
		this._renderData = new RenderData(gl);
		
		this._vertices = new Float32Array(0);
		this._colors = new Float32Array(0);
		
		this._matrix = mat4.create();
	}
	
	/*	* Setter do name
		* @param {string} name
	 *	*/
	public set name (name: string) {
		this._name = name;
	}
	
	/*	* Getter do name
		* @returns {string}
	 *	*/
	public get name () : string {
		return this._name;
	}
	
	
	/*	* Setter do vertices
		* @param {Float32Array} vertices
	 *	*/
	public set vertices (vertices: Float32Array) {
		this._vertices = vertices;
	}
	
	/*	* Getter do vertices
		* @returns {Float32Array}
	 *	*/
	public get vertices () : Float32Array {
		return this._vertices;
	}
	
	/*	* Setter do colors
		* @param {Float32Array} colors
	 *	*/
	public set colors (colors: Float32Array) {
		this._colors = colors;
	}
	
	/*	* Getter do colors
		* @returns {Float32Array}
	 *	*/
	public get colors () : Float32Array {
		return this._colors;
	}
	
	/*	* Setter do renderData
		* @param {RenderData} _renderData
	 *	*/
	public set renderData (renderData: RenderData) {
		this._renderData = renderData;
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
		console.log(x, y, z);
	}
	
	/*	* Funkcja do zwracania vertexAmount
		* @returns {number[]}
	 *	*/
	public getVertexAmount () : number {
		return this._vertices.length / 3;
	}
	
	/*	* Aktualizuje wszystkie buffery na podstawie topologii
		*
	 *	*/
	public updateBuffers () : void {
		this.updateVertexBuffer();
		this.updateColorBuffer();
	}
	
	/*	* Aktualizuje vertex buffer na podstawie _vertices
		*
	 *	*/
	public updateVertexBuffer () : void {
		this._renderData.vertexBuffer.update(this._vertices, this.getVertexAmount() * 3);
	}
	
	/*	* Aktualizuje color buffer na podstawie _colors
		*
	 *	*/
	public updateColorBuffer () : void {
		this._renderData.colorBuffer.update(this._colors, this.getVertexAmount() * 3);
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

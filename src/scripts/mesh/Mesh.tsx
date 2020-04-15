
import ShaderList from '../shader/ShaderList';

import RenderData from './meshData/RenderData';
import TransformData from './meshData/TransformData';

import Camera from '../modules/Camera';

import GeoMath from '../math/GeoMath';
import { vec3, quat, mat4 } from 'gl-matrix';

class Mesh {
	private _name: string;
	private _renderData: RenderData;
	private _transformData: TransformData;
	
	private _visible: boolean;
	
	private _vertices: Float32Array;
	private _colors: Float32Array;
	
	private _matrix: mat4;
	
	private _position: vec3;
	private _rotation: quat;
	private _scale: vec3;
	
	/*	* Tworzy nową instancję Mesh
		* @param {string} name
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (name: string, gl: WebGLRenderingContext) {
		this._name = name;
		this._renderData = new RenderData(this, gl);
		this._transformData = new TransformData(this);
		
		this._visible = true;
		
		this._vertices = new Float32Array(0);
		this._colors = new Float32Array(0);
		
		this._matrix = mat4.create();
		
		this._position = vec3.create();
		this._rotation = quat.create();
		this._scale = vec3.create();
		// Skala musi być 1, bo skala 0 to troche mały objekt
		vec3.set(this._scale, 1, 1, 1);
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
	
	/*	* Setter do visible
		* @param {boolean} name
	 *	*/
	public set visible (visible: boolean) {
		this._visible = visible;
	}
	
	/*	* Getter do visible
		* @returns {boolean}
	 *	*/
	public get visible () : boolean {
		return this._visible;
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
	
	/*	* Setter do transformData
		* @param {TransformData} _renderData
	 *	*/
	public set transformData (transformData: TransformData) {
		this._transformData = transformData;
	}
	
	/*	* Getter do transformData
		* @returns {TransformData}
	 *	*/
	public get transformData () : TransformData {
		return this._transformData;
	}
	
	/*	* Funkcja do zwracania kopii objektu
		* @param {WebGLRenderingContext} gl
		* @returns {Mesh}
	 *	*/
	public clone (gl: WebGLRenderingContext) : Mesh {
		let mesh = new Mesh(this._name + "_", gl);
		
		mesh.vertices = new Float32Array(this._vertices);
		mesh.colors = new Float32Array(this._colors);
		
		return mesh;
	}
	
	/*	* Funkcja do zmieniania pozycji mesha
		* @param {number} x
		* @param {number} y
		* @param {number} z
	 *	*/
	public setPosition (x: number, y: number, z: number) : void {
		vec3.set(this._position, x, y, z);
	}
	
	/*	* Funkcja do zmieniania skali mesha
		* @param {number} x
		* @param {number} y
		* @param {number} z
	 *	*/
	public setScale (x: number, y: number, z: number) : void {
		vec3.set(this._scale, x, y, z);
	}
	
	/*	* Funkcja do zmieniania rotacji mesha
		* @param {number} x
		* @param {number} y
		* @param {number} z
	 *	*/
	public setRotation (x: number, y: number, z: number) : void {
		quat.fromEuler(this._rotation, x, y, z);
	}
	
	/*	* Funkcja do zwracania vertexAmount
		* @returns {number[]}
	 *	*/
	public getVertexAmount () : number {
		return this._vertices.length / 3;
	}
	
	/*	* Sprawdza intersekcje miedzy rayem a trójkątami
		* @param {vec3} origin
		* @param {vec3} direction
		* @param {vec3} vIntOut
		* @returns {number}
	 *	*/
	public intersectTriangles (origin: vec3, direction: vec3, vIntOut?: vec3) : number {
		let i: number;
		let v9: number;
		let v18: number;
		let distance: number;
		let smallestDistance: number = -1;
		let triangleIndex: number = -1;
		
		let vA: vec3 = vec3.create();
		let vB: vec3 = vec3.create();
		let vC: vec3 = vec3.create();
		let vInt: vec3 = vec3.create();
		
		let triangleAmount: number = this.getVertexAmount() / 3;
		
		for (i = 0; i < triangleAmount; i++) {
			v9 = i * 9;
			
			vec3.set(vA, this._vertices[v9], this._vertices[v9 + 1], this._vertices[v9 + 2]);
			vec3.set(vB, this._vertices[v9 + 3], this._vertices[v9 + 4], this._vertices[v9 + 5]);
			vec3.set(vC, this._vertices[v9 + 6], this._vertices[v9 + 7], this._vertices[v9 + 8]);
			
			distance = GeoMath.intersectTriangle(origin, direction, vA, vB, vC, vInt);
			
			if (distance == -1) continue;
			
			if (smallestDistance == -1 || smallestDistance > distance) {
				
				smallestDistance = distance;
				triangleIndex = i;
				
				if (vIntOut) {
					vec3.copy(vIntOut, vInt);
				}
			}
		}
		
		return smallestDistance;
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
	
	/*	* Aktualizuje macierze na podstawie pozycji, rotacji, skali i kamery
		*
	 *	*/
	public updateMatrices () : void {
		this._transformData.updateMatrices(this._position, this._rotation, this._scale);
	}
	
	/*	* Odpala shader rendering dla tego mesha
		* @param {Camera} camera
	 *	*/
	public render (camera: Camera) : void {
		ShaderList[this._renderData.shaderType].getOrCreate(this._renderData.gl).draw(this, camera);
	}

}

export default Mesh;

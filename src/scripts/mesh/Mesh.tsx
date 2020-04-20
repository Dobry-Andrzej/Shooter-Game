
import ShaderList from '../shader/ShaderList';

import VertexData from './meshData/VertexData';
import FaceData from './meshData/FaceData';
import RenderData from './meshData/RenderData';
import TransformData from './meshData/TransformData';
import ColorData from './meshData/ColorData';

import Camera from '../modules/Camera';

import GeoMath from '../math/GeoMath';
import { vec3, quat, mat4 } from 'gl-matrix';

class Mesh {
	private _name: string;
	
	private _vertexData: VertexData;
	private _faceData: FaceData;
	private _renderData: RenderData;
	private _transformData: TransformData;
	private _colorData: ColorData;
	
	private _visible: boolean;
	
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
		
		this._vertexData = new VertexData(this);
		this._faceData = new FaceData(this);
		this._renderData = new RenderData(this, gl);
		this._transformData = new TransformData(this);
		this._colorData = new ColorData(this);
		
		this._visible = true;
		
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
		* @param {boolean} visible
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
	
	/*	* Setter do position
		* @param {vec3} position
	 *	*/
	public set position (position: vec3) {
		this._position = position;
	}
	
	/*	* Getter do position
		* @returns {vec3}
	 *	*/
	public get position () : vec3 {
		return this._position;
	}
	
	/*	* Setter do scale
		* @param {vec3} scale
	 *	*/
	public set scale (scale: vec3) {
		this._scale = scale;
	}
	
	/*	* Getter do scale
		* @returns {vec3}
	 *	*/
	public get scale () : vec3 {
		return this._scale;
	}
	
	/*	* Setter do rotation
		* @param {quat} rotation
	 *	*/
	public set rotation (rotation: quat) {
		this._rotation = rotation;
	}
	
	/*	* Getter do scale
		* @returns {vec3}
	 *	*/
	public get rotation () : quat {
		return this._rotation;
	}
	
	/*	* Setter do vertexData
		* @param {VertexData} vertexData
	 *	*/
	public set vertexData (vertexData: VertexData) {
		this._vertexData = vertexData;
	}
	
	/*	* Getter do vertexData
		* @returns {VertexData}
	 *	*/
	public get vertexData () : VertexData {
		return this._vertexData;
	}
	
	/*	* Setter do faceData
		* @param {FaceData} faceData
	 *	*/
	public set faceData (faceData: FaceData) {
		this._faceData = faceData;
	}
	
	/*	* Getter do faceData
		* @returns {FaceData}
	 *	*/
	public get faceData () : FaceData {
		return this._faceData;
	}
	
	/*	* Setter do renderData
		* @param {RenderData} renderData
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
		* @param {TransformData} transformData
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
	
	/*	* Setter do colorData
		* @param {ColorData} colorData
	 *	*/
	public set colorData (colorData: ColorData) {
		this._colorData = colorData;
	}
	
	/*	* Getter do colorData
		* @returns {ColorData}
	 *	*/
	public get colorData () : ColorData {
		return this._colorData;
	}
	
	/*	* Funkcja do zwracania kopii objektu
		* @param {WebGLRenderingContext} gl
		* @returns {Mesh}
	 *	*/
	public clone (gl: WebGLRenderingContext) : Mesh {
		let mesh = new Mesh(this._name, gl);
		
		mesh.visible = this._visible;
		
		mesh.position = this._position;
		mesh.scale = this._scale;
		mesh.rotation = this._rotation;
		
		mesh.vertexData = this._vertexData.clone(mesh);
		mesh.faceData = this._faceData.clone(mesh);
		mesh.renderData = this._renderData.clone(mesh, gl);
		mesh.transformData = this._transformData.clone(mesh);
		mesh.colorData = this._colorData.clone(mesh);
		
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
	
	/*	* Sprawdza intersekcje miedzy rayem a trójkątami
		* @param {vec3} origin
		* @param {vec3} direction
		* @param {vec3} vIntOut
		* @returns {number}
	 *	*/
	public intersect (origin: vec3, direction: vec3, vIntOut?: vec3) : number {
		let i: number;
		let f4: number;
		let v3: number;
		
		let distance: number;
		let smallestDistance: number = -1;
		
		let vA: vec3 = vec3.create();
		let vB: vec3 = vec3.create();
		let vC: vec3 = vec3.create();
		let vInt: vec3 = vec3.create();
		
		let faces: Int32Array = this._faceData.faces;
		let vertices: Float32Array = this._vertexData.vertices;
		
		let faceAmount: number = this._faceData.getFaceAmount();
		
		for (i = 0; i < faceAmount; i++) {
			f4 = i * 4;
			
			v3 = faces[f4] * 3;
			vec3.set(vA, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
			v3 = faces[f4 + 1] * 3;
			vec3.set(vB, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
			v3 = faces[f4 + 2] * 3;
			vec3.set(vC, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
			
			distance = GeoMath.intersectTriangle(origin, direction, vA, vB, vC, vInt);
			
			if (faces[f4 + 3] >= 0 && distance == -1) {
				v3 = faces[f4] * 3;
				vec3.set(vA, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
				v3 = faces[f4 + 2] * 3;
				vec3.set(vB, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
				v3 = faces[f4 + 3] * 3;
				vec3.set(vC, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
			
				distance = GeoMath.intersectTriangle(origin, direction, vA, vB, vC, vInt);
			}
			
			if (distance == -1) continue;
			
			if (smallestDistance == -1 || smallestDistance > distance) {
				
				smallestDistance = distance;
				
				if (vIntOut) {
					vec3.copy(vIntOut, vInt);
				}
			}
		}
		
		return smallestDistance;
	}
	
	/*	* Aktualizuje wszystkie buffery na podstawie tablic do renderingu
		*
	 *	*/
	public updateBuffers () : void {
		this._renderData.updateVertexBuffer();
		this._renderData.updateColorBuffer();
		this._renderData.updateNormalBuffer();
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

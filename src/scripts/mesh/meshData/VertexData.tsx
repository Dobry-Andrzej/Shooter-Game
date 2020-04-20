
import Mesh from '../Mesh';

import GeoMath from '../../math/GeoMath';
import { vec3 } from 'gl-matrix';

class VertexData {
	private _mesh: Mesh;
	
	private _vertices: Float32Array;
	private _vertexColors: Float32Array;
	private _vertexNormals: Float32Array;
	
	private _vertexFaceStartCount: Uint32Array;
	private _vertexFaceIds: Uint32Array;
	
	/*	* Tworzy nową instancję VertexData
		* @param {Mesh) mesh
	 *	*/
	public constructor (mesh: Mesh) {
		this._mesh = mesh;
		
		this._vertices = new Float32Array(0);
		this._vertexColors = new Float32Array(0);
		this._vertexNormals = new Float32Array(0);
		
		this._vertexFaceStartCount = new Uint32Array(0);
		this._vertexFaceIds = new Uint32Array(0);
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
	
	/*	* Setter do vertexColors
		* @param {Float32Array} vertexColors
	 *	*/
	public set vertexColors (vertexColors: Float32Array) {
		this._vertexColors = vertexColors;
	}
	
	/*	* Getter do vertexColors
		* @returns {Float32Array}
	 *	*/
	public get vertexColors () : Float32Array {
		return this._vertexColors;
	}
	
	/*	* Setter do vertexNormals
		* @param {Float32Array} vertexNormals
	 *	*/
	public set vertexNormals (vertexNormals: Float32Array) {
		this._vertexNormals = vertexNormals;
	}
	
	/*	* Getter do vertexNormals
		* @returns {Float32Array}
	 *	*/
	public get vertexNormals () : Float32Array {
		return this._vertexNormals;
	}
	
	/*	* Setter do vertexFaceStartCount
		* @param {Uint32Array} vertexFaceStartCount
	 *	*/
	public set vertexFaceStartCount (vertexFaceStartCount: Uint32Array) {
		this._vertexFaceStartCount = vertexFaceStartCount;
	}
	
	/*	* Getter do vertexFaceStartCount
		* @returns {Uint32Array}
	 *	*/
	public get vertexFaceStartCount () : Uint32Array {
		return this._vertexFaceStartCount;
	}
	
	/*	* Setter do vertexFaceIds
		* @param {Uint32Array} vertexFaceIds
	 *	*/
	public set vertexFaceIds (vertexFaceIds: Uint32Array) {
		this._vertexFaceIds = vertexFaceIds;
	}
	
	/*	* Getter do vertexFaceIds
		* @returns {Uint32Array}
	 *	*/
	public get vertexFaceIds () : Uint32Array {
		return this._vertexFaceIds;
	}
	
	/*	* Funkcja do zwracania kopii VertexData
		* @param {Mesh} mesh
		* @returns {VertexData}
	 *	*/
	public clone (mesh: Mesh) : VertexData {
		var vertexData = new VertexData(mesh);
		
		vertexData.vertices = new Float32Array(this._vertices);
		vertexData.vertexColors = new Float32Array(this._vertexColors);
		vertexData.vertexNormals = new Float32Array(this._vertexNormals);
		
		return vertexData;
	}
	
	/*	* Funkcja do zwracania ilosci vertexów
		* @param {Mesh) mesh
	 *	*/
	public getVertexAmount () : number {
		return this._vertices.length / 3;
	}
	
	/*	* Funkcja do obliczania vertex face ringów
		* @param {Mesh) mesh
	 *	*/
	public computeVertexFaceRings () : void {
		let i: number,
			f4: number, v1: number, v2: number,
			vertexFaceIds: Uint32Array,
			vertexAmount = this.getVertexAmount(),
			vertices = this._vertices,
			faceAmount = this._mesh.faceData.getFaceAmount(),
			faces = this._mesh.faceData.faces,
			vertexFaceCounts = new Uint32Array(vertexAmount),
			vertexFaceStartCount = new Uint32Array(vertexAmount * 2),
			vertexFaceCount: number = 0;
			
		for (i = 0; i < faceAmount; i++) {
			f4 = i * 4;
			
			vertexFaceCounts[faces[f4]]++;
			vertexFaceCounts[faces[f4 + 1]]++;
			vertexFaceCounts[faces[f4 + 2]]++;
			
			if (faces[f4 + 3] >= 0) {
				vertexFaceCounts[faces[f4 + 3]]++;
				vertexFaceCount += 4;
			} else {
				vertexFaceCount += 3;
			}
		}
		
		vertexFaceIds = new Uint32Array(vertexFaceCount);
		
		vertexFaceCount = 0;
		for (i = 0; i < vertexAmount; i++) {
			v2 = i * 2;
			
			vertexFaceStartCount[v2] = vertexFaceCount;
			vertexFaceStartCount[v2 + 1] = vertexFaceCounts[i];
			
			vertexFaceCount += vertexFaceCounts[i];
		}
		
		for (i = 0; i < faceAmount; i++) {
			f4 = i * 4;
			
			v1 = faces[f4];
			v2 = v1 * 2;
			vertexFaceIds[vertexFaceStartCount[v2] + (--vertexFaceCounts[v1])] = i;
			
			v1 = faces[f4 + 1];
			v2 = v1 * 2;
			vertexFaceIds[vertexFaceStartCount[v2] + (--vertexFaceCounts[v1])] = i;
			
			v1 = faces[f4 + 2];
			v2 = v1 * 2;
			vertexFaceIds[vertexFaceStartCount[v2] + (--vertexFaceCounts[v1])] = i;
			
			if (faces[f4 + 3] >= 0) {
				v1 = faces[f4 + 3];
				v2 = v1 * 2;
				vertexFaceIds[vertexFaceStartCount[v2] + (--vertexFaceCounts[v1])] = i;
			}
		}
		
		this._vertexFaceStartCount = vertexFaceStartCount;
		this._vertexFaceIds = vertexFaceIds;
	}
	
	/*	* Funkcja do obliczania normalnych vertexów
		* @param {Mesh) mesh
	 *	*/
	public computeVertexNormals () : void {
		let i: number, j: number,
			v2: number, v3: number, f4: number,
			start: number, end: number,
			vertexAmount = this.getVertexAmount(),
			vertices = this._vertices,
			vertexFaceStartCount = this._vertexFaceStartCount,
			vertexFaceIds = this._vertexFaceIds,
			faces = this._mesh.faceData.faces,
			vertexNormals = new Float32Array(vertexAmount * 3),
			vertexNormal: vec3 = vec3.create(),
			vA: vec3 = vec3.create(),
			vB: vec3 = vec3.create(),
			vC: vec3 = vec3.create();
			
		for (i = 0; i < vertexAmount; i++) {
			vec3.set(vertexNormal, 0, 0, 0);
			
			v2 = i * 2;
			
			start = vertexFaceStartCount[v2];
			end = start + vertexFaceStartCount[v2 + 1];
			for (j = start; j < end; j++) {
				f4 = vertexFaceIds[j] * 4;
				
				v3 = faces[f4] * 3;
				vec3.set(vA, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
				
				v3 = faces[f4 + 1] * 3;
				vec3.set(vB, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
				
				v3 = faces[f4 + 2] * 3;
				vec3.set(vC, vertices[v3], vertices[v3 + 1], vertices[v3 + 2]);
				
				vec3.add(vertexNormal, vertexNormal, GeoMath.computeNormal(vA, vB, vC));
			}
			
			vec3.normalize(vertexNormal, vertexNormal);
			
			v3 = i * 3;
			
			vertexNormals[v3] = vertexNormal[0];
			vertexNormals[v3 + 1] = vertexNormal[1];
			vertexNormals[v3 + 2] = vertexNormal[2];
		}
		
		this._vertexNormals = vertexNormals;
	}
	
}

export default VertexData;

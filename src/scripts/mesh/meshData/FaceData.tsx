
import Mesh from '../Mesh';

class FaceData {
	private _mesh: Mesh;
	
	private _faces: Int32Array;
	private _triangles: Uint32Array;
	
	/*	* Tworzy nową instancję FaceData
		* @param {Mesh) mesh
	 *	*/
	public constructor (mesh: Mesh) {
		this._mesh = mesh;
		
		this._faces = new Int32Array(0);
		this._triangles = new Uint32Array(0);
	}
	
	/*	* Setter do faces
		* @param {Float32Array} faces
	 *	*/
	public set faces (faces: Int32Array) {
		this._faces = faces;
	}
	
	/*	* Getter do faces
		* @returns {Int32Array}
	 *	*/
	public get faces () : Int32Array {
		return this._faces;
	}
	
	/*	* Setter do triangles
		* @param {Uint32Array} triangles
	 *	*/
	public set triangles (triangles: Uint32Array) {
		this._triangles = triangles;
	}
	
	/*	* Getter do triangles
		* @returns {Uint32Array}
	 *	*/
	public get triangles () : Uint32Array {
		return this._triangles;
	}
	
	/*	* Funkcja do zwracania kopii FaceData
		* @param {Mesh} mesh
		* @returns {FaceData}
	 *	*/
	public clone (mesh: Mesh) : FaceData {
		var faceData = new FaceData(mesh);
		
		faceData.faces = new Int32Array(this._faces);
		faceData.triangles = new Uint32Array(this._triangles);
		
		return faceData;
	}
	
	/*	* Funkcja do zwracania ilosci face'ów
		* @param {Mesh) mesh
	 *	*/
	public getFaceAmount () : number {
		return this._faces.length / 4;
	}
	
	/*	* Funkcja do zwracania ilosci trójkątów
		* @param {Mesh) mesh
	 *	*/
	public getTriangleAmount () : number {
		return this._triangles.length / 3;
	}
	
	/*	* Funkcja do populacji geometrii z coordynatów trójkątów
		* @param {Float32Array} coords
	 *	*/
	public populateFromTriangleCoords (coords: Float32Array) : void {
		let i: number,
			t3: number, t9: number, f4: number, v3: number,
			key: string, vertexIndex: number,
			faceAmount: number = coords.length / 3,
			faces = new Int32Array(4 * coords.length / 3),
			triangles = new Uint32Array(coords.length),
			vertexCount: number = 0,
			vertices = new Float32Array(coords.length),
			vertexMap: {[key: string]: number} = {},
			upscale: number = 1e5;
		
		for (i = 0; i < faceAmount; i++) {
			t3 = i * 3;
			t9 = i * 9;
			f4 = i * 4;
			
			key = Math.round(coords[t9] * upscale) + ";"
				+ Math.round(coords[t9 + 1] * upscale) + ";"
				+ Math.round(coords[t9 + 2] * upscale);
				
			if (vertexMap[key] == undefined) {
				vertexIndex = vertexCount++;
				v3 = vertexIndex * 3;
				
				vertices[v3] = coords[t9];
				vertices[v3 + 1] = coords[t9 + 1];
				vertices[v3 + 2] = coords[t9 + 2];
				
				vertexMap[key] = vertexIndex;
			} else {
				vertexIndex = vertexMap[key];
			}
			
			faces[f4] = vertexIndex;
			
			key = Math.round(coords[t9 + 3] * upscale) + ";"
				+ Math.round(coords[t9 + 4] * upscale) + ";"
				+ Math.round(coords[t9 + 5] * upscale);
				
			if (vertexMap[key] == undefined) {
				vertexIndex = vertexCount++;
				v3 = vertexIndex * 3;
				
				vertices[v3] = coords[t9 + 3];
				vertices[v3 + 1] = coords[t9 + 4];
				vertices[v3 + 2] = coords[t9 + 5];
				
				vertexMap[key] = vertexIndex;
			} else {
				vertexIndex = vertexMap[key];
			}
			
			faces[f4 + 1] = vertexIndex;
			
			key = Math.round(coords[t9 + 6] * upscale) + ";"
				+ Math.round(coords[t9 + 7] * upscale) + ";"
				+ Math.round(coords[t9 + 8] * upscale);
				
			if (vertexMap[key] == undefined) {
				vertexIndex = vertexCount++;
				v3 = vertexIndex * 3;
				
				vertices[v3] = coords[t9 + 6];
				vertices[v3 + 1] = coords[t9 + 7];
				vertices[v3 + 2] = coords[t9 + 8];
				
				vertexMap[key] = vertexIndex;
			} else {
				vertexIndex = vertexMap[key];
			}
			
			faces[f4 + 2] = vertexIndex;
			faces[f4 + 3] = -1;
			
			triangles[t3] = faces[f4];
			triangles[t3 + 1] = faces[f4 + 1];
			triangles[t3 + 2] = faces[f4 + 2];
		}
		
		this._mesh.vertexData.vertices = new Float32Array(vertices.subarray(0, vertexCount * 3));
		this._mesh.vertexData.vertexColors = new Float32Array(vertexCount * 3);
		this._mesh.vertexData.vertexNormals = new Float32Array(vertexCount * 3);
		
		this._mesh.faceData.faces = faces;
		this._mesh.faceData.triangles = triangles;
	}
	
	/*	* Funkcja do populacji trójkątów z geometrii
		* @param {Float32Array} coords
	 *	*/
	public computeTriangles () : void {
		let i: number,
			t3: number, f4: number,
			faceAmount: number = this.getFaceAmount(),
			faces: Int32Array = this._faces,
			triangles = new Uint32Array(faceAmount * 3 * 2),
			triangleCount: number = 0;
			
		for (i = 0; i < faceAmount; i++) {
			f4 = i * 4;
			
			t3 = triangleCount * 3;
			
			triangles[t3] = faces[f4];
			triangles[t3 + 1] = faces[f4 + 1];
			triangles[t3 + 2] = faces[f4 + 2];
			
			triangleCount++;
			
			if (faces[f4 + 3] >= 0) {
				
				t3 = triangleCount * 3;
				
				triangles[t3] = faces[f4];
				triangles[t3 + 1] = faces[f4 + 2];
				triangles[t3 + 2] = faces[f4 + 3];
				
				triangleCount++;
			
			}
		}
		
		this.triangles = new Uint32Array(triangles.subarray(0, triangleCount * 3));
	}
	
}

export default FaceData;

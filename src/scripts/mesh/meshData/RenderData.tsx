
import Mesh from '../Mesh';
import Buffer from '../../render/Buffer';

class RenderData {
	private _mesh: Mesh;
	private _gl: WebGLRenderingContext;
	
	private _verticesToRender: Float32Array;
	private _colorsToRender: Float32Array;
	private _normalsToRender: Float32Array;
	
	private _vertexBuffer: Buffer;
	private _colorBuffer: Buffer;
	private _normalBuffer: Buffer;
	
	private _useFaceColors: boolean;
	
	private _shaderType: number;
	
	/*	* Tworzy nową instancję RenderData
		* @param {Mesh) mesh
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (mesh: Mesh, gl: WebGLRenderingContext) {
		this._mesh = mesh;
		this._gl = gl;
		
		this._verticesToRender = new Float32Array(0);
		this._colorsToRender = new Float32Array(0);
		this._normalsToRender = new Float32Array(0);
		
		this._vertexBuffer = new Buffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
		this._colorBuffer = new Buffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
		this._normalBuffer = new Buffer(gl, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
		
		this._useFaceColors = false;
		
		this._shaderType = 0;
	}
	
	/*	* Setter do gl
		* @param {WebGLRenderingContext} gl
	 *	*/
	public set gl (gl: WebGLRenderingContext) {
		this._gl = gl;
	}
	
	/*	* Getter do gl
		* @returns {WebGLRenderingContext}
	 *	*/
	public get gl () : WebGLRenderingContext {
		return this._gl;
	}
	
	/*	* Setter do verticesToRender
		* @param {Float32Array} verticesToRender
	 *	*/
	public set verticesToRender (verticesToRender: Float32Array) {
		this._verticesToRender = verticesToRender;
	}
	
	/*	* Getter do verticesToRender
		* @returns {Float32Array}
	 *	*/
	public get verticesToRender () : Float32Array {
		return this._verticesToRender;
	}
	
	/*	* Setter do colorsToRender
		* @param {Float32Array} colorsToRender
	 *	*/
	public set colorsToRender (colorsToRender: Float32Array) {
		this._colorsToRender = colorsToRender;
	}
	
	/*	* Getter do colorsToRender
		* @returns {Float32Array}
	 *	*/
	public get colorsToRender () : Float32Array {
		return this._colorsToRender;
	}
	
	/*	* Setter do normalsToRender
		* @param {Float32Array} normalsToRender
	 *	*/
	public set normalsToRender (normalsToRender: Float32Array) {
		this._normalsToRender = normalsToRender;
	}
	
	/*	* Getter do normalsToRender
		* @returns {Float32Array}
	 *	*/
	public get normalsToRender () : Float32Array {
		return this._normalsToRender;
	}
	
	/*	* Setter do vertexBuffer
		* @param {Buffer} buffer
	 *	*/
	public set vertexBuffer (vertexBuffer: Buffer) {
		this._vertexBuffer = vertexBuffer;
	}
	
	/*	* Getter do vertexBuffer
		* @returns {Buffer}
	 *	*/
	public get vertexBuffer () : Buffer {
		return this._vertexBuffer;
	}
	
	/*	* Setter do colorBuffer
		* @param {Buffer} buffer
	 *	*/
	public set colorBuffer (colorBuffer: Buffer) {
		this._colorBuffer = colorBuffer;
	}
	
	/*	* Getter do colorBuffer
		* @returns {Buffer}
	 *	*/
	public get colorBuffer () : Buffer {
		return this._colorBuffer;
	}
	
	/*	* Setter do normalBuffer
		* @param {Buffer} buffer
	 *	*/
	public set normalBuffer (normalBuffer: Buffer) {
		this._normalBuffer = normalBuffer;
	}
	
	/*	* Getter do normalBuffer
		* @returns {Buffer}
	 *	*/
	public get normalBuffer () : Buffer {
		return this._normalBuffer;
	}
	
	/*	* Setter do useFaceColors
		* @param {boolean} useFaceColors
	 *	*/
	public set useFaceColors (useFaceColors: boolean) {
		this._useFaceColors = useFaceColors;
	}
	
	/*	* Getter do useFaceColors
		* @returns {boolean}
	 *	*/
	public get useFaceColors () : boolean {
		return this._useFaceColors;
	}
	
	/*	* Setter do shaderType
		* @param {number} shaderType
	 *	*/
	public set shaderType (shaderType: number) {
		this._shaderType = shaderType;
	}
	
	/*	* Getter do shaderType
		* @returns {number}
	 *	*/
	public get shaderType () : number {
		return this._shaderType;
	}
	
	/*	* Funkcja do zwracania kopii RenderData
		* @param {Mesh} mesh
		* @param {WebGLRenderingContext} gl
		* @returns {RenderData}
	 *	*/
	public clone (mesh: Mesh, gl: WebGLRenderingContext) : RenderData {
		var renderData = new RenderData(mesh, gl);
		
		renderData.verticesToRender = new Float32Array(this._verticesToRender);
		renderData.colorsToRender = new Float32Array(this._colorsToRender);
		renderData.normalsToRender = new Float32Array(this._normalsToRender);
		
		renderData.shaderType = this._shaderType;
		
		return renderData;
	}
	
	/*	* Funkcja do zwracania ilosc explodowanych vertexów
		* @returns {number}
	 *	*/
	public getVertexToRenderAmount () : number {
		return this._verticesToRender.length / 3;
	}
	
	/*	* Funkcja do populacji tablic renderingowych
		*
	 *	*/
	public updateRenderingArrays () : void {
		let i: number,
			t3: number, t9: number, v3: number,
			vertices: Float32Array = this._mesh.vertexData.vertices,
			vertexColors: Float32Array = this._mesh.vertexData.vertexColors,
			vertexNormals: Float32Array = this._mesh.vertexData.vertexNormals,
			triangleAmount: number = this._mesh.faceData.getTriangleAmount(),
			triangles: Uint32Array = this._mesh.faceData.triangles,
			triangleColors: Float32Array = this._mesh.faceData.triangleColors,
			coords = new Float32Array(triangleAmount * 9),
			colors = new Float32Array(triangleAmount * 9),
			normals = new Float32Array(triangleAmount * 9);
			
		for (i = 0; i < triangleAmount; i++) {
			t3 = i * 3;
			t9 = i * 9;
			
			v3 = triangles[t3] * 3;
			coords[t9] = vertices[v3];
			coords[t9 + 1] = vertices[v3 + 1];
			coords[t9 + 2] = vertices[v3 + 2];
			
			if (this._useFaceColors == true) {
				colors[t9] = triangleColors[t3];
				colors[t9 + 1] = triangleColors[t3 + 1];
				colors[t9 + 2] = triangleColors[t3 + 2];
			} else {
				colors[t9] = vertexColors[v3];
				colors[t9 + 1] = vertexColors[v3 + 1];
				colors[t9 + 2] = vertexColors[v3 + 2];
			}
			
			normals[t9] = vertexNormals[v3];
			normals[t9 + 1] = vertexNormals[v3 + 1];
			normals[t9 + 2] = vertexNormals[v3 + 2];
			
			v3 = triangles[t3 + 1] * 3;
			coords[t9 + 3] = vertices[v3];
			coords[t9 + 4] = vertices[v3 + 1];
			coords[t9 + 5] = vertices[v3 + 2];
			
			if (this._useFaceColors == true) {
				colors[t9 + 3] = triangleColors[t3];
				colors[t9 + 4] = triangleColors[t3 + 1];
				colors[t9 + 5] = triangleColors[t3 + 2];
			} else {
				colors[t9 + 3] = vertexColors[v3];
				colors[t9 + 4] = vertexColors[v3 + 1];
				colors[t9 + 5] = vertexColors[v3 + 2];
			}
			
			normals[t9 + 3] = vertexNormals[v3];
			normals[t9 + 4] = vertexNormals[v3 + 1];
			normals[t9 + 5] = vertexNormals[v3 + 2];
			
			v3 = triangles[t3 + 2] * 3;
			coords[t9 + 6] = vertices[v3];
			coords[t9 + 7] = vertices[v3 + 1];
			coords[t9 + 8] = vertices[v3 + 2];
			
			if (this._useFaceColors == true) {
				colors[t9 + 6] = triangleColors[t3];
				colors[t9 + 7] = triangleColors[t3 + 1];
				colors[t9 + 8] = triangleColors[t3 + 2];
			} else {
				colors[t9 + 6] = vertexColors[v3];
				colors[t9 + 7] = vertexColors[v3 + 1];
				colors[t9 + 8] = vertexColors[v3 + 2];
			}
			
			normals[t9 + 6] = vertexNormals[v3];
			normals[t9 + 7] = vertexNormals[v3 + 1];
			normals[t9 + 8] = vertexNormals[v3 + 2];
		}
		
		this._verticesToRender = coords;
		this._colorsToRender = colors;
		this._normalsToRender = normals;
	}
	
	/*	* Aktualizuje vertex buffer na podstawie _verticesToRender
		*
	 *	*/
	public updateVertexBuffer () : void {
		this._vertexBuffer.update(this._verticesToRender, this.getVertexToRenderAmount() * 3);
	}
	
	/*	* Aktualizuje color buffer na podstawie _colorsToRender
		*
	 *	*/
	public updateColorBuffer () : void {
		this._colorBuffer.update(this._colorsToRender, this.getVertexToRenderAmount() * 3);
	}
	
	/*	* Aktualizuje normalBuffer na podstawie _normalsToRender
		*
	 *	*/
	public updateNormalBuffer () : void {
		this._normalBuffer.update(this._normalsToRender, this.getVertexToRenderAmount() * 3);
	}
	
}

export default RenderData;

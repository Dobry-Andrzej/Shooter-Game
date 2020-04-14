
import Mesh from '../Mesh';
import Buffer from '../../render/Buffer';

class RenderData {
	private _mesh: Mesh;
	private _gl: WebGLRenderingContext;
	
	private _vertexBuffer: Buffer;
	private _colorBuffer: Buffer;
	
	private _shaderType: number;
	
	/*	* Tworzy nową instancję RenderData
		* @param {Mesh) mesh
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (mesh: Mesh, gl: WebGLRenderingContext) {
		this._mesh = mesh;
		this._gl = gl;
		
		this._vertexBuffer = new Buffer(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
		this._colorBuffer = new Buffer(gl, gl.ARRAY_BUFFER, gl.DYNAMIC_DRAW);
		
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
		this._vertexBuffer = colorBuffer;
	}
	
	/*	* Getter do colorBuffer
		* @returns {Buffer}
	 *	*/
	public get colorBuffer () : Buffer {
		return this._colorBuffer;
	}
	
	/*	* Setter do shaderType
		* @param {number} shaderType
	 *	*/
	public set shaderType (_shaderType: number) {
		this._shaderType = _shaderType;
	}
	
	/*	* Getter do shaderType
		* @returns {number}
	 *	*/
	public get shaderType () : number {
		return this._shaderType;
	}
	
}

export default RenderData;

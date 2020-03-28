
import Buffer from '../../render/Buffer';

class RenderData {
	private _gl: WebGLRenderingContext;
	
	private _vertexBuffer: Buffer;
	private _colorBuffer: Buffer;
	
	private _shaderType: number;
	
	/*	* Tworzy nową instancję RenderData
		* @param {WebGLRenderingContext) gl
	 *	*/
	public constructor (gl: WebGLRenderingContext) {
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
	
	/*	* Getter do gl
		* @returns {Buffer}
	 *	*/
	public get vertexBuffer () : Buffer {
		return this._vertexBuffer;
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

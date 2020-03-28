
import Mesh from '../Mesh';

class RenderData {
	private _gl: WebGLRenderingContext;
	
	private _vertexBuffer: WebGLBuffer;
	private _colorBuffer: WebGLBuffer;
	
	private _shaderType: number;
	
	/*	* Tworzy nową instancję RenderData
		* @param {Mesh) _mesh
	 *	*/
	public constructor (_gl: WebGLRenderingContext) {
		this._gl = _gl;
		
		this._vertexBuffer = _gl.createBuffer() as WebGLBuffer;
		this._colorBuffer = _gl.createBuffer() as WebGLBuffer;
		
		this._shaderType = 0;
	}
	
	/*	* Setter do gl
		* @param {WebGLRenderingContext} _main
	 *	*/
	public set gl (_gl: WebGLRenderingContext) {
		this._gl = _gl;
	}
	
	/*	* Getter do gl
		* @returns {WebGLRenderingContext}
	 *	*/
	public get gl () : WebGLRenderingContext {
		return this._gl;
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

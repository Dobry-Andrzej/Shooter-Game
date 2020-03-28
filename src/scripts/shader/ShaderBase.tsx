
import Mesh from './../mesh/Mesh';

class ShaderBase {
	private _vertexSource: string;
	private _fragmentSource: string;
	
	private _program: WebGLProgram | null;
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
		this._vertexSource = ``;
		this._fragmentSource = ``;
		
		this._program = null;
	}
	
	/*	* Setter do vertexSource
		* @param {string} _vertexSource
	 *	*/
	public set vertexSource (_vertexSource: string) {
		this._vertexSource = _vertexSource;
	}
	
	/*	* Getter do vertexSource
		* @returns {string}
	 *	*/
	public get vertexSource () : string {
		return this._vertexSource;
	}
	
	/*	* Setter do fragmentSource
		* @param {string} _fragmentSource
	 *	*/
	public set fragmentSource (_fragmentSource: string) {
		this._fragmentSource = _fragmentSource;
	}
	
	/*	* Getter do fragmentSource
		* @returns {string}
	 *	*/
	public get fragmentSource () : string {
		return this._fragmentSource;
	}
	
	/*	* Funkcja do inicjowania webgl programu lub zwracania go jezeli się to juz stało
		* @param {WebGLRenderingContext} gl
		* @returns ShaderBase
	 *	*/
	public getOrCreate (gl: WebGLRenderingContext) : ShaderBase {
		if (this._program) {
			return this;
		}
		let vertexShader = this.loadShader(gl, this._vertexSource, gl.VERTEX_SHADER);
		let fragmentShader = this.loadShader(gl, this._fragmentSource, gl.FRAGMENT_SHADER);
		
		this._program = this.createProgram(gl, vertexShader, fragmentShader);
		
		
		
		return this;
	}
	
	/*	* Funkcja do rysowania mesha uzywajac tego shadera
		* @param {Mesh} mesh
	 *	*/
	public draw(mesh: Mesh) : void {
		let gl = mesh.renderData.gl;
		
		gl.useProgram(this._program);
		
		
	}
	
	/*	* Genertuje program i zalacza do niego shadery
		* @param {WebGLRenderingContext} gl
		* @param {WebGLShader} vertexShader
		* @param {WebGLShader} fragmentShader
	 *	*/
	private createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) : WebGLProgram {
		let program = gl.createProgram() as WebGLProgram;
		
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		
		gl.linkProgram(program);
		
		return program;
	}
	
	/*	* Generuje shadery, laduje do nich kod i kompiluje
		* @param {WebGLRenderingContext} gl
		* @param {String} source
		* @param {Number} type
	 *	*/
	private loadShader(gl: WebGLRenderingContext, source: string, type: number) : WebGLShader {
		let shader = gl.createShader(type) as WebGLShader;
		
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		
		return shader;
	}
}

export default ShaderBase;

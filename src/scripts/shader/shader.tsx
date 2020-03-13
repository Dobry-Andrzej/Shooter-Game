import App from '../app';
import StandardShader from './standardShader';

class Shader {
	private _main: App;
	private _name: string;
	private _program: WebGLProgram;
	
	/*	* Tworzy nową instancję Shader
		* @param {App} main
		* @param {string} name
	 *	*/
	public constructor (_main: App, _name: string) {
		this._main = _main;
		
		this._name = _name;
		
		let gl = this.main.gl;
		
		let standardShader = new StandardShader();
		
		let vertexShader = this.loadShader(standardShader.getVertexSource(), gl.VERTEX_SHADER);
		let fragmentShader = this.loadShader(standardShader.getFragmentSource(), gl.FRAGMENT_SHADER);
		
		this._program = this.createProgram(vertexShader, fragmentShader);
	}
	
	/*	* Setter do main
		* @param {App} _main
	 *	*/
	public set main (_main: App) {
		this._main = _main;
	}
	
	/*	* Getter do main
		* @returns {App}
	 *	*/
	public get main () : App {
		return this._main;
	}
	
	/*	* Setter do name
		* @param {string} _name
	 *	*/
	public set name (_name: string) {
		this._name = _name;
	}
	
	/*	* Getter do main
		* @returns {string}
	 *	*/
	public get name () : string {
		return this._name;
	}
	
	/*	* Podpina program do kontekstu
		*
	 *	*/
	public use () : void {
		var gl = this.main.gl;
		
		gl.useProgram(this._program);
	}
	
	/*	* Generuje shadery, laduje do nich kod i kompiluje
		* @param {String} source
		* @param {Number} type
	 *	*/
	private loadShader(source: string, type: number) : WebGLShader {
		let gl = this.main.gl;
		let shader = gl.createShader(type) as WebGLShader;
		
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		
		return shader;
	}
	
	/*	* Genertuje program i zalacza do niego shadery
		* @param {WebGLShader} vertexShader
		* @param {WebGLShader} fragmentShader
	 *	*/
	private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) : WebGLProgram {
		let gl = this.main.gl;
		let program = gl.createProgram() as WebGLProgram;
		
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		
		gl.linkProgram(program);
		
		return program;
	}
}

export default Shader;

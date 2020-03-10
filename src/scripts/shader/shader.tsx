import App from '../app';
import StandardShader from './standardShader';

class Shader {
	private main: App;
	private name: string;
	private program: WebGLProgram;
	
	/*	* Tworzy nową instancję Shader
		* @param {App} main
		* @param {string} name
		* @param {string} vertexSource
		* @param {string} fragmentSource
	 *	*/
	public constructor (main: App, name: string) {
		this.main = main;
		
		this.name = name;
		
		let gl = this.main.getGl();
		
		let standardShader = new StandardShader();
		
		let vertexShader = this.loadShader(standardShader.getVertexSource(), gl.VERTEX_SHADER);
		let fragmentShader = this.loadShader(standardShader.getFragmentSource(), gl.FRAGMENT_SHADER);
		
		this.program = this.createProgram(vertexShader, fragmentShader);
	}
	
	/*	* Podpina program do kontekstu
		*
	 *	*/
	public use () : void {
		var gl = this.main.getGl();
		
		gl.useProgram(this.program);
	}
	
	/*	* Generuje shadery, laduje do nich kod i kompiluje
		* @param {String} source
		* @param {Number} type
	 *	*/
	private loadShader(source: string, type: number) : WebGLShader {
		let gl = this.main.getGl();
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
		let gl = this.main.getGl();
		let program = gl.createProgram() as WebGLProgram;
		
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		
		gl.linkProgram(program);
		
		return program;
	}
}

export default Shader;

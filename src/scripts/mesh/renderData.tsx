
import StandardShader from '../shader/standardShader';

class RenderData {
	private _gl: WebGLRenderingContext;
	private _name: string;
	private _program: WebGLProgram;
	
	private _vertexBuffer: WebGLBuffer;
	private _colorBuffer: WebGLBuffer;
	
	/*	* Tworzy nową instancję RenderData
		* @param {WebGLRenderingContext} _gl
		* @param {string} _name
	 *	*/
	public constructor (_gl: WebGLRenderingContext, _name: string) {
		this._name = _name;
		this._gl = _gl;
		
		this._vertexBuffer = _gl.createBuffer() as WebGLBuffer;
		this._colorBuffer = _gl.createBuffer() as WebGLBuffer;
		
		let standardShader = new StandardShader();
		
		let vertexShader = this.loadShader(standardShader.getVertexSource(), _gl.VERTEX_SHADER);
		let fragmentShader = this.loadShader(standardShader.getFragmentSource(), _gl.FRAGMENT_SHADER);
		
		this._program = this.createProgram(vertexShader, fragmentShader);
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
	
	/*	* Setter do program
		* @param {WebGLProgram} _program
	 *	*/
	public set program (_program: WebGLProgram) {
		this._program = _program;
	}
	
	/*	* Getter do program
		* @returns {WebGLProgram}
	 *	*/
	public get program () : WebGLProgram {
		return this._program;
	}
	
	/*	* Podpina program do kontekstu
		* @param {number} elementAmount
	 *	*/
	public draw (elementAmount: number) : void {
		let gl = this._gl;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);
		
		gl.drawArrays(gl.TRIANGLES, 0, elementAmount);
		
		// Podepnij odpowiedni program
		gl.useProgram(this._program);
	}
	
	
	/*	* Binduje vertex array do buffera
		* @param {number[]} vertices
	 *	*/
	public bindVertexArray (vertices: number[]) : void {
		let gl = this._gl;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}
	
	/*	* Binduje macierze do uniformów
		* @param {number[]} projectionMatrix
		* @param {number[]} modelViewMatrix
	 *	*/
	public bindUniforms (projectionMatrix: number[], modelViewMatrix: number[]) : void {
		let gl = this._gl;
		let program = this._program;
		
		gl.uniformMatrix4fv(
			gl.getUniformLocation(program, 'uProjectionMatrix'),
			false,
			projectionMatrix
		);
		
		gl.uniformMatrix4fv(
			gl.getUniformLocation(program, 'uModelViewMatrix'),
			false,
			modelViewMatrix
		);
	}
	
	/*	* Generuje shadery, laduje do nich kod i kompiluje
		* @param {String} source
		* @param {Number} type
	 *	*/
	private loadShader(source: string, type: number) : WebGLShader {
		let gl = this._gl;
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
		let gl = this._gl;
		let program = gl.createProgram() as WebGLProgram;
		
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		
		gl.linkProgram(program);
		
		return program;
	}
}

export default RenderData;

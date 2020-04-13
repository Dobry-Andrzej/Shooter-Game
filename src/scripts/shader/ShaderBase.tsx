
import Mesh from './../mesh/Mesh';
import Attribute from './../render/Attribute';

class ShaderBase {
	private _vertexSource: string;
	private _fragmentSource: string;
	
	private _program: WebGLProgram | null;
	private _attributes: { 
		[key: string]: Attribute
	};
	private _uniforms: {
		[key: string]: WebGLUniformLocation | null
	};
	
	private _primitiveType: string;	
	private _primitives: {
		[key: string]: number
	};
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
		this._vertexSource = ``;
		this._fragmentSource = ``;
		
		this._program = null;
		
		this._attributes = {};
		this._uniforms = {};
		
		this._primitiveType = "triangles";
		this._primitives = {
			points: 0,
			lines: 1,
			line_loop: 2,
			line_strip: 3,
			triangles: 4
		}
	}
	
	/*	* Setter do vertexSource
		* @param {string} vertexSource
	 *	*/
	public set vertexSource (vertexSource: string) {
		this._vertexSource = vertexSource;
	}
	
	/*	* Getter do vertexSource
		* @returns {string}
	 *	*/
	public get vertexSource () : string {
		return this._vertexSource;
	}
	
	/*	* Setter do fragmentSource
		* @param {string} fragmentSource
	 *	*/
	public set fragmentSource (fragmentSource: string) {
		this._fragmentSource = fragmentSource;
	}
	
	/*	* Getter do fragmentSource
		* @returns {string}
	 *	*/
	public get fragmentSource () : string {
		return this._fragmentSource;
	}
	
	/*	* Setter do primitiveType
		* @param {string} primitiveType
	 *	*/
	public set primitiveType (primitiveType: string) {
		this._primitiveType = primitiveType;
	}
	
	/*	* Getter do primitiveType
		* @returns {string}
	 *	*/
	public get primitiveType () : string {
		return this._primitiveType;
	}
	
	/*	* Funkcja do inicjowania webgl programu lub zwracania go jezeli się to juz stało
		* @param {WebGLRenderingContext} gl
		* @returns ShaderBase
	 *	*/
	public getOrCreate (gl: WebGLRenderingContext) : ShaderBase {
		if (this._program != null) {
			return this;
		}
		let vertexShader = this.loadShader(gl, this._vertexSource, gl.VERTEX_SHADER);
		let fragmentShader = this.loadShader(gl, this._fragmentSource, gl.FRAGMENT_SHADER);
		
		this._program = this.createProgram(gl, vertexShader, fragmentShader);
		
		this.initAttributes(gl);
		this.initUniforms(gl);
		
		return this;
	}
	
	/*	* Funkcja do rysowania mesha uzywajac tego shadera
		* @param {Mesh} mesh
	 *	*/
	public draw(mesh: Mesh) : void {
		let gl = mesh.renderData.gl;
		
		gl.useProgram(this._program);
		
		this.bindAttributes(mesh);
		this.updateUniforms(mesh);
		this.drawBuffer(mesh);
	}
	
	/*	* Funkcja do zainicjowania atrybutów do shadera
		* @param {WebGLRenderingContext} gl
	 *	*/
	private initAttributes (gl: WebGLRenderingContext) : void {
		let program = this._program as WebGLProgram;
		
		this._attributes.aVertexPosition = new Attribute(gl, program, 'aVertexPosition', 3, gl.FLOAT);
		this._attributes.aVertexColor = new Attribute(gl, program, 'aVertexColor', 3, gl.FLOAT);
	}
	
	/*	* Funkcja do zainicjowania uniformów do shadera
		* @param {WebGLRenderingContext} gl
	 *	*/
	private initUniforms (gl: WebGLRenderingContext) : void {
		let program = this._program as WebGLProgram;
		
		this._uniforms.uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
		this._uniforms.uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');
	}
	
	/*	* Funkcja do zainicjowania atrybutów do shadera
		* @param {Mesh} mesh
	 *	*/
	private bindAttributes (mesh: Mesh) : void {
		this._attributes.aVertexPosition.bindToBuffer(mesh.renderData.vertexBuffer);
		this._attributes.aVertexColor.bindToBuffer(mesh.renderData.colorBuffer);
	}
	
	/*	* Funkcja do zainicjowania atrybutów do shadera
		* @param {Mesh} mesh
	 *	*/
	private updateUniforms (mesh: Mesh) : void {
		let gl = mesh.renderData.gl;
		
		gl.uniformMatrix4fv(this._uniforms.uProjectionMatrix, false, mesh.transformData.projectionMatrix);
		gl.uniformMatrix4fv(this._uniforms.uModelViewMatrix, false, mesh.transformData.modelViewMatrix);
	}
	
	/*	* Funkcja do zainicjowania atrybutów do shadera
		* @param {Mesh} mesh
	 *	*/
	private drawBuffer (mesh: Mesh) : void {
		let gl = mesh.renderData.gl;
		
		gl.drawArrays(this._primitives[this._primitiveType], 0, mesh.getVertexAmount());
		
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		this.unbindAttributes();
	}
	
	/*	* Funkcja do unbindowania atrybutów
		*
	 *	*/
	private unbindAttributes () : void {
		this._attributes.aVertexPosition.unbind();
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

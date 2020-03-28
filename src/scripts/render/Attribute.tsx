
import Buffer from './Buffer';

class Attribute {
	private _gl: WebGLRenderingContext;
	private _location: number;
	private _size: number;
	private _type: number;

	public constructor(gl: WebGLRenderingContext, program: WebGLProgram, name: string, size: number, type: number) {
		this._gl = gl;
		this._location = gl.getAttribLocation(program, name);
		this._size = size;
		this._type = type;
	}

	public unbind() {
		this._gl.disableVertexAttribArray(this._location);
	}

	public bindToBuffer(buffer: Buffer) {
		var gl = this._gl;
		
		buffer.bind();
		
		gl.enableVertexAttribArray(this._location);
		gl.vertexAttribPointer(this._location, this._size, this._type, false, 0, 0);
	}
}

export default Attribute;

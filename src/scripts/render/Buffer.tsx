
class Buffer {
	
	private _gl: WebGLRenderingContext;
	private _buffer: WebGLBuffer;
	private _type: number;
	private _hint: number;
	private _size: number;

	public constructor(gl: WebGLRenderingContext, type: number, hint: number) {
		this._gl = gl;
		this._buffer = gl.createBuffer() as WebGLBuffer;
		this._type = type;
		this._hint = hint;
		this._size = 0;
	}

	public bind() {
		if (!this._buffer) this._buffer = this._gl.createBuffer() as WebGLBuffer;
		this._gl.bindBuffer(this._type, this._buffer);
	}
	
}

export default Buffer;

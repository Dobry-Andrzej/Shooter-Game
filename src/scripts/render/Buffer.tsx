
class Buffer {
	
	private _gl: WebGLRenderingContext;
	private _buffer: WebGLBuffer | null;
	private _type: number;
	private _hint: number;
	private _size: number;

	public constructor(gl: WebGLRenderingContext, type: number, hint: number) {
		this._gl = gl;
		this._buffer = gl.createBuffer();
		this._type = type;
		this._hint = hint;
		this._size = 0;
	}

	public bind() {
		if (this._buffer == null) this._buffer = this._gl.createBuffer();
		this._gl.bindBuffer(this._type, this._buffer);
	}
	
	public release() {
		this._gl.deleteBuffer(this._buffer);
		this._buffer = null;
		this._size = 0;
	}

	public update(data: any, amount: number) {
		this.bind();

		if (amount !== undefined && amount !== data.length) {
			data = data.subarray(0, amount);
		}

		if (data.length > this._size) {
			this._gl.bufferData(this._type, data, this._hint);
			this._size = data.length;
		} else {
			this._gl.bufferSubData(this._type, 0, data);
		}
	}
	
}

export default Buffer;

import Shader from './shader/shader';

class App {	
	private _gl: WebGLRenderingContext;
	private _canvas: HTMLCanvasElement;
	
	private _shader: Shader;
	
	/*	* Tworzy nową instancję App
		* @param {HTMLCanvasElement} canvas
	 *	*/
	public constructor (canvas: HTMLCanvasElement) {
		this._canvas = canvas as HTMLCanvasElement;
		this._gl = canvas.getContext('webgl') as WebGLRenderingContext;
		
		this._shader = new Shader(this, "standardShader");
		//this.scene = new Scene(this);
		//TODO: Dodanie wszystkich pochodnych, takich jak np. eventy, fizyka, generator mapy, itp
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public initialize () : void {
		this.gl.clearColor(0, 0, 0, 1);
		
		// Tworzenie mapy
		//this.scene.createMap();
		
		// Podepnij odpowiedni shader
		this._shader.use();
		// Odpal animationFrame jak juz wszystko jest zainicjowane
		this.animate();
	}
	
	/*	* Setter do gl
		* @param {WebGLRenderingContext} _gl
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
	
	/*	* Funkcja do zczytywania wydarzenia od zmiany rozmiaru okna
		*
	 *	*/
	private resize () : void {
		//
	}
	
	/*	* Funkcja do animowania frame'a
		*
	 *	*/
	private animate () : void {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		requestAnimationFrame(this.animate.bind(this));
	}

}

export default App;

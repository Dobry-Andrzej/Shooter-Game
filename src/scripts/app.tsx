import Shader from './shader/shader';
import Scene from './scene/scene';

class App {	
	private _gl: WebGLRenderingContext;
	private _canvas: HTMLCanvasElement;
	
	private _shader: Shader;
	private _scene: Scene;
	
	/*	* Tworzy nową instancję App
		* @param {HTMLCanvasElement} canvas
	 *	*/
	public constructor (_canvas: HTMLCanvasElement) {
		this._canvas = _canvas as HTMLCanvasElement;
		this._gl = _canvas.getContext('webgl') as WebGLRenderingContext;
		
		this._shader = new Shader(this, "standardShader");
		this._scene = new Scene(this);
		//TODO: Dodanie wszystkich pochodnych, takich jak np. eventy, fizyka, generator mapy, itp
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
	
	/*	* Setter do shader
		* @param {Shader} _shader
	 *	*/
	public set shader (_shader: Shader) {
		this._shader = _shader;
	}
	
	/*	* Getter do shader
		* @returns {Shader}
	 *	*/
	public get shader () : Shader {
		return this._shader;
	}
	
	/*	* Setter do scene
		* @param {Scene} _scene
	 *	*/
	public set scene (_scene: Scene) {
		this._scene = _scene;
	}
	
	/*	* Getter do scene
		* @returns {Scene}
	 *	*/
	public get scene () : Scene {
		return this._scene;
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public initialize () : void {
		this.gl.clearColor(0, 0, 0, 1);
		
		// Tworzenie mapy
		this.scene.createMap();
		
		// Podepnij odpowiedni shader
		this.shader.use();
		// Odpal animationFrame jak juz wszystko jest zainicjowane
		this.animate();
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
		
		this.scene.drawMeshes();
		
		requestAnimationFrame(this.animate.bind(this));
	}

}

export default App;

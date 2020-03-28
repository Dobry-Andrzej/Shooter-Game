
import RightPanelControls from './rightPanelControls';
import Scene from './scene/scene';
import StlLoader from './stlloader';

class App {	
	private _gl: WebGLRenderingContext;
	private _canvas: HTMLCanvasElement;
	
	private _scene: Scene;
	private _stlLoader: StlLoader;
	
	private _rightPanelControls: RightPanelControls;
	
	/*	* Tworzy nową instancję App
		* @param {HTMLCanvasElement} canvas
	 *	*/
	public constructor (_canvas: HTMLCanvasElement) {
		this._canvas = _canvas as HTMLCanvasElement;
		this._gl = _canvas.getContext('webgl') as WebGLRenderingContext;
		
		this._scene = new Scene(this);
		this._stlLoader = new StlLoader();
		//TODO: Dodanie wszystkich pochodnych, takich jak np. eventy, fizyka, generator mapy, itp
		
		this._rightPanelControls = new RightPanelControls();
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
	
	/*	* Setter do canvas
		* @param {HTMLCanvasElement} _canvas
	 *	*/
	public set canvas (_canvas: HTMLCanvasElement) {
		this._canvas = _canvas;
	}
	
	/*	* Getter do canvas
		* @returns {HTMLCanvasElement}
	 *	*/
	public get canvas () : HTMLCanvasElement {
		return this._canvas;
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
	
	/*	* Setter do stlLoader
		* @param {StlLoader} _stlLoader
	 *	*/
	public set stlLoader (_stlLoader: StlLoader) {
		this._stlLoader = _stlLoader;
	}
	
	/*	* Getter do stlLoader
		* @returns {StlLoader}
	 *	*/
	public get stlLoader () : StlLoader {
		return this._stlLoader;
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public initialize () : void {
		this._gl.clearColor(0, 0, 0, 1);
		
		// Ustawienie viewporta
		this._scene.initViewport();
		
		// Tworzenie mapy
		this._scene.createMap();
		
		// Odpal animationFrame jak juz wszystko jest zainicjowane
		this.animate();
		
		this._rightPanelControls.setHp(69);
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
		this._gl.clear(this._gl.COLOR_BUFFER_BIT);
		
		this._scene.drawMeshes();
		
		requestAnimationFrame(this.animate.bind(this));
	}

}

export default App;

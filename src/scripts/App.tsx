
import RightPanelControls from './RightPanelControls';

import Scene from './modules/Scene';
import Camera from './modules/Camera';
import Editor from './modules/Editor';

import Events from './modules/Events';

class App {	
	private _gl: WebGLRenderingContext;
	private _canvas: HTMLCanvasElement;
	
	private _scene: Scene;
	private _camera: Camera;
	private _editor: Editor;
	
	private _events: Events;
	
	private _rightPanelControls: RightPanelControls;
	
	/*	* Tworzy nową instancję App
		* @param {HTMLCanvasElement} canvas
	 *	*/
	public constructor (canvas: HTMLCanvasElement) {
		this._canvas = canvas;
		
		this._gl = canvas.getContext('webgl') as WebGLRenderingContext;
		
		this._scene = new Scene(this);
		this._camera = new Camera(this);
		this._editor = new Editor(this);
		
		this._events = new Events();
		
		this._rightPanelControls = new RightPanelControls();
	}
	
	/*	* Setter do gl
		* @param {WebGLRenderingContext} gl
	 *	*/
	public set gl (gl: WebGLRenderingContext) {
		this._gl = gl;
	}
	
	/*	* Getter do gl
		* @returns {WebGLRenderingContext}
	 *	*/
	public get gl () : WebGLRenderingContext {
		return this._gl;
	}
	
	/*	* Setter do canvas
		* @param {HTMLCanvasElement} canvas
	 *	*/
	public set canvas (canvas: HTMLCanvasElement) {
		this._canvas = canvas;
	}
	
	/*	* Getter do canvas
		* @returns {HTMLCanvasElement}
	 *	*/
	public get canvas () : HTMLCanvasElement {
		return this._canvas;
	}
	
	/*	* Setter do scene
		* @param {Scene} scene
	 *	*/
	public set scene (scene: Scene) {
		this._scene = scene;
	}
	
	/*	* Getter do scene
		* @returns {Scene}
	 *	*/
	public get scene () : Scene {
		return this._scene;
	}
	
	/*	* Setter do camera
		* @param {Camera} camera
	 *	*/
	public set camera (camera: Camera) {
		this._camera = camera;
	}
	
	/*	* Getter do camera
		* @returns {Camera}
	 *	*/
	public get camera () : Camera {
		return this._camera;
	}
	
	/*	* Setter do editor
		* @param {Editor} editor
	 *	*/
	public set editor (editor: Editor) {
		this._editor = editor;
	}
	
	/*	* Getter do editor
		* @returns {Editor}
	 *	*/
	public get editor () : Editor {
		return this._editor;
	}
	
	/*	* Setter do events
		* @param {Events} events
	 *	*/
	public set events (events: Events) {
		this._events = events;
	}
	
	/*	* Getter do events
		* @returns {Events}
	 *	*/
	public get events () : Events {
		return this._events;
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public initialize () : void {
		//Enable Depth Test
		this._gl.enable(this._gl.DEPTH_TEST);
		
		this._gl.clearColor(0.9, 0.9, 0.9, 1);
		
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
		
		this._scene.renderMeshes();
		
		requestAnimationFrame(this.animate.bind(this));
	}

}

export default App;

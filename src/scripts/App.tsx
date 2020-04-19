
import RightPanelControls from './RightPanelControls';

import Scene from './modules/Scene';
import Camera from './modules/Camera';
import Editor from './modules/Editor';

import Events from './modules/Events';
import Assets from './modules/Assets';

import Mesh from './mesh/Mesh';

class App {	
	private _gl: WebGLRenderingContext;
	private _canvas: HTMLCanvasElement;
	
	private _scene: Scene;
	private _camera: Camera;
	private _editor: Editor;
	
	private _events: Events;
	private _assets: Assets;
	
	private _rightPanelControls: RightPanelControls;
	
	private _FPS: number;
	private _previousTime: number;
	
	
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
		this._assets = new Assets(this);
		
		this._rightPanelControls = new RightPanelControls();
		
		this._FPS = 30;
		this._previousTime = 0;
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
	
	/*	* Setter do assets
		* @param {Assets} assets
	 *	*/
	public set assets (assets: Assets) {
		this._assets = assets;
	}
	
	/*	* Getter do assets
		* @returns {Assets}
	 *	*/
	public get assets () : Assets {
		return this._assets;
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public async initialize () : Promise <void> {
		// Ustaw viewporta
		this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
		//Enable Depth Test
		this._gl.enable(this._gl.DEPTH_TEST);
		
		this._gl.clearColor(0.6, 0.6, 0.6, 1);
		
		// Ustawienie viewporta
		this._scene.initViewport();
		
		// Tworzenie mapy
		this._scene.createMap();
		
		//Ustawienie czasu startu animacji
		this._previousTime = window.performance.now();
		
		this._rightPanelControls.setHp(69);
		
		await this._assets.loadAssets(this._gl);
		
		// Odpal animationFrame jak juz wszystko jest zainicjowane
		this.animate();
	}
	
	/*	* Funkcja do zczytywania wydarzenia od zmiany rozmiaru okna
		* @param {number} width
		* @param {number} height
	 *	*/
	public resize (width: number, height: number) : void {
		this._canvas.width = width;
		this._canvas.height = height;
		
		this._gl.viewport(0, 0, width, height);
		
		this._camera.setSize(width, height);
	}
	
	/*	* Funkcja do animowania frame'a
		*
	 *	*/
	private animate () : void {
		requestAnimationFrame(this.animate.bind(this));
		
		let currentTime: number = window.performance.now();
		let difference: number = currentTime - this._previousTime;
		
		if (difference > (1000 / this._FPS)) {
			this._previousTime = currentTime - (difference % (1000 / this._FPS));
			
			this._gl.clear(this._gl.COLOR_BUFFER_BIT);
			
			this._scene.renderMeshes();
			
			if (this._assets.assetIndex > 0) {
			
				let assetMesh: Mesh = this._assets.assetMeshes[this._assets.assetCategory][this._assets.assetIndex - 1];
				
				if (assetMesh) {
					
					if (assetMesh.visible == true) {
						assetMesh.render(this._camera);
					}
					
				}
				
			}
			
		}
	}

}

export default App;

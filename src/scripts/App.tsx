
import RightPanelControls from './RightPanelControls';

import Scene from './modules/Scene';
import Camera from './modules/Camera';
import Editor from './modules/Editor';

import Events from './modules/Events';
import Mesh from './mesh/Mesh';

import StlLoader from './loaders/StlLoader';

class App {	
	private _gl: WebGLRenderingContext;
	private _canvas: HTMLCanvasElement;
	
	private _scene: Scene;
	private _camera: Camera;
	private _editor: Editor;
	
	private _events: Events;
	
	private _rightPanelControls: RightPanelControls;
	
	private _assets: Mesh[];
	private _assetNames: string[];
	
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
		
		this._assets = [];
		this._assetNames = ["brokenWall3x4", "brokenShed4x6", "mauzer2x2", "fence1x3", "brokenFence1x3", "barrel", "flowerAsset"];
		
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
		* @param {Mesh[]} assets
	 *	*/
	public set assets (assets: Mesh[]) {
		this._assets = assets;
	}
	
	/*	* Getter do assets
		* @returns {Assets}
	 *	*/
	public get assets () : Mesh[] {
		return this._assets;
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public async initialize () : Promise <void> {
		//Enable Depth Test
		this._gl.enable(this._gl.DEPTH_TEST);
		
		this._gl.clearColor(0.9, 0.9, 0.9, 1);
		
		// Ustawienie viewporta
		this._scene.initViewport();
		
		// Tworzenie mapy
		this._scene.createMap();
		
		//Ustawienie czasu startu animacji
		this._previousTime = window.performance.now();
		
		this._rightPanelControls.setHp(69);
		
		await this.loadAssets();
		
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
	}
	
	/*	* Funkcja do ladowania modeli
		* @returns {Promise<void>}
	 *	*/
	private loadAssets () : Promise <void> {
		let stlloader: StlLoader = new StlLoader();
		let index: number = 0;
		let self: App = this;
		
		const loopOverAssets = function(resolve: any, reject: any) {
			stlloader.load("/meshes/assets/" + self._assetNames[index] + ".stl", function(vertices: number[]) {
				let mesh: Mesh = new Mesh(self._assetNames[index], self._gl);
				
				mesh.visible = false;
				
				mesh.vertices = new Float32Array(vertices);
				mesh.colors = new Float32Array(vertices.map((x, i) => (vertices.length - i - 1) / vertices.length));
				
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				self._assets.push(mesh);
				
				index++;
				
				if (index >= self._assetNames.length) {
					resolve();
				} else {
					loopOverAssets(resolve, reject);
				}
			});
		};
		
		return new Promise <void> (function(resolve, reject) {
			loopOverAssets(resolve, reject);
		});
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
			
			if (this._editor.assetIndex > 0) {
			
				let asset: Mesh = this._assets[this._editor.assetIndex - 1];
				
				if (asset.visible == true) {
					asset.render(this._camera);
				}
				
			}
			
		}
	}

}

export default App;

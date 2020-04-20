
import App from '../App';

import Mesh from '../mesh/Mesh';
import Player from '../player/Player';
import Grid from '../primitives/Grid';
import Plane from '../primitives/Plane';

import StlLoader from '../loaders/StlLoader';

class Scene {
	private _main: App;
	private _gl: WebGLRenderingContext;
	
	private _meshes: Mesh[];
	private _players: Player[];
	
	/*	* Tworzy nową instancję Scene
		* @param {App} main
	 *	*/
	public constructor (main: App) {
		this._main = main;
		this._gl = main.gl;
		
		this._meshes = [];
		this._players = [];
	}
	
	/*	* Setter do main
		* @param {App} main
	 *	*/
	public set main (main: App) {
		this._main = main;
	}
	
	/*	* Getter do main
		* @returns {App}
	 *	*/
	public get main () : App {
		return this._main;
	}
	
	/*	* Setter do meshes
		* @param {Mesh[]} meshes
	 *	*/
	public set meshes (meshes: Mesh[]) {
		this._meshes = meshes;
	}
	
	/*	* Getter do meshes
		* @returns {Mesh[]}
	 *	*/
	public get meshes () : Mesh[] {
		return this._meshes;
	}
	
	/*	* Setter do players
		* @param {Player[]} players
	 *	*/
	public set players (players: Player[]) {
		this._players = players;
	}
	
	/*	* Getter do players
		* @returns {Player[]}
	 *	*/
	public get players () : Player[] {
		return this._players;
	}
	
	public initViewport () : void {
		let gl = this._main.gl;
		let canvas = this._main.canvas;
		
		gl.viewport(0, 0, canvas.width, canvas.height);
	}
	
	/*	* Rysuje buffery wszystkich meshy 
		*
	 *	*/
	public renderMeshes () : void {
		let camera = this._main.camera;
		for (let i: number = 0; i < this._meshes.length; i++) {
			if (this._meshes[i].visible == true) {
				this._meshes[i].render(camera);
			}
		}
		for (let i: number = 0; i < this._players.length; i++) {
			let model: Mesh | undefined = this._players[i].model;
			if (model) {
				model.render(camera);
			}
		}
	}
	
	/*	* Dodaje mesha do tablicy
		*
	 *	*/
	public add (mesh: Mesh) : void {
		this._meshes.push(mesh);
	}
	
	/*	* Tworzy geometrie i objekt mapy i dodaje do sceny
		*
	 *	*/
	public createMap () : void {
		let self: Scene = this;
		let gl = this._main.gl;
		
		let grid = new Grid("grid", gl);
		let plane = new Plane("plane", gl);
		
		let stlloader = new StlLoader();
		
		grid.generate(50, 50, 50, 50);
		
		grid.setPosition(0, 0, 0);
		grid.updateBuffers();
		grid.updateMatrices();
		
		this.add(grid);
		
		plane.generate(50, 50, 50, 50);
		
		plane.setPosition(0, 0, 0);
		plane.updateBuffers();
		plane.updateMatrices();
		
		this.add(plane);
		
		stlloader.load("/meshes/map.stl", function(vertices: number[]) {
			let map: Mesh = new Mesh("map", self._gl);
			
			map.faceData.populateFromTriangleCoords(new Float32Array(vertices));
			
			for (let i: number = 0; i < map.vertexData.vertices.length; i += 3) {
				map.vertexData.vertexColors[i] = 0.3 + map.vertexData.vertices[i + 1] * 0.5;
				map.vertexData.vertexColors[i + 1] = 0.3 + map.vertexData.vertices[i + 1] * 0.5;
				map.vertexData.vertexColors[i + 2] = 0.3 + map.vertexData.vertices[i + 1] * 0.5;
			}
			
			map.setPosition(0, -0.5, 0);
			
			map.vertexData.computeVertexFaceRings();
			map.vertexData.computeVertexNormals();
			
			map.renderData.updateRenderingArrays();
			
			map.updateBuffers();
			map.updateMatrices();
			
			self.add(map);
			
		});
		
	}

}

export default Scene;


import App from '../App';
import Mesh from '../mesh/Mesh';
import StlLoader from '../loaders/StlLoader';

class Scene {
	private _main: App;
	private _gl: WebGLRenderingContext;
	
	private _meshes: Mesh[];
	
	/*	* Tworzy nową instancję Scene
		* @param {App} main
	 *	*/
	public constructor (main: App) {
		this._main = main;
		this._gl = main.gl;
		
		this._meshes = [];
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
	
	public initViewport () : void {
		let gl = this._main.gl;
		let canvas = this._main.canvas;
		
		gl.viewport(0, 0, canvas.width, canvas.height);
	}
	
	/*	* Rysuje buffery wszystkich meshy 
		*
	 *	*/
	public renderMeshes () : void {
		//TODO Przekazanie camery do rendera
		for (let i: number = 0; i < this.meshes.length; i++) {
			this._meshes[i].render();
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
		let gl = this._main.gl;
		let mesh = new Mesh("mapa", gl);
		let stlLoader = new StlLoader();
		let self: Scene = this;
		
		stlLoader.load("shooter/src/meshes/map.stl", function(vertices: number[]) {
			mesh.vertices = new Float32Array(vertices);
			
			let colors: number[] = [];
			colors.length = vertices.length;
			//Cziterstwo jak na razie, tylko po to, żeby widzieć różnice między ścianami
			for (let i: number = 0; i < colors.length / 3; i++) {
				let i3: number = i * 3;
				
				colors[i3] = 0.1;
				colors[i3 + 1] = 0.7;
				colors[i3 + 2] = (i3 / colors.length);
			}
			
			mesh.colors = new Float32Array(colors);
			
			mesh.setPosition(0, -1, -5);
			mesh.updateBuffers();
			mesh.updateMatrices();
		
			self.add(mesh);
		});
		
	}

}

export default Scene;

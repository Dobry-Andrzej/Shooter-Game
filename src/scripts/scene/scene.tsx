
import App from '../App';
import Mesh from '../mesh/Mesh';
import StlLoader from '../loaders/StlLoader';

class Scene {
	private _main: App;
	private _gl: WebGLRenderingContext;
	
	private _meshes: Mesh[];
	
	/*	* Tworzy nową instancję Scene
		* @param {App} _main
	 *	*/
	public constructor (_main: App) {
		this._main = _main;
		this._gl = _main.gl;
		
		this._meshes = [];
	}
	
	/*	* Setter do main
		* @param {App} _main
	 *	*/
	public set main (_main: App) {
		this._main = _main;
	}
	
	/*	* Getter do main
		* @returns {App}
	 *	*/
	public get main () : App {
		return this._main;
	}
	
	/*	* Setter do meshes
		* @param {Mesh[]} _meshes
	 *	*/
	public set meshes (_meshes: Mesh[]) {
		this._meshes = _meshes;
	}
	
	/*	* Getter do meshes
		* @returns {Mesh[]}
	 *	*/
	public get meshes () : Mesh[] {
		return this._meshes;
	}
	
	public initViewport () : void {
		let gl = this.main.gl;
		let canvas = this.main.canvas;
		
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
			mesh.vertices = vertices;
			
			mesh.setPosition(0, 0, 0);
			mesh.updateMatrices();
		
			self.add(mesh);
		});
		
	}

}

export default Scene;

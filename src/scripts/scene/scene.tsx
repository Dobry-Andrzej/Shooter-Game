import App from '../app';
import Mesh from '../mesh/mesh';

class Scene {
	private _main: App;
	private _meshes: Mesh[];
	
	/*	* Tworzy nową instancję Scene
		* @param {App} _main
	 *	*/
	public constructor (_main: App) {
		this._main = _main;
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
	
	/*	* Rysuje buffery wszystkich meshy 
		*
	 *	*/
	public drawMeshes () : void {
		for (let i: number = 0; i < this.meshes.length; i++) {
			this.meshes[i].draw();
		}
	}
	
	/*	* Dodaje mesha do tablicy
		*
	 *	*/
	public add (mesh: Mesh) : void {
		this.meshes.push(mesh);
	}
	
	/*	* Tworzy geometrie i objekt mapy i dodaje do sceny
		*
	 *	*/
	public createMap () : void {
		let gl = this.main.gl;
		let mesh = new Mesh("mapa", gl);
		let stlLoader = this.main.stlLoader;
		let self: Scene = this;
		
		stlLoader.load("shooter/src/meshes/map.stl", function(vertices: number[]) {
			mesh.vertices = vertices;
			mesh.bindBufferArrays();
		
			self.add(mesh);
		});
		
	}

}

export default Scene;

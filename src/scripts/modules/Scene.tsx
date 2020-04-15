
import App from '../App';
import Mesh from '../mesh/Mesh';
import Grid from '../primitives/Grid';
import Plane from '../primitives/Plane';

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
		let camera = this._main.camera;
		for (let i: number = 0; i < this.meshes.length; i++) {
			if (this._meshes[i].visible == true) {
				this._meshes[i].render(camera);
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
		let gl = this._main.gl;
		
		let grid = new Grid("grid", gl);
		let plane = new Plane("plane", gl);
		
		grid.generate(10, 10, 40, 40);
		
		grid.setPosition(0, 0, 0);
		grid.updateBuffers();
		grid.updateMatrices();
		
		this.add(grid);
		
		plane.generate(10, 10, 40, 40);
		
		plane.setPosition(0, 0, 0);
		plane.updateBuffers();
		plane.updateMatrices();
		
		this.add(plane);
		
	}

}

export default Scene;

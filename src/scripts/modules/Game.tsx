
import App from '../App';
import Mesh from '../mesh/Mesh';

import Player from '../player/Player';

import StlLoader from '../loaders/StlLoader';

class Game {
	private _main: App;
	private _player: Player;
	
	private _modelNames: string[];	
	private _modelMeshes: Mesh[];
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._player = new Player("player", this);
		
		this._modelNames = ["soldier"];
		this._modelMeshes = [];
	}
	
	/*	* Setter do player
		* @param {Player} player
	 *	*/
	public set player (player: Player) {
		this._player = player;
	}
	
	/*	* Getter do player
		* @returns {Player}
	 *	*/
	public get player () : Player {
		return this._player;
	}
	
	/*	* Funkcja do ladowania modeli
		* @param {WebGLRenderingContext} gl
		* @returns {Promise<void>}
	 *	*/
	public loadModels (gl: WebGLRenderingContext) : Promise <void> {
		let stlloader: StlLoader = new StlLoader();
		let i: number = 0;
		let self: Game = this;
		
		const loopOverModels = function(resolve: any, reject: any) {
			let url: string = "/meshes/models/" + self._modelNames[i] + ".stl";
			
			stlloader.load(url, function(vertices: number[]) {
				let mesh: Mesh = new Mesh(self._modelNames[i], gl);
				
				mesh.visible = false;
				
				mesh.faceData.populateFromTriangleCoords(new Float32Array(vertices));
				
				mesh.vertexData.computeVertexFaceRings();
				mesh.vertexData.computeVertexNormals();
				
				mesh.colorData.computeColorVariants();
				mesh.vertexData.vertexColors = mesh.colorData.colorVariants[0];
				
				mesh.renderData.updateRenderingArrays();
				
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				self._modelMeshes.push(mesh);
				
				i++;
				
				if (i >= self._modelNames.length) {
					resolve();
				} else {
					loopOverModels(resolve, reject);
				}
			});
		};
		
		return new Promise <void> (function(resolve, reject) {
			loopOverModels(resolve, reject);
		});
	}
	
	/*	* Dodaje gracza do sceny
		*
	 *	*/
	public addPlayer () {
		this._player.model = this._modelMeshes[0];
		
		this._main.scene.players.push(this._player);
	}

}

export default Game;

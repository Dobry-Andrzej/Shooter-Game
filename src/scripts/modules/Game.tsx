
import App from '../App';
import Mesh from '../mesh/Mesh';

import Player from '../player/Player';

import StlLoader from '../loaders/StlLoader';

import { vec3 } from 'gl-matrix';

class Game {
	private _main: App;
	private _player: Player;
	
	private _modelNames: string[];	
	private _modelMeshes: Mesh[];
	
	private _xTranslation: vec3;
	private _yTranslation: vec3;
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._player = new Player("player", this);
		
		this._modelNames = ["soldier"];
		this._modelMeshes = [];
		
		this._xTranslation = vec3.create();
		this._yTranslation = vec3.create();
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
	
	/*	* Klauzula do animacji w grze
		* @returns {() => void}
	 *	*/
	public animate () : void {
		if (!this._player.model) return;
		
		let position: vec3 = this._player.model.position;
		
		vec3.scale(this._xTranslation, this._player.forward, this._player.movement[0] * 0.15);
		vec3.scale(this._yTranslation, this._player.side, this._player.movement[2] * 0.15);
		
		let vLen: number = vec3.len(this._player.movement);
		let factor: number = vLen == 0 ? 0 : 1 / vLen;
		
		this._player.model.setPosition(
			position[0] + this._xTranslation[0] * factor + this._yTranslation[0] * factor,
			position[1] + this._xTranslation[1] * factor + this._yTranslation[1] * factor,
			position[2] + this._xTranslation[2] * factor + this._yTranslation[2] * factor
		);
		
		this._player.model.updateBuffers();
		this._player.model.updateMatrices();
		
		this._main.camera.followPlayer(this._main.game.player);
	};
}

export default Game;

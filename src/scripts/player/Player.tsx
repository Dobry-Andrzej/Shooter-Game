
import Game from '../modules/Game';
import Mesh from '../mesh/Mesh';

import { vec3 } from 'gl-matrix';

class Player {
	private _name: string;
	private _game: Game;
	private _model?: Mesh;
	
	private _x: vec3;
	private _y: vec3;
	
	/*	* Tworzy nową instancję Player
		* @param {string} name
		* @param {Game} game
	 *	*/
	public constructor (name: string, game: Game) {
		this._name = name;
		this._game = game;
		
		this._x = vec3.create();
		this._y = vec3.create();
		
		vec3.set(this._x, 0, 0, 1);
		vec3.set(this._y, -1, 0, 0);
	}
	
	/*	* Setter do name
		* @param {string} name
	 *	*/
	public set name (name: string) {
		this._name = name;
	}
	
	/*	* Getter do name
		* @returns {string}
	 *	*/
	public get name () : string {
		return this._name;
	}
	
	/*	* Setter do model
		* @param {Mesh} model
	 *	*/
	public set model (model: Mesh | undefined) {
		this._model = model;
	}
	
	/*	* Getter do model
		* @returns {Mesh}
	 *	*/
	public get model () : Mesh | undefined {
		return this._model;
	}
	
	/*	* Rusza postacia o dane delty
		* @param {number} x
		* @param {number} y
	 *	*/
	public move (x: number, y: number) : void {
		if (!this._model) return;
		
		let position: vec3 = this._model.position;
		let xTranslation: vec3 = vec3.create();
		let yTranslation: vec3 = vec3.create();
		
		vec3.scale(xTranslation, this._x, x);
		vec3.scale(yTranslation, this._y, y);
		
		this._model.setPosition(
			position[0] + xTranslation[0] + yTranslation[0],
			position[1] + xTranslation[1] + yTranslation[1],
			position[2] + xTranslation[2] + yTranslation[2]
		);
		
		this._model.updateBuffers();
		this._model.updateMatrices();
	}

}

export default Player;

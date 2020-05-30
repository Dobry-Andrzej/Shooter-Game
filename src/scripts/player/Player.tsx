
import Game from '../modules/Game';
import Mesh from '../mesh/Mesh';

import { vec3 } from 'gl-matrix';

class Player {
	private _name: string;
	private _game: Game;
	
	private _tracks?: Mesh;
	private _gun?: Mesh;
	
	private _forward: vec3;
	private _side: vec3;
	
	private _movement: vec3;
	
	private _initFwd: vec3;
	private _lookAt: vec3;
	
	/*	* Tworzy nową instancję Player
		* @param {string} name
		* @param {Game} game
	 *	*/
	public constructor (name: string, game: Game) {
		this._name = name;
		this._game = game;
		
		this._forward = vec3.create();
		this._side = vec3.create();
		this._movement = vec3.create();
		
		this._initFwd = vec3.create();
		this._lookAt = vec3.create();
		
		vec3.set(this._forward, 0, 0, 1);
		vec3.set(this._side, -1, 0, 0);
		vec3.copy(this._initFwd, this._forward);
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
	
	/*	* Setter do tracks
		* @param {Mesh} tracks
	 *	*/
	public set tracks (tracks: Mesh | undefined) {
		this._tracks = tracks;
	}
	
	/*	* Getter do tracks
		* @returns {Mesh}
	 *	*/
	public get tracks () : Mesh | undefined {
		return this._tracks;
	}
	
	/*	* Setter do gun
		* @param {Mesh} gun
	 *	*/
	public set gun (gun: Mesh | undefined) {
		this._gun = gun;
	}
	
	/*	* Getter do gun
		* @returns {Mesh}
	 *	*/
	public get gun () : Mesh | undefined {
		return this._gun;
	}
	
	/*	* Setter do forward
		* @param {vec3} forward
	 *	*/
	public set forward (forward: vec3) {
		this._forward = forward;
	}
	
	/*	* Getter do forward
		* @returns {vec3}
	 *	*/
	public get forward () : vec3 {
		return this._forward;
	}
	
	/*	* Setter do side
		* @param {vec3} side
	 *	*/
	public set side (side: vec3) {
		this._side = side;
	}
	
	/*	* Getter do side
		* @returns {vec3}
	 *	*/
	public get side () : vec3 {
		return this._side;
	}
	
	/*	* Setter do movement
		* @param {vec3} movement
	 *	*/
	public set movement (movement: vec3) {
		this._movement = movement;
	}
	
	/*	* Getter do movement
		* @returns {vec3}
	 *	*/
	public get movement () : vec3 {
		return this._movement;
	}
	
	/*	* Włącza poruszanie się postaci
		* @param {number} x
		* @param {number} y
	 *	*/
	public startMove (x: number, y: number) : void {
		if (!this._tracks) return;
		
		let xsign: number = Math.sign(this._movement[0] + y);
        let ysign: number = Math.sign(this._movement[2] + x);
		
		this._movement[0] = xsign;
		this._movement[2] = ysign;
		
		let vDir: vec3 = vec3.create();
		vec3.set(vDir, 0, 1, 0);
		
		vec3.add(this._lookAt, this._tracks.position, this._movement);
		
		vec3.sub(this._forward, this._lookAt, this._tracks.position);
		vec3.normalize(this._forward, this._forward);
		
		vec3.cross(this._side, this._forward, vDir);
		
		let angle: number = vec3.angle(this._forward, this._initFwd);
		let sign: number = vec3.dot(this._side, this._initFwd) < 0 ? 1 : -1;
		
		this._tracks.setRotation(0, 180 * sign * angle / Math.PI, 0);
	}
	
	/*	* Wyłącza poruszanie się postaci
		* @param {number} x
		* @param {number} y
	 *	*/
	public stopMove (x: number, y: number) : void {
		if (!this._tracks) return;
		
		let xsign: number = Math.sign(this._movement[0] - y);
        let ysign: number = Math.sign(this._movement[2] - x);
		
		this._movement[0] = xsign;
		this._movement[2] = ysign;
		
		let vDir: vec3 = vec3.create();
		vec3.set(vDir, 0, 1, 0);
		
		vec3.add(this._lookAt, this._tracks.position, this._movement);
		
		vec3.sub(this._forward, this._lookAt, this._tracks.position);
		vec3.normalize(this._forward, this._forward);
		
		vec3.cross(this._side, this._forward, vDir);
		
		let angle: number = vec3.angle(this._forward, this._initFwd);
		let sign: number = vec3.dot(this._side, this._initFwd) < 0 ? 1 : -1;
		
		this._tracks.setRotation(0, 180 * sign * angle / Math.PI, 0);
	}
	
	/*	* Ruszanie działkiem za myszka
		* @param {MouseEvent} event
	 *	*/
	public turnGun (event: MouseEvent) : void {
		if (!this._gun) return;
		
		let camera = this._game.main.camera;
		let plane = this._game.main.scene.meshes[1];
		
		let vNear: vec3 = camera.unproject(event.offsetX, event.offsetY, 0.0);
		let vFar: vec3 = camera.unproject(event.offsetX, event.offsetY, 0.1);
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		let faceId: number = plane.intersect(vNear, vDir, this._lookAt);
		
		if (faceId >= 0) {
			vec3.set(vDir, 0, 1, 0);
			
			vec3.sub(this._forward, this._lookAt, this._gun.position);
			vec3.normalize(this._forward, this._forward);
			
			vec3.cross(this._side, this._forward, vDir);
			
			let angle: number = vec3.angle(this._forward, this._initFwd);
			let sign: number = vec3.dot(this._side, this._initFwd) > 0 ? 1 : -1;
			
			this._gun.setRotation(0, 180 * sign * angle / Math.PI, 0);
		}
	}

}

export default Player;

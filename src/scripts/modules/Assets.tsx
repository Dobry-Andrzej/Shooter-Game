
import App from '../App';
import Mesh from '../mesh/Mesh';

import StlLoader from '../loaders/StlLoader';

import { vec2, vec3, quat } from 'gl-matrix';

class Assets {
	private _main: App;
	
	private _categoryNames: string[];
	private _assetNames: string[][];
	
	private _assetCategory: number;
	private _assetIndex: number;
	
	private _assetMeshes: Mesh[][];
	
	private _coloringIndex: number;
	
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._categoryNames = ["buildings", "electricity", "misc", "terrain", "wallsandfences"];
		this._assetNames = [
			["brokenShed4x6"],
			["barbedWireCenter", "barbedWireEdge", "barbedWireEnd", "barbedWirePole"],
			["barrel", "flowerAsset", "mauzer2x2"],
			["grassPatch", "grassPatch4x4", "grassLoose", "grassLoose2x2"],
			["brokenFence1x3", "brokenWall3x4", "fence1x3"]
		];
		
		this._assetCategory = 0;
		this._assetIndex = 0;
		
		this._assetMeshes = [];
		
		this._coloringIndex = 0;
	}
	
	/*	* Setter do assetCategory
		* @param {number} assetCategory
	 *	*/
	public set assetCategory (assetCategory: number) {
		this._assetCategory = assetCategory;
	}
	
	/*	* Getter do assetCategory
		* @returns {number}
	 *	*/
	public get assetCategory () : number {
		return this._assetCategory;
	}
	
	/*	* Setter do assetIndex
		* @param {number} assetIndex
	 *	*/
	public set assetIndex (assetIndex: number) {
		this._assetIndex = assetIndex;
	}
	
	/*	* Getter do assetIndex
		* @returns {number}
	 *	*/
	public get assetIndex () : number {
		return this._assetIndex;
	}
	
	/*	* Setter do assetMeshes
		* @param {Mesh[][]} assetMeshes
	 *	*/
	public set assetMeshes (assetMeshes: Mesh[][]) {
		this._assetMeshes = assetMeshes;
	}
	
	/*	* Getter do assetMeshes
		* @returns {Mesh[][]}
	 *	*/
	public get assetMeshes () : Mesh[][] {
		return this._assetMeshes;
	}
	
	/*	* Setter do coloringIndex
		* @param {number} coloringIndex
	 *	*/
	public set coloringIndex (coloringIndex: number) {
		this._coloringIndex = coloringIndex;
	}
	
	/*	* Getter do coloringIndex
		* @returns {number}
	 *	*/
	public get coloringIndex () : number {
		return this._coloringIndex;
	}
	
	/*	* Funkcja do setowania indexu aktywnej kategorii
		* @param {number} index
	 * 	*/
	public setActiveAssetCategory (index: number) {
		if (index < this._categoryNames.length) {
			this._assetIndex = 1;
			this._assetCategory = index;
		}
	}
	
	/*	* Funkcja do setowania indexu aktywnego asseta
		* @param {number} index
	 * 	*/
	public setActiveAssetIndex (index: number) {
		if (index - 1 < this._assetNames[this._assetCategory].length) {
			this._assetIndex = index;
		}
	}
	
	/*	* Funkcja do ladowania modeli
		* @param {WebGLRenderingContext} gl
		* @returns {Promise<void>}
	 *	*/
	public loadAssets (gl: WebGLRenderingContext) : Promise <void> {
		let stlloader: StlLoader = new StlLoader();
		let i: number = 0;
		let j: number = 0;
		let self: Assets = this;
		
		const loopOverCategories = function(resolve: any, reject: any) {
			self._assetMeshes.push([]);
			return new Promise <void> (function(resolve2, reject2) {
				j = 0;
				loopOverAssets(resolve2, reject2);
			}).then(function() : void {
				i++;
				
				if (i >= self._categoryNames.length) {
					resolve();
				} else {
					loopOverCategories(resolve, reject);
				}
			});
		}
		
		const loopOverAssets = function(resolve2: any, reject2: any) {
			let url: string = "/meshes/assets/" + self._categoryNames[i] + "/" + self._assetNames[i][j] + ".stl";
			
			stlloader.load(url, function(vertices: number[]) {
				let mesh: Mesh = new Mesh(self._assetNames[i][j], gl);
				
				mesh.visible = false;
				
				mesh.vertices = new Float32Array(vertices);
				
				mesh.colorData.computeColorVariants();
				mesh.colors = mesh.colorData.colorVariants[0];
				
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				self._assetMeshes[i].push(mesh);
				
				j++;
				
				if (j >= self._assetNames[i].length) {
					resolve2();
				} else {
					loopOverAssets(resolve2, reject2);
				}
			});
		};
		
		return new Promise <void> (function(resolve, reject) {
			loopOverCategories(resolve, reject);
		});
	}
	
	/*	* Uaktualnia dany fragment mapy
		* @param {MouseEvent} event?
		* @param {vec2} position?
	 *	*/
	public tryToUpdateGridSquare (event?: MouseEvent, position?: vec2) : void {
		// W przypadku assetu 0, nie rób nic
		if (this._assetIndex == 0) return;
		
		let scene = this._main.scene;
		let assets = this._main.assets;
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1];
		
		let vNear: vec3;
		let vFar: vec3;
		
		if (event) {
			vNear = camera.unproject(event.offsetX, event.offsetY, 0.0);
			vFar = camera.unproject(event.offsetX, event.offsetY, 0.1);
		} else if (position) {
			vNear = camera.unproject(position[0], position[1], 0.0);
			vFar = camera.unproject(position[0], position[1], 0.1);
		} else {
			return;
		}
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		let vInt: vec3 = vec3.create();
		let distance: number = plane.intersectTriangles(vNear, vDir, vInt);
		
		if (distance >= 0) {
			let mesh = this._assetMeshes[this._assetCategory][this._assetIndex - 1].clone(this._main.gl);
			
			if (mesh) {
				mesh.setPosition(Math.floor(vInt[0] * 4) / 4 + 0.125, 0, Math.floor(vInt[2] * 4) / 4 + 0.125);
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				scene.meshes.push(mesh);
			}
		}
	}
	
	/*	* Pokazuje podglad na aktualnym fragmencie mapy
		* @param {MouseEvent} event?
		* @param {vec2} position?
	 *	*/
	public tryToPreviewOnGridSquare (event?: MouseEvent, position?: vec2) : void {
		// W przypadku assetu 0, nie rób nic
		if (this._assetIndex == 0) return;
		
		let scene = this._main.scene;
		let assets = this._main.assets;
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1];
		
		let vNear: vec3;
		let vFar: vec3;
		
		if (event) {
			vNear = camera.unproject(event.offsetX, event.offsetY, 0.0);
			vFar = camera.unproject(event.offsetX, event.offsetY, 0.1);
		} else if (position) {
			vNear = camera.unproject(position[0], position[1], 0.0);
			vFar = camera.unproject(position[0], position[1], 0.1);
		} else {
			return;
		}
		
		let vDir: vec3 = vec3.create();
		
		vec3.sub(vDir, vFar, vNear);
		vec3.normalize(vDir, vDir);
		
		let vInt: vec3 = vec3.create();
		let distance: number = plane.intersectTriangles(vNear, vDir, vInt);
		
		if (distance >= 0) {
			let mesh = this._assetMeshes[this._assetCategory][this._assetIndex - 1];
			
			if (mesh) {
				mesh.visible = true;
				
				mesh.setPosition(Math.floor(vInt[0] * 4) / 4 + 0.125, 0, Math.floor(vInt[2] * 4) / 4 + 0.125);
				mesh.colors = mesh.colorData.colorVariants[this._coloringIndex];
				
				mesh.updateBuffers();
				mesh.updateMatrices();
			}
		}
	}
	
	/*	* Pokazuje podglad na aktualnym fragmencie mapy
		* @param {MouseEvent} event
	 *	*/
	public rotateAsset (sign: number) : void {
		// W przypadku assetu 0, nie rób nic
		if (this._assetIndex == 0) return;
		
		let mesh = this._assetMeshes[this._assetCategory][this._assetIndex - 1];
		let tmp_quat: quat = quat.create();
			
		mesh.visible = true;
		
		quat.fromEuler(tmp_quat, 0, 90 * sign, 0);
		quat.mul(mesh.rotation, mesh.rotation, tmp_quat);
		
		mesh.updateBuffers();
		mesh.updateMatrices();
	}

}

export default Assets;
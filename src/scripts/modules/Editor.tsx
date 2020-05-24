
import App from '../App';

import Plane from '../primitives/Plane';

import { vec2, vec3, quat } from 'gl-matrix';

class Editor {
	private _main: App;
	
	private _coloringIndex: number;
	
	/*	* Tworzy nową instancję Editor
		*
	 *	*/
	public constructor (main: App) {
		this._main = main;
		
		this._coloringIndex = 0;
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
	
	/*	* Uaktualnia dany fragment mapy
		* @param {MouseEvent} event?
		* @param {vec2} position?
	 *	*/
	public tryToUpdateGridSquare (event?: MouseEvent, position?: vec2) : void {
		let assets = this._main.assets;
		// W przypadku assetu 0, nie rób nic
		if (assets.assetIndex == 0) return;
		
		let scene = this._main.scene;
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1] as Plane;
		
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
		let faceId: number = plane.intersect(vNear, vDir, vInt);
		
		if (faceId >= 0 && plane.hasUsedSquares == false) {
			let mesh = assets.assetMeshes[assets.assetCategory][assets.assetIndex - 1].clone(this._main.gl);
			let squares = assets.assetSquares[assets.assetCategory][assets.assetIndex - 1];
			let squareValue = assets.assetSquareValues[assets.assetCategory][assets.assetIndex - 1];
			
			if (mesh) {
				mesh.setPosition(Math.floor(vInt[0]) + 0.5, 0, Math.floor(vInt[2]) + 0.5);
				
				mesh.renderData.updateRenderingArrays();
				
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				scene.meshes.push(mesh);
				
				for (let x: number = squares[0] + 1; x < squares[1]; x++) {
					for (let y: number = squares[2] + 1; y < squares[3]; y++) {
						plane.updateSquareValue(faceId, x, y, squareValue);
					}
				}
				
			}
		}
	}
	
	/*	* Pokazuje podglad na aktualnym fragmencie mapy
		* @param {MouseEvent} event?
		* @param {vec2} position?
	 *	*/
	public tryToPreviewOnGridSquare (event?: MouseEvent, position?: vec2) : void {
		let assets = this._main.assets;
		// W przypadku assetu 0, nie rób nic
		if (assets.assetIndex == 0) return;
		
		let camera = this._main.camera;
		let plane = this._main.scene.meshes[1] as Plane;
		
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
		let faceId: number = plane.intersect(vNear, vDir, vInt);
		
		if (faceId >= 0) {
			let mesh = assets.assetMeshes[assets.assetCategory][assets.assetIndex - 1];
			let squares = assets.assetSquares[assets.assetCategory][assets.assetIndex - 1];
			let squareValue = assets.assetSquareValues[assets.assetCategory][assets.assetIndex - 1];
			
			if (mesh) {
				mesh.visible = true;
				
				mesh.setPosition(Math.floor(vInt[0]) + 0.5, 0, Math.floor(vInt[2]) + 0.5);
				mesh.vertexData.vertexColors = mesh.colorData.colorVariants[this._coloringIndex];
				
				mesh.renderData.updateRenderingArrays();
				mesh.updateBuffers();
				mesh.updateMatrices();
				
				plane.clearHighlight();
				for (let x: number = squares[0] + 1; x < squares[1]; x++) {
					for (let y: number = squares[2] + 1; y < squares[3]; y++) {
						plane.highlightSquare(faceId, x, y, squareValue);
					}
				}
				
				plane.updateBuffers();
				plane.updateMatrices();
			}
		}
	}
	
	/*	* Zapisuje mape do pliku tekstowego
		*
	 *	*/
	public saveMap () : void {
		let meshes = this._main.scene.meshes;
		let strArray: string[] = [];
		
		for (let i: number = 3; i < meshes.length; i++) {
			let mesh = meshes[i];
			
			let str = "";
			str += mesh.name + ";"
			str += mesh.position[0] + "," + mesh.position[1] + "," + mesh.position[2] + ";";
			str += mesh.rotation[0] + "," + mesh.rotation[1] + "," + mesh.rotation[2] + "," + mesh.rotation[3] + "\n";
			
			strArray.push(str);
		}
		
		let a = document.createElement("a");
		let file = new Blob(strArray, {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'map0.txt';
		a.click();
	}
	
	/*	* Wczytuje mape z pliku tekstowego
		* @param {WebGLRenderingContext} gl
		* @param {string} name
	 *	*/
	public loadMap (name: string) : void {
		let url: string = "/maps/" + name + ".txt";
		
		let request = new XMLHttpRequest();
		let self: Editor = this;
		
		request.addEventListener('load', function() {
			self.addAssetsFromString(this.response);
		});
		request.open('GET', url, true);
		request.responseType = "text";
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.setRequestHeader('Access-Control-Allow-Methods', '*');
		request.send(null);
	}
	
	/*	* Wczytuje mape z pliku tekstowego
		* @param {WebGLRenderingContext} gl
		* @param {string} assetStr
	 *	*/
	private addAssetsFromString(assetStr: string) {
		let i: number,
			name: string,
			strArr: string[] = assetStr.split("\n"),
			attStrArr: string[],
			posStrArr: string[],
			rotStrArr: string[];
			
		let scene = this._main.scene;
		let assets = this._main.assets;
		let plane = this._main.scene.meshes[1] as Plane;
		
		for (i = 0; i < strArr.length; i++) {
			if (strArr[i].length == 0) continue;
			
			attStrArr = strArr[i].split(";");
			
			name = attStrArr[0];
			
			let mesh = assets.getAssetByName(name).clone(this._main.gl);
			let squares = assets.assetSquares[assets.assetCategory][assets.assetIndex - 1];
			let squareValue = assets.assetSquareValues[assets.assetCategory][assets.assetIndex - 1];
			
			mesh.visible = true;
			
			posStrArr = attStrArr[1].split(",");
			rotStrArr = attStrArr[2].split(",");
			
			mesh.setPosition(
				parseFloat(posStrArr[0]),
				parseFloat(posStrArr[1]),
				parseFloat(posStrArr[2])
			);
			
			quat.set(
				mesh.rotation,
				parseFloat(rotStrArr[0]),
				parseFloat(rotStrArr[1]),
				parseFloat(rotStrArr[2]),
				parseFloat(rotStrArr[3])
			);
				
			mesh.renderData.updateRenderingArrays();
			
			mesh.updateBuffers();
			mesh.updateMatrices();
			
			scene.meshes.push(mesh);
		}
	}

}

export default Editor;

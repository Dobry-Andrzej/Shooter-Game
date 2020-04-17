
import Mesh from '../Mesh';

class ColorData {
	private _mesh: Mesh;
	
	private _colorVariants: Float32Array[];
	
	/*	* Tworzy nową instancję ColorData
		* @param {Mesh) mesh
	 *	*/
	public constructor (mesh: Mesh) {
		this._mesh = mesh;
		
		this._colorVariants = [];
	}
	
	/*	* Setter do colorVariants
		* @param {Float32Array[]} colorVariants
	 *	*/
	public set colorVariants (colorVariants: Float32Array[]) {
		this._colorVariants = colorVariants;
	}
	
	/*	* Getter do colorVariants
		* @returns {Float32Array}
	 *	*/
	public get colorVariants () : Float32Array[] {
		return this._colorVariants;
	}
	
	/*	* Oblicza varianty colorów dla mesha
		* @param {Mesh) mesh
	 *	*/
	public computeColorVariants () : void {
		let i: number;
		let color: number;
		let colorVariant: Float32Array;
		let vertices: Float32Array = this._mesh.vertices;
		
		colorVariant = new Float32Array(vertices.length);
		for (i = 0; i < vertices.length; i += 3) {
			color = i / vertices.length;
			colorVariant[i] = color;
			colorVariant[i + 1] = color;
			colorVariant[i + 2] = color;
		}
		
		this._colorVariants.push(colorVariant);
		
		colorVariant = new Float32Array(vertices.length);
		for (i = 0; i < vertices.length; i += 3) {
			color = (vertices.length - i - 1) / vertices.length;
			colorVariant[i] = color;
			colorVariant[i + 1] = color;
			colorVariant[i + 2] = color;
		}
		
		this._colorVariants.push(colorVariant);
		
		colorVariant = new Float32Array(vertices.length);
		for (i = 0; i < vertices.length; i += 3) {
			color = vertices[i + 1];
			colorVariant[i] = color;
			colorVariant[i + 1] = color;
			colorVariant[i + 2] = color;
		}
		
		this._colorVariants.push(colorVariant);
		
		colorVariant = new Float32Array(vertices.length);
		for (i = 0; i < vertices.length; i += 3) {
			color = 0.2 * vertices[i + 1] + 0.7 * (i / vertices.length) + 0.1;
			colorVariant[i] = color;
			colorVariant[i + 1] = color;
			colorVariant[i + 2] = color;
		}
		
		this._colorVariants.push(colorVariant);
		
		colorVariant = new Float32Array(vertices.length);
		for (i = 0; i < vertices.length; i += 3) {
			color = 0.2 * vertices[i + 1] + 0.4 * ((vertices.length - i - 1) / vertices.length) + 0.1;
			colorVariant[i] = color;
			colorVariant[i + 1] = color;
			colorVariant[i + 2] = color;
		}
		
		this._colorVariants.push(colorVariant);
	}
	
}

export default ColorData;

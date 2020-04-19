
import Mesh from '../Mesh';

class VertexData {
	private _mesh: Mesh;
	
	private _vertices: Float32Array;
	private _vertexColors: Float32Array;
	
	/*	* Tworzy nową instancję VertexData
		* @param {Mesh) mesh
	 *	*/
	public constructor (mesh: Mesh) {
		this._mesh = mesh;
		
		this._vertices = new Float32Array(0);
		this._vertexColors = new Float32Array(0);
	}
	
	/*	* Setter do vertices
		* @param {Float32Array} vertices
	 *	*/
	public set vertices (vertices: Float32Array) {
		this._vertices = vertices;
	}
	
	/*	* Getter do vertices
		* @returns {Float32Array}
	 *	*/
	public get vertices () : Float32Array {
		return this._vertices;
	}
	
	/*	* Setter do vertexColors
		* @param {Float32Array} vertexColors
	 *	*/
	public set vertexColors (vertexColors: Float32Array) {
		this._vertexColors = vertexColors;
	}
	
	/*	* Getter do vertexColors
		* @returns {Float32Array}
	 *	*/
	public get vertexColors () : Float32Array {
		return this._vertexColors;
	}
	
	/*	* Funkcja do zwracania kopii VertexData
		* @param {Mesh} mesh
		* @returns {VertexData}
	 *	*/
	public clone (mesh: Mesh) : VertexData {
		var vertexData = new VertexData(mesh);
		
		vertexData.vertices = new Float32Array(this._vertices);
		vertexData.vertexColors = new Float32Array(this._vertexColors);
		
		return vertexData;
	}
	
	/*	* Funkcja do zwracania ilosci vertexów
		* @param {Mesh) mesh
	 *	*/
	public getVertexAmount () : number {
		return this._vertices.length / 3;
	}
	
}

export default VertexData;

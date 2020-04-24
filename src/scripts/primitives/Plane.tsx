
import Mesh from '../mesh/Mesh';

class Plane extends Mesh {
	private _segmentsX: number;
	private _segmentsY: number;
	
	private _highlightedSquares: number[];
	private _squareUsage: Uint8Array;
	
	/*	* Tworzy nową instancję Plane
		* @param {string} name
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (name: string, gl: WebGLRenderingContext) {
		super(name, gl);
		
		// Set the shaderType to triangles and face colors
		this.renderData.useFaceColors = true;
		this.renderData.shaderType = 0;
		
		this._segmentsX = 0;
		this._segmentsY = 0;
		
		this._highlightedSquares = [];
		this._squareUsage = new Uint8Array(this.faceData.getFaceAmount());
	}
	
	/*	* Setter do squareUsage
		* @param {Uint8Array} squareUsage
	 *	*/
	public set squareUsage (squareUsage: Uint8Array) {
		this._squareUsage = squareUsage;
	}
	
	/*	* Getter do squareUsage
		* @returns {Uint8Array}
	 *	*/
	public get squareUsage () : Uint8Array {
		return this._squareUsage;
	}
	
	/*	* Generuje siatke na podstawie podanych wymiarów
		* @param {number} width
		* @param {number} height
		* @param {number} segmentsX
		* @param {number} segmentsY
	 *	*/
	public generate (width: number, height: number, segmentsX: number, segmentsY: number) : void {
		let x: number, y: number,
			triangleId: number, faceId: number,
			t3: number, t9: number, f3: number, f4: number, v3: number,
			
			offset: number = 0,
		
			xstep: number = width / segmentsX,
			ystep: number = height / segmentsY,
			halfWidth: number = width / 2,
			halfHeight: number = height / 2,
		
			vertexAmount: number = (segmentsX + 1) * (segmentsY + 1),
			quadAmount: number = segmentsX * segmentsY,
		
			vertices = new Float32Array(vertexAmount * 3),
			vertexColors = new Float32Array(vertexAmount * 3),
			vertexNormals = new Float32Array(vertexAmount * 3),
		
			faces = new Int32Array(quadAmount * 4),
			faceColors = new Float32Array(quadAmount * 3),
			
			triangles = new Uint32Array(quadAmount * 2 * 3),
			triangleColors = new Float32Array(quadAmount * 2 * 3),
			
			verticesToRender = new Float32Array(quadAmount * 2 * 9),
			colorsToRender = new Float32Array(quadAmount * 2 * 9),
			normalsToRender = new Float32Array(quadAmount * 2 * 9);
		
		for (x = 0; x <= segmentsX; x++) {
			for (y = 0; y <= segmentsY; y++) {
				vertices[offset] = -halfWidth + x * xstep;
				vertices[offset + 1] = 0;
				vertices[offset + 2] = -halfHeight + y * ystep;
				
				vertexNormals[offset] = 0;
				vertexNormals[offset + 1] = 1;
				vertexNormals[offset + 2] = 0;
				
				offset += 3;
			}
		}
		
		for (x = 0; x < segmentsX; x++) {
			for (y = 0; y < segmentsY; y++) {
				faceId = x * segmentsY + y;
				f3 = faceId * 3;
				f4 = faceId * 4;
				
				faces[f4] = x * (segmentsY + 1) + y;
				faces[f4 + 1] = (x + 1) * (segmentsY + 1) + y;
				faces[f4 + 2] = (x + 1) * (segmentsY + 1) + y + 1;
				faces[f4 + 3] = x * (segmentsY + 1) + y + 1;
				
				faceColors[f3] = faceId / quadAmount;
				faceColors[f3 + 1] = faceId / quadAmount;
				faceColors[f3 + 2] = faceId / quadAmount;
				
				triangleId = faceId * 2;
				t3 = triangleId * 3;
				t9 = triangleId * 9;
				
				triangles[t3] = faces[f4];
				triangles[t3 + 1] = faces[f4 + 1];
				triangles[t3 + 2] = faces[f4 + 2];
				
				triangleColors[t3] = faceColors[f3];
				triangleColors[t3 + 1] = faceColors[f3 + 1];
				triangleColors[t3 + 2] = faceColors[f3 + 2];
				
				v3 = faces[f4] * 3;
				
				verticesToRender[t9] = vertices[v3];
				verticesToRender[t9 + 1] = vertices[v3 + 1];
				verticesToRender[t9 + 2] = vertices[v3 + 2];
				
				colorsToRender[t9] = triangleColors[t3];
				colorsToRender[t9 + 1] = triangleColors[t3 + 1];
				colorsToRender[t9 + 2] = triangleColors[t3 + 2];
				
				normalsToRender[t9] = vertexNormals[v3];
				normalsToRender[t9 + 1] = vertexNormals[v3 + 1];
				normalsToRender[t9 + 2] = vertexNormals[v3 + 2];
				
				v3 = faces[f4 + 1] * 3;
				
				verticesToRender[t9 + 3] = vertices[v3];
				verticesToRender[t9 + 4] = vertices[v3 + 1];
				verticesToRender[t9 + 5] = vertices[v3 + 2];
				
				colorsToRender[t9 + 3] = triangleColors[t3];
				colorsToRender[t9 + 4] = triangleColors[t3 + 1];
				colorsToRender[t9 + 5] = triangleColors[t3 + 2];
				
				normalsToRender[t9 + 3] = vertexNormals[v3];
				normalsToRender[t9 + 4] = vertexNormals[v3 + 1];
				normalsToRender[t9 + 5] = vertexNormals[v3 + 2];
				
				v3 = faces[f4 + 2] * 3;
				
				verticesToRender[t9 + 6] = vertices[v3];
				verticesToRender[t9 + 7] = vertices[v3 + 1];
				verticesToRender[t9 + 8] = vertices[v3 + 2];
				
				colorsToRender[t9 + 6] = triangleColors[t3];
				colorsToRender[t9 + 7] = triangleColors[t3 + 1];
				colorsToRender[t9 + 8] = triangleColors[t3 + 2];
				
				normalsToRender[t9 + 6] = vertexNormals[v3];
				normalsToRender[t9 + 7] = vertexNormals[v3 + 1];
				normalsToRender[t9 + 8] = vertexNormals[v3 + 2];
				
				
				triangleId = faceId * 2 + 1;
				t3 = triangleId * 3;
				t9 = triangleId * 9;
				
				triangles[t3] = faces[f4];
				triangles[t3 + 1] = faces[f4 + 2];
				triangles[t3 + 2] = faces[f4 + 3];
				
				triangleColors[t3] = faceColors[f3];
				triangleColors[t3 + 1] = faceColors[f3 + 1];
				triangleColors[t3 + 2] = faceColors[f3 + 2];
				
				v3 = faces[f4] * 3;
				
				verticesToRender[t9] = vertices[v3];
				verticesToRender[t9 + 1] = vertices[v3 + 1];
				verticesToRender[t9 + 2] = vertices[v3 + 2];
				
				colorsToRender[t9] = triangleColors[t3];
				colorsToRender[t9 + 1] = triangleColors[t3 + 1];
				colorsToRender[t9 + 2] = triangleColors[t3 + 2];
				
				normalsToRender[t9] = vertexNormals[v3];
				normalsToRender[t9 + 1] = vertexNormals[v3 + 1];
				normalsToRender[t9 + 2] = vertexNormals[v3 + 2];
				
				v3 = faces[f4 + 2] * 3;
				
				verticesToRender[t9 + 3] = vertices[v3];
				verticesToRender[t9 + 4] = vertices[v3 + 1];
				verticesToRender[t9 + 5] = vertices[v3 + 2];
				
				colorsToRender[t9 + 3] = triangleColors[t3];
				colorsToRender[t9 + 4] = triangleColors[t3 + 1];
				colorsToRender[t9 + 5] = triangleColors[t3 + 2];
				
				normalsToRender[t9 + 3] = vertexNormals[v3];
				normalsToRender[t9 + 4] = vertexNormals[v3 + 1];
				normalsToRender[t9 + 5] = vertexNormals[v3 + 2];
				
				v3 = faces[f4 + 3] * 3;
				
				verticesToRender[t9 + 6] = vertices[v3];
				verticesToRender[t9 + 7] = vertices[v3 + 1];
				verticesToRender[t9 + 8] = vertices[v3 + 2];
				
				colorsToRender[t9 + 6] = triangleColors[t3];
				colorsToRender[t9 + 7] = triangleColors[t3 + 1];
				colorsToRender[t9 + 8] = triangleColors[t3 + 2];
				
				normalsToRender[t9 + 6] = vertexNormals[v3];
				normalsToRender[t9 + 7] = vertexNormals[v3 + 1];
				normalsToRender[t9 + 8] = vertexNormals[v3 + 2];
			}
		}
		
		this._segmentsX = segmentsX;
		this._segmentsY = segmentsY;
		
		this.vertexData.vertices = vertices;
		this.vertexData.vertexColors = vertexColors;
		this.vertexData.vertexNormals = vertexNormals;
		
		this.faceData.faces = faces;
		this.faceData.faceColors = faceColors;
		this.faceData.triangles = triangles;
		this.faceData.triangleColors = triangleColors;
		
		this.renderData.verticesToRender = verticesToRender;
		this.renderData.colorsToRender = colorsToRender;
		this.renderData.normalsToRender = normalsToRender;
		
	}
	
	/*	* Clear highlighta na planie
		*
	 *	*/
	public clearHighlight () : void {
		let t3: number, t9: number,
			faceId: number, triangleId: number,
			triangleColors = this.faceData.triangleColors;
		
		for (let i: number = 0; i < this._highlightedSquares.length; i++) {
			faceId = this._highlightedSquares[i];
			
			triangleId = faceId * 2;
			t3 = triangleId * 3;
			t9 = triangleId * 9;
			
			this.renderData.colorsToRender[t9] = triangleColors[t3];
			this.renderData.colorsToRender[t9 + 1] = triangleColors[t3 + 1];
			this.renderData.colorsToRender[t9 + 2] = triangleColors[t3 + 2];
			
			this.renderData.colorsToRender[t9 + 3] = triangleColors[t3];
			this.renderData.colorsToRender[t9 + 4] = triangleColors[t3 + 1];
			this.renderData.colorsToRender[t9 + 5] = triangleColors[t3 + 2];
			
			this.renderData.colorsToRender[t9 + 6] = triangleColors[t3];
			this.renderData.colorsToRender[t9 + 7] = triangleColors[t3 + 1];
			this.renderData.colorsToRender[t9 + 8] = triangleColors[t3 + 2];
			
			triangleId = faceId * 2 + 1;
			t3 = triangleId * 3;
			t9 = triangleId * 9;
			
			this.renderData.colorsToRender[t9] = triangleColors[t3];
			this.renderData.colorsToRender[t9 + 1] = triangleColors[t3 + 1];
			this.renderData.colorsToRender[t9 + 2] = triangleColors[t3 + 2];
			
			this.renderData.colorsToRender[t9 + 3] = triangleColors[t3];
			this.renderData.colorsToRender[t9 + 4] = triangleColors[t3 + 1];
			this.renderData.colorsToRender[t9 + 5] = triangleColors[t3 + 2];
			
			this.renderData.colorsToRender[t9 + 6] = triangleColors[t3];
			this.renderData.colorsToRender[t9 + 7] = triangleColors[t3 + 1];
			this.renderData.colorsToRender[t9 + 8] = triangleColors[t3 + 2];
		}
		
		this._highlightedSquares.length = 0;
	}
	
	/*	* Highlight na planie
		* @param {number} squareId
		* @param {number} xoffset
		* @param {number} yoffset
	 *	*/
	public highlightSquare (squareId: number, xoffset: number, yoffset: number) : void {
		let t9: number,
			faceId: number, triangleId: number;
			
		faceId = squareId + xoffset * this._segmentsY + yoffset;
		
		triangleId = faceId * 2;
		t9 = triangleId * 9;
		
		this.renderData.colorsToRender[t9] = 0;
		this.renderData.colorsToRender[t9 + 1] = 1;
		this.renderData.colorsToRender[t9 + 2] = 0;
		
		this.renderData.colorsToRender[t9 + 3] = 0;
		this.renderData.colorsToRender[t9 + 4] = 1;
		this.renderData.colorsToRender[t9 + 5] = 0;
		
		this.renderData.colorsToRender[t9 + 6] = 0;
		this.renderData.colorsToRender[t9 + 7] = 1;
		this.renderData.colorsToRender[t9 + 8] = 0;
		
		triangleId = faceId * 2 + 1;
		t9 = triangleId * 9;
		
		this.renderData.colorsToRender[t9] = 0;
		this.renderData.colorsToRender[t9 + 1] = 1;
		this.renderData.colorsToRender[t9 + 2] = 0;
		
		this.renderData.colorsToRender[t9 + 3] = 0;
		this.renderData.colorsToRender[t9 + 4] = 1;
		this.renderData.colorsToRender[t9 + 5] = 0;
		
		this.renderData.colorsToRender[t9 + 6] = 0;
		this.renderData.colorsToRender[t9 + 7] = 1;
		this.renderData.colorsToRender[t9 + 8] = 0;
		
		this._highlightedSquares.push(faceId);
	}
	
}

export default Plane;

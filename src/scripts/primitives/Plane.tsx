
import Mesh from '../mesh/Mesh';

class Plane extends Mesh {
	
	/*	* Tworzy nową instancję Plane
		* @param {string} name
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (name: string, gl: WebGLRenderingContext) {
		super(name, gl);
		
		// Set the shaderType to triangles
		this.renderData.shaderType = 0;
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
			t3: number, t9: number, f4: number, v3: number,
			
			offset: number = 0,
		
			xstep: number = width / segmentsX,
			ystep: number = height / segmentsY,
			halfWidth: number = width / 2,
			halfHeight: number = height / 2,
		
			vertexAmount: number = (segmentsX + 1) * (segmentsY + 1),
			quadAmount: number = segmentsX * segmentsY,
		
			vertices = new Float32Array(vertexAmount * 3),
			vertexColors = new Float32Array(vertexAmount * 3),
		
			faces = new Int32Array(quadAmount * 4),
			triangles = new Uint32Array(quadAmount * 3 * 2),
			
			verticesToRender = new Float32Array(quadAmount * 2 * 9),
			colorsToRender = new Float32Array(quadAmount * 2 * 9);
		
		for (x = 0; x <= segmentsX; x++) {
			for (y = 0; y <= segmentsY; y++) {
				vertices[offset] = -halfWidth + x * xstep;
				vertices[offset + 1] = 0;
				vertices[offset + 2] = -halfHeight + y * ystep;
				
				offset += 3;
			}
		}
		
		for (x = 0; x < segmentsX; x++) {
			for (y = 0; y < segmentsY; y++) {
				faceId = x * segmentsY + y;
				f4 = faceId * 4;
				
				faces[f4] = x * (segmentsY + 1) + y;
				faces[f4 + 1] = (x + 1) * (segmentsY + 1) + y;
				faces[f4 + 2] = (x + 1) * (segmentsY + 1) + y + 1;
				faces[f4 + 3] = x * (segmentsY + 1) + y + 1;
				
				triangleId = faceId * 2;
				t3 = triangleId * 3;
				t9 = triangleId * 9;
				
				triangles[t3] = faces[f4];
				triangles[t3 + 1] = faces[f4 + 1];
				triangles[t3 + 2] = faces[f4 + 2];
				
				v3 = faces[f4] * 3;
				
				verticesToRender[t9] = vertices[v3];
				verticesToRender[t9 + 1] = vertices[v3 + 1];
				verticesToRender[t9 + 2] = vertices[v3 + 2];
				
				colorsToRender[t9] = faceId / quadAmount;
				colorsToRender[t9 + 1] = faceId / quadAmount;
				colorsToRender[t9 + 2] = faceId / quadAmount;
				
				v3 = faces[f4 + 1] * 3;
				
				verticesToRender[t9 + 3] = vertices[v3];
				verticesToRender[t9 + 4] = vertices[v3 + 1];
				verticesToRender[t9 + 5] = vertices[v3 + 2];
				
				colorsToRender[t9 + 3] = faceId / quadAmount;
				colorsToRender[t9 + 4] = faceId / quadAmount;
				colorsToRender[t9 + 5] = faceId / quadAmount;
				
				v3 = faces[f4 + 2] * 3;
				
				verticesToRender[t9 + 6] = vertices[v3];
				verticesToRender[t9 + 7] = vertices[v3 + 1];
				verticesToRender[t9 + 8] = vertices[v3 + 2];
				
				colorsToRender[t9 + 6] = faceId / quadAmount;
				colorsToRender[t9 + 7] = faceId / quadAmount;
				colorsToRender[t9 + 8] = faceId / quadAmount;
				
				
				triangleId = faceId * 2 + 1;
				t3 = triangleId * 3;
				t9 = triangleId * 9;
				
				triangles[t3] = faces[f4];
				triangles[t3 + 1] = faces[f4 + 2];
				triangles[t3 + 2] = faces[f4 + 3];
				
				v3 = faces[f4] * 3;
				
				verticesToRender[t9] = vertices[v3];
				verticesToRender[t9 + 1] = vertices[v3 + 1];
				verticesToRender[t9 + 2] = vertices[v3 + 2];
				
				colorsToRender[t9] = faceId / quadAmount;
				colorsToRender[t9 + 1] = faceId / quadAmount;
				colorsToRender[t9 + 2] = faceId / quadAmount;
				
				v3 = faces[f4 + 2] * 3;
				
				verticesToRender[t9 + 3] = vertices[v3];
				verticesToRender[t9 + 4] = vertices[v3 + 1];
				verticesToRender[t9 + 5] = vertices[v3 + 2];
				
				colorsToRender[t9 + 3] = faceId / quadAmount;
				colorsToRender[t9 + 4] = faceId / quadAmount;
				colorsToRender[t9 + 5] = faceId / quadAmount;
				
				v3 = faces[f4 + 3] * 3;
				
				verticesToRender[t9 + 6] = vertices[v3];
				verticesToRender[t9 + 7] = vertices[v3 + 1];
				verticesToRender[t9 + 8] = vertices[v3 + 2];
				
				colorsToRender[t9 + 6] = faceId / quadAmount;
				colorsToRender[t9 + 7] = faceId / quadAmount;
				colorsToRender[t9 + 8] = faceId / quadAmount;
			}
		}
		
		this.vertexData.vertices = vertices;
		this.vertexData.vertexColors = vertexColors;
		
		this.faceData.faces = faces;
		this.faceData.triangles = triangles;
		
		this.renderData.verticesToRender = verticesToRender;
		this.renderData.colorsToRender = colorsToRender;
	}
	
}

export default Plane;

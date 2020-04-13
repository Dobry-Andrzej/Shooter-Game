
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
		let x: number;
		let y: number;
		
		let xstep: number = width / segmentsX;
		let ystep: number = height / segmentsY;
		let halfWidth: number = width / 2;
		let halfHeight: number = height / 2;
		
		let vertices: number[] = [];
		let colors: number[] = [];
		let offset: number = 0;
		
		let len: number = (2 * segmentsX * segmentsY + segmentsX + segmentsY) * 9;
		
		vertices.length = len;
		colors.length = len;
		
		for (x = 0; x < segmentsX; x++) {
			for (y = 0; y < segmentsY; y++) {
				// Pierwszy trójkąt
				vertices[offset] = -halfWidth + x * xstep;
				vertices[offset + 1] = 0;
				vertices[offset + 2] = -halfHeight + y * ystep;
				
				vertices[offset + 3] = -halfWidth + (x + 1) * xstep;
				vertices[offset + 4] = 0;
				vertices[offset + 5] = -halfHeight + y * ystep;
				
				vertices[offset + 6] = -halfWidth + (x + 1) * xstep;
				vertices[offset + 7] = 0;
				vertices[offset + 8] = -halfHeight + (y + 1) * ystep;
				
				colors[offset] = 0.2;
				colors[offset + 1] = 0.5;
				colors[offset + 2] = 0.3;
				
				colors[offset + 3] = 0.2;
				colors[offset + 4] = 0.5;
				colors[offset + 5] = 0.3;
				
				colors[offset + 6] = 0.2;
				colors[offset + 7] = 0.5;
				colors[offset + 8] = 0.3;
				
				// Drugi trójkąt
				vertices[offset + 9] = -halfWidth + x * xstep;
				vertices[offset + 10] = 0;
				vertices[offset + 11] = -halfHeight + y * ystep;
				
				vertices[offset + 12] = -halfWidth + (x + 1) * xstep;
				vertices[offset + 13] = 0;
				vertices[offset + 14] = -halfHeight + (y + 1) * ystep;
				
				vertices[offset + 15] = -halfWidth + x * xstep;
				vertices[offset + 16] = 0;
				vertices[offset + 17] = -halfHeight + (y + 1) * ystep;
				
				colors[offset + 9] = 0.2;
				colors[offset + 10] = 0.5;
				colors[offset + 11] = 0.3;
				
				colors[offset + 12] = 0.2;
				colors[offset + 13] = 0.5;
				colors[offset + 14] = 0.3;
				
				colors[offset + 15] = 0.2;
				colors[offset + 16] = 0.5;
				colors[offset + 17] = 0.3;
				
				offset += 18;
			}
		}
		
		this.vertices = new Float32Array(vertices);
		this.colors = new Float32Array(colors);
	}
	
}

export default Plane;

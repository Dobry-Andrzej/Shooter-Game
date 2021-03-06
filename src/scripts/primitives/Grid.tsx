
import Mesh from '../mesh/Mesh';

class Grid extends Mesh {
	
	/*	* Tworzy nową instancję Grid
		* @param {string} name
		* @param {WebGLRenderingContext} gl
	 *	*/
	public constructor (name: string, gl: WebGLRenderingContext) {
		super(name, gl);
		
		// Set the shaderType to wireframe only
		this.renderData.shaderType = 1;
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
		
		let verticesToRender: number[] = [];
		let offset: number = 0;
		
		verticesToRender.length = (2 * segmentsX * segmentsY + segmentsX + segmentsY) * 6;
		
		for (x = 0; x <= segmentsX; x++) {
			for (y = 0; y <= segmentsY; y++) {
				// wertykalne
				if (x < segmentsX) {
					
					verticesToRender[offset] = -halfWidth + x * xstep;
					verticesToRender[offset + 1] = 0;
					verticesToRender[offset + 2] = -halfHeight + y * ystep;
					
					verticesToRender[offset + 3] = -halfWidth + (x + 1) * xstep;
					verticesToRender[offset + 4] = 0;
					verticesToRender[offset + 5] = -halfHeight + y * ystep;
					
				}
				
				// horyzontalne
				if (y < segmentsY) {
					
					verticesToRender[offset + 6] = -halfWidth + x * xstep;
					verticesToRender[offset + 7] = 0;
					verticesToRender[offset + 8] = -halfHeight + y * ystep;
					
					verticesToRender[offset + 9] = -halfWidth + x * xstep;
					verticesToRender[offset + 10] = 0;
					verticesToRender[offset + 11] = -halfHeight + (y + 1) * ystep;
					
				}
				
				offset += 12;
			}
		}
		
		this.renderData.verticesToRender = new Float32Array(verticesToRender);
		this.renderData.colorsToRender = new Float32Array(verticesToRender.length);
	}
	
}

export default Grid;

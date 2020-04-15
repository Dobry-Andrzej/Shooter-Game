
import { vec3 } from 'gl-matrix';

/*	* Closure function
	* @returns {(vec3, vec3, vec3, vec3, vec3, vec3) => number}
 *	*/
const intersectTriangle = (function () {
	let epsilon = 1e-15;
	let edge0: vec3 = vec3.create();
	let edge1: vec3 = vec3.create();
	let vP: vec3 = vec3.create();
	let vT: vec3 = vec3.create();
	let vQ: vec3 = vec3.create();
	
	/*	* Function to check for triangle ray intersection
		* @param {vec3} origin
		* @param {vec3) dir
		* @param {vec3} vA
		* @param {vec3} vB
		* @param {vec3} vC
		* @param {vec3} vInt?
		* @returns {number}
	 *	*/
	return function (origin: vec3, dir: vec3, vA: vec3, vB: vec3, vC: vec3, vInt?: vec3) : number {
		// Generate edges
		vec3.sub(edge0, vC, vA);
		vec3.sub(edge1, vB, vA);
		
		vec3.cross(vP, dir, edge1);
		let det: number = vec3.dot(edge0, vP);
		if (det > -epsilon && det < epsilon) {
			return -1.0;
		}
		
		let invDet: number = 1.0 / det;
		vec3.sub(vT, origin, vA);
		
		let u: number = vec3.dot(vT, vP) * invDet;
		if (u < 0 - epsilon || u > 1 + epsilon) {
			return -1.0;
		}
		vec3.cross(vQ, vT, edge0);
		
		let v: number = vec3.dot(dir, vQ) * invDet;
		if (v < 0 - epsilon || u + v > 1 + epsilon) {
			return -1.0;
		}
		
		let t: number = vec3.dot(edge1, vQ) * invDet;
		if (t < 0 - epsilon) {
			return -1.0;
		}
		
		if (vInt) {
			vec3.scaleAndAdd(vInt, origin, dir, t);
		}
		
		return t;
	}
})();

export default {
	intersectTriangle: intersectTriangle
};

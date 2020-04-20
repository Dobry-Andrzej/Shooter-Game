
import ShaderBase from '../ShaderBase';

class StandardShader extends ShaderBase {
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
		super();
		
		this.primitiveType = "triangles";
		
		this.vertexSource = `
			attribute vec3 aVertexPosition;
			attribute vec3 aVertexColor;
			attribute vec3 aVertexNormal;
			
			uniform mat4 uProjectionMatrix;
			uniform mat4 uViewMatrix;
			uniform mat4 uModelMatrix;
			uniform mat3 uNormalMatrix;
			
			varying lowp vec3 vColor;
			varying lowp vec3 vNormal;
			
			void main(void) {
				vNormal = aVertexNormal;
				
				float nDotVP = max(0., dot(normalize(vNormal), normalize(vec3(.1, .5, .9))));
				
				vColor = vec3(.4, .4, .4) * nDotVP * aVertexColor;
				
				gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
			}
		`;
		this.fragmentSource = `
			varying lowp vec3 vColor;
			varying lowp vec3 vNormal;
			
			void main(void) {
				gl_FragColor = vec4(vColor, 1.0);
			}
		`;
	}
}

export default StandardShader;

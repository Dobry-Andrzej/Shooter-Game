
import ShaderBase from '../ShaderBase';

class WireframeShader extends ShaderBase {
	
	/*	* Tworzy nową instancję WireframeShader
		*
	 *	*/
	public constructor () {
		super();
		
		this.primitiveType = "lines";
		
		this.vertexSource = `
			attribute vec3 aVertexPosition;
			attribute vec3 aVertexColor;
			
			uniform mat4 uProjectionMatrix;
			uniform mat4 uModelViewMatrix;
			
			varying lowp vec3 vColor;
			
			void main(void) {
				vColor = aVertexColor;
				
				gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
			}
		`;
		this.fragmentSource = `
			varying lowp vec3 vColor;
			
			void main(void) {
				gl_FragColor = vec4(vColor, 1.0);
			}
		`;
	}
}

export default WireframeShader;

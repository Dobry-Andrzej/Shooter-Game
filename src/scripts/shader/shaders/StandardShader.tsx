
import ShaderBase from '../ShaderBase';

class StandardShader extends ShaderBase {
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
		super();
		
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

export default StandardShader;

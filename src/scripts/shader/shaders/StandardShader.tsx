
import ShaderBase from '../ShaderBase';

class StandardShader extends ShaderBase {
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
		super();
		
		this.vertexSource = `
			attribute vec4 aVertexPosition;
			attribute vec4 aVertexColor;
			
			uniform mat4 uProjectionMatrix;
			uniform mat4 uModelViewMatrix;
			
			varying lowp vec4 vColor;
			
			void main(void) {
				gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
				vColor = aVertexColor;
			}
		`;
		this.fragmentSource = `
			varying lowp vec4 vColor;
			
			void main(void) {
				gl_FragColor = vColor;
			}
		`;
	}
}

export default StandardShader;

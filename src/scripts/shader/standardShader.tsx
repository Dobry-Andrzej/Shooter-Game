
class StandardShader {
	private vertexSource: string;
	private fragmentSource: string;
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
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
	
	/*	* Getter do vertexSource
		* @returns {string}
	 *	*/
	public getVertexSource () : string {
		return this.vertexSource;
	}
	
	/*	* Getter do fragmentSource
		* @returns {string}
	 *	*/
	public getFragmentSource () : string {
		return this.fragmentSource;
	}
}

export default StandardShader;

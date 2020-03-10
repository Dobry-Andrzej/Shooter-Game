class StandardShader {
	private vertexSource: string;
	private fragmentSource: string;
	
	/*	* Tworzy nową instancję StandardShader
		*
	 *	*/
	public constructor () {
		this.vertexSource = `
			attribute vec3 position;
			
			void main() {
				gl_Position = vec4(position, 1.0);
			}
		`;
		this.fragmentSource = `
			precision mediump float;
			
			void main() {
				gl_FragColor = vec4(1.0);
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

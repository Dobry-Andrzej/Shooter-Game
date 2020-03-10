import App from '../app';

class Shader {
	private main: App;
	/*	* Tworzy nową instancję Shader
		* @param {App} main
	 *	*/
	public constructor (main: App) {
		this.main = main;
		
		console.log(main);
	}

}

export default Shader;

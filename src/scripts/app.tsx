import Shader from './shader/shader';

class App {	
	private gl: WebGLRenderingContext;
	private canvas: HTMLCanvasElement;
	
	private shader: Shader;
	
	/*	* Tworzy nową instancję App
		* @param {HTMLCanvasElement} canvas
	 *	*/
	public constructor (canvas: HTMLCanvasElement) {
		this.canvas = canvas as HTMLCanvasElement;
		this.gl = canvas.getContext('webgl') as WebGLRenderingContext;
		
		this.shader = new Shader(this);
		
		
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public initialize () {
		this.gl.clearColor(0, 0, 0, 1);
		
		// Odpad animationFrame jak juz wszystko jest zainicjowane
		this.animate();
	}
	
	/*	* Funkcja do zczytywania wydarzenia od zmiany rozmiaru okna
		*
	 *	*/
	private resize () {
		//
	}
	
	/*	* Funkcja do animowania frame'a
		*
	 *	*/
	private animate () {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		requestAnimationFrame(this.animate.bind(this));
	}

}

export default App;

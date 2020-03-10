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
		
		this.shader = new Shader(this, "standardShader");
		//TODO: Dodanie wszystkich pochodnych, takich jak np. eventy, fizyka, generator mapy, itp
	}
	
	/*	* Stworzenie i przypisanie wszystkich składowych aplikacji
		*
	 *	*/
	public initialize () : void {
		this.gl.clearColor(0, 0, 0, 1);
		
		// Podepnij odpowiedni shader
		this.shader.use();
		// Odpal animationFrame jak juz wszystko jest zainicjowane
		this.animate();
	}
	
	/*	* Getter do gl
		* @returns {WebGLRenderingContext}
	 *	*/
	public getGl () : WebGLRenderingContext {
		return this.gl;
	}
	
	/*	* Funkcja do zczytywania wydarzenia od zmiany rozmiaru okna
		*
	 *	*/
	private resize () : void {
		//
	}
	
	/*	* Funkcja do animowania frame'a
		*
	 *	*/
	private animate () : void {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		requestAnimationFrame(this.animate.bind(this));
	}

}

export default App;

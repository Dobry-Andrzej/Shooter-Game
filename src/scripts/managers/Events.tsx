
import App from '../App';

class Events {
	
	private _canvas: HTMLCanvasElement;
	
	/*	* Tworzy nową instancję Events
		* @param {App} main
	 *	*/
	public constructor (main: App) {
		this._canvas = main.canvas;
	}
	
	/*	* Dodaje event do canvasa
		* @param {string} type
		* @param {function} callback
	 *	*/
	public attachEvent (type: string, callback: (event: Event) => void) : void {
		this._canvas.addEventListener(type, callback, true);
	}

}

export default Events;

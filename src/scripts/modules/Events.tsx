
class Events {
	
	private _targets: any[];
	
	private _eventMap: {
		[key: number]: any
	};
	
	/*	* Tworzy nową instancję Events
		*
	 *	*/
	public constructor () {
		this._targets = [];
		
		this._eventMap = {};
	}
	
	/*	* Dodaje event do podanego targetu
		* @param {any} target
		* @param {string} type
		* @param {(any) => void} callback
	 *	*/
	public attachEvent (target: any, type: string, callback: (event: any) => void) : void {
		target.addEventListener(type, callback, true);
	}

}

export default Events;

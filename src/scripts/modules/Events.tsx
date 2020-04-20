
class Events {
	
	private _targets: any[];
	
	private _eventMap: {
		[key: string]: any
	}[];
	
	/*	* Tworzy nową instancję Events
		*
	 *	*/
	public constructor () {
		this._targets = [];
		
		this._eventMap = [];
	}
	
	/*	* Dodaje event do podanego targetu
		* @param {any} target
		* @param {string} type
		* @param {(any) => void} callback
		* @param {boolean}
	 *	*/
	public attachEvent (target: any, type: string, callback: (event: any) => void, useCapture: boolean = false) : void {
		target.addEventListener(type, callback, useCapture);
		
		let index: number = this._targets.indexOf(target);
		if (index == -1) {
			this._targets.push(target);
			this._eventMap.push({
				type: callback
			});
		} else {
			let map: {
					[key: number]: any
				} = this._eventMap[index];
			console.log(map);
		}
	}
	
	/*	* Usuwa wszystkie eventy z wszystkich elementów
		*
	 *	*/
	public detachAllEvents () : void {
		console.log("here");
	}

}

export default Events;

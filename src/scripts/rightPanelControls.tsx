
class RightPanelControls {
	private _hpElement: HTMLElement;
	
	public constructor () {
		this._hpElement = document.createElement("div");
	}

	public initialize () : void {
		this._hpElement = document.getElementById("rightPanelHP");
	}
    
}

export default RightPanelControls;

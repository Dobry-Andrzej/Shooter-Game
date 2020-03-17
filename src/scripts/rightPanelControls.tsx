
class RightPanelControls {
	public constructor () {
		
	}

	public setHp(hp: number) : void {
		let hpElement = document.getElementById("rightPanelHP");
		let hpProgress = document.getElementById("rightPanelHPProgress");
		
		if (hpElement) {
			hpElement.textContent = String(hp);
		}
		
		if (hpProgress) {
			(hpProgress as HTMLInputElement).value = String(hp);
		}
	}
    
}

export default RightPanelControls;

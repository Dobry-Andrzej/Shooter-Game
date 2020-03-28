
import App from './App';

let app: App | null = null;

function init(canvas: HTMLCanvasElement) {
	app = new App(canvas);
	app.initialize();
}

export default {
	init: init,
	app: app
};

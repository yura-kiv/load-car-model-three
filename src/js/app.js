import "../css/styles.css";
import "../css/canvas.css";
import "../css/app.css";
import { getCar, getPlane } from "./objects";
import Viewer from "./viewer";

export default class App {
  constructor() {
    this.viewer = new Viewer();
    getPlane(this.viewer);
    getCar(this.viewer);
  }
}

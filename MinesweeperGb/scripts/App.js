import Game from "./Game.js";
import { RevealTool, FlagTool } from "./tools.js";
import SpriteSheet from "./SpriteSheet.js";
import BoardView from "./BoardView.js";
import StatusPanel from "./StatusPanel.js";
import Toolbar from "./Toolbar.js";
import { SETTINGS } from "./utils.js";

//puting all together
class App {
    constructor() {
        this.game = new Game();
        this.tools = { reveal: new RevealTool(), flag: new FlagTool() }; //polymorphism
        this.spriteSheet = new SpriteSheet("images/sprites.png", 16, 3);

        this.boardView = new BoardView(document.querySelector("[data-board]"), this.spriteSheet);
        this.statusPanel = new StatusPanel(document.querySelector("[data-status-panel]"), this.spriteSheet);
        this.toolbar = new Toolbar(document.querySelector("[data-toolbar]"), this.tools);

        this.seedForm = document.querySelector("[data-seed-form]");
        this.seedInput = document.querySelector("[data-seed]");
        this.randomButton = document.querySelector("[data-random]");
    }

    start() {
        //css reads the tile size here, so sprites and cells sync
        document.documentElement.style.setProperty("--tile", `${this.spriteSheet.pixelSize}px`);

        this.boardView.build(SETTINGS.rows, SETTINGS.cols, (row, col, kind) => this.handleCellInput(row, col, kind));
        this.#bindControls();
        this.#startRandomGame();
    }

    startGame(seed) { //new board from this seed
        this.seedInput.value = seed;
        this.game.newGame(seed);
        this.render();
    }

    handleCellInput(row, col, kind) {
        //left click uses the chosen tool, right click is always the flag
        const tool = kind === "secondary" ? this.tools.flag : this.toolbar.current;
        tool.apply(this.game, row, col);
        this.render();
    }

    render() {
        this.boardView.render(this.game.grid, this.game.status);
        this.statusPanel.update(this.game);
    }

    static randomSeed() { //to set 6 random digits, big but looks short
        return Math.floor(Math.random() * 1_000_000);
    }

    #startRandomGame() { //new board with a brand new seed, impleemnt when clicking lil face
        this.startGame(App.randomSeed());
    }

    #readSeed() { //number in the box, or null if it is empty or not a whole number
        const seed = Number(this.seedInput.value);
        return this.seedInput.value !== "" && Number.isInteger(seed) && seed >= 0 ? seed : null;
    }

    #bindControls() {
        this.seedForm.addEventListener("submit", (event) => { //Play seed button 
            event.preventDefault();
            const seed = this.#readSeed(); //empty box = random board
            if (seed === null) this.#startRandomGame();
            else this.startGame(seed);
        });
        this.randomButton.addEventListener("click", () => this.#startRandomGame());
        this.statusPanel.face.addEventListener("click", () => this.#startRandomGame()); //click lil face = new board
    }
}

export default App;

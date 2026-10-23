import Grid from "./Grid.js";
import { SETTINGS, STATUS } from "./utils.js";

class Game {//rules of the game, tools and view call these
    constructor() {
        this.grid = null; //from newGame()
        this.status = STATUS.PLAYING;
        this.mines = SETTINGS.mines;
        this.flagsPlaced = 0;
    }
    //minecraft-like seed
    newGame(seed) { //seed to new board, mines are already hidden before you first click
        this.grid = new Grid(SETTINGS.rows, SETTINGS.cols);
        this.grid.placeMines(this.mines, seed);
        this.status = STATUS.PLAYING;
        this.flagsPlaced = 0;
    }

    revealCell(row, col) {
        if (this.status !== STATUS.PLAYING) return; //game is over, no more clicks

        const cell = this.grid.getCell(row, col);
        if (cell === null || cell.isRevealed || cell.isFlagged) return; //nothing to open

        if (cell.hasMine) { //note that first click can be a mine too
            cell.reveal();
            this.#loseGame();
            return;
        }

        this.grid.cascadeReveal(row, col);
        if (this.#isCleared()) this.#winGame();
    }

    toggleFlag(row, col) {
        if (this.status !== STATUS.PLAYING) return;

        const cell = this.grid.getCell(row, col);
        if (cell === null || cell.isRevealed) return; //an open cell cannot get a flag

        cell.toggleFlag();
        this.flagsPlaced += cell.isFlagged ? 1 : -1;
    }

    getMinesLeft() { //the counter on top of the board
        return this.mines - this.flagsPlaced;
    }

    #loseGame() { //shows all the mines when the status is GAMEOVER
        this.status = STATUS.GAMEOVER;
    }

    #winGame() {
        for (const cell of this.grid.getAllCells()) { //flag the mines left, so counter ends at 0
            if (cell.hasMine && !cell.isFlagged) {
                cell.toggleFlag();
                this.flagsPlaced++;
            }
        }
        this.status = STATUS.WON;
    }

    #isCleared() { //every cell without a mine is open
        return this.grid.getAllCells().every((cell) => cell.hasMine || cell.isRevealed);
    }
}

export default Game;

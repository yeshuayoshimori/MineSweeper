import { STATUS } from "./utils.js";

//the bar on top of the board of minesweeper grid
class StatusPanel {

    //little face, each differet status
    static FACES = { //if click on face, acts as random seed restart
        [STATUS.PLAYING]: "faceHappy",
        [STATUS.WON]: "faceCool",    
        [STATUS.GAMEOVER]: "faceDead",
    };

    static MESSAGES = {
        [STATUS.PLAYING]: "Beware of the mine...",
        [STATUS.WON]: "You win!",
        [STATUS.GAMEOVER]: "KABOOM! Game over...",
    };

    constructor(root, spriteSheet) {
        this.spriteSheet = spriteSheet;
        this.minesLeft = root.querySelector("[data-mines-left]");
        this.face = root.querySelector("[data-face]");
        this.message = root.querySelector("[data-message]");
    }

    update(game) { //calling after every click
        this.minesLeft.textContent = game.getMinesLeft();
        this.spriteSheet.draw(this.face, StatusPanel.FACES[game.status]);
        this.message.textContent = StatusPanel.MESSAGES[game.status];
        this.message.dataset.status = game.status; //css uses this to color the message differently
    }
}

export default StatusPanel;

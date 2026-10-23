import Tool from "./Tool.js";

class RevealTool extends Tool {
    constructor() {
        super("Reveal");
    }

    apply(game, row, col) { //open the cell
        game.revealCell(row, col);
    }
}

class FlagTool extends Tool {
    constructor() {
        super("Flag");
    }

    apply(game, row, col) { //flag or unflag the cell
        game.toggleFlag(row, col);
    }
}

export { RevealTool, FlagTool };

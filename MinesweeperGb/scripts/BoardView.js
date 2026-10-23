import SpriteSheet from "./SpriteSheet.js";      
import { STATUS } from "./utils.js";             

//drawing the board with divs with rows of tiles, putting sprites instead of colors
class BoardView {
    constructor(container, spriteSheet) {
        this.container = container;
        this.spriteSheet = spriteSheet;
        this.elements = []; //elements[row][col] is the div of that cell
    }

    build(rows, cols, onCellInput) { //makes the divs one time
        for (let row = 0; row < rows; row++) {
            const rowElement = document.createElement("div"); //one div per row, then the cells go inside
            rowElement.classList.add("tile-row");

            const rowOfElements = [];
            for (let col = 0; col < cols; col++) {
                const element = this.#createCellElement(row, col, onCellInput);
                rowOfElements.push(element);
                rowElement.appendChild(element);
            }

            this.elements.push(rowOfElements);
            this.container.appendChild(rowElement);
        }
    }

    render(grid, status) { //draw the right sprite on eevry cell on its div
        for (const cell of grid.getAllCells()) {
            this.spriteSheet.draw(this.elements[cell.row][cell.col], BoardView.#spriteFor(cell, status));
        }
    }

    #createCellElement(row, col, onCellInput) {
        const element = document.createElement("div");
        element.classList.add("tile");

        element.addEventListener("click", () => onCellInput(row, col, "primary")); //left click
        element.addEventListener("contextmenu", (event) => { //right click
            event.preventDefault(); //ignore teh browser menu
            onCellInput(row, col, "secondary");
        });
        return element;
    }

    static #spriteFor(cell, status) { //which sprite does this cell need right now
        if (status === STATUS.GAMEOVER) {
            if (cell.hasMine && !cell.isFlagged) return "mine";//show every mine locatiion
            if (cell.isFlagged && !cell.hasMine) return "wrongFlag";//flag on a safe cell
        }
        if (cell.isFlagged) return "flag";
        if (!cell.isRevealed) return "hidden";
        return cell.hasMine ? "mine" : SpriteSheet.numberName(cell.adjacentMines);
    }
}

export default BoardView;

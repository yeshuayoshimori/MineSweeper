class Cell { //one square of the board, holds data, not visual appeareance things
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.hasMine = false;
        this.adjacentMines = 0; //neighbours who have a mine
        this.isRevealed = false;
        this.isFlagged = false;
    }

    reveal() { //open cell
        this.isRevealed = true;
    }

    toggleFlag() { //put the flag on, n off
        this.isFlagged = !this.isFlagged;
    }
} 

export default Cell;

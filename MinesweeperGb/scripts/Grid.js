import Cell from "./Cell.js";

class Grid {

    //the 8 directions around a cell, diagonals too fore minesweeper
    static #DIRECTIONS = [-1, 0, 1]
        .flatMap((rowChange) => [-1, 0, 1].map((colChange) => [rowChange, colChange]))
        .filter(([rowChange, colChange]) => rowChange !== 0 || colChange !== 0);//row,col. [0, 0] is the cell

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        //list of rows and every row is a list of cells, ref loops
        this.cells = Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => new Cell(row, col))
        );
    }

    isInside(row, col) { //handle edge cases, true if is on the board
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    getCell(row, col) { //null, out of bounds
        return this.isInside(row, col) ? this.cells[row][col] : null;
    }

    getAllCells() { //flat list with every cell
        return this.cells.flat();
    }

    getNeighbours(row, col) { //up to 8 cells around, fewer on the edges
        return Grid.#DIRECTIONS
            .map(([rowChange, colChange]) => this.getCell(row + rowChange, col + colChange))
            .filter((neighbour) => neighbour !== null);
    }

    placeMines(count, seed) { //board is made before any click. e.g. one seed always gives the same board
        const random = Grid.#seededRandom(seed);
        const cells = this.getAllCells(); //copy of the list so shuffling does not move real cells

        for (let i = 0; i < count; i++) { //shuffle the first count places, those cells get mines
            const pick = i + Math.floor(random() * (cells.length - i));
            [cells[i], cells[pick]] = [cells[pick], cells[i]];
            cells[i].hasMine = true;
        }

        this.#countAdjacentMines();
    }

    cascadeReveal(row, col) { //opens the cell, and if it is a 0 it keeps opening around it
        const stack = [this.getCell(row, col)]; //last in first out, ref Bucket tool

        while (stack.length > 0) { //run so long as the stack has stuff in it
            const current = stack.pop();
            if (current.isRevealed || current.isFlagged) continue; //if open or flagged, skip 

            current.reveal();

            if (current.adjacentMines === 0) { //0 has no mines around, so all neighbours are safe to open
                stack.push(...this.getNeighbours(current.row, current.col)); //... to unpack individual pieces
            }
        }
    }

    #countAdjacentMines() { //fills the numbers every cell will show, alert mines
        for (const cell of this.getAllCells()) {
            cell.adjacentMines = this.getNeighbours(cell.row, cell.col)
                .filter((neighbour) => neighbour.hasMine).length;
        }
    }

    static #seededRandom(seed) { //giving the same random numbers for each same seed, great ref mulberry32
        let state = seed >>> 0;//be positive whole number
        return () => {
            state = (state + 0x6D2B79F5) >>> 0;//ref mulberry32, steady metronome for seeds random numbers
            let mixed = Math.imul(state ^ (state >>> 15), state | 1);
            mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
            return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296; //divide by max possible total. Also 0 up to 1 (0.324, etc)
        };
    }
}

export default Grid;

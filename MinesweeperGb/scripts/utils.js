//settings every other file shares, settings for board, ref PALETTE, kinda something like a MACROSS 
export const SETTINGS = Object.freeze({
    rows: 7, //9x7 like in the sprite. 9 columns wide, 7 rows tall
    cols: 9, //...
    mines: 10, //how many mines get hidden in the board
});

//the 3 states of the game
export const STATUS = Object.freeze({
    PLAYING: "PLAYING",
    WON: "WON",
    GAMEOVER: "GAMEOVER",
});

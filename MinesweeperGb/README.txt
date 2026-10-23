MINESWEEPER

-Repo:https://github.com/yeshuayoshimori/MineSweeper
Yeshua Nieto Medellin PG30

A Minesweeper made with HTML, CSS and JavaScript, using GameBoy style sprites on a 9 x 7 board. The game is in play.html.

#HOW TO RUN

It needs a web server and in order to properly see it since it uses JS, use this commands:

1. cd minesweeper (File path).

2.IN WINDOWS:
  npx http-server -c-1

2.IN MAC (I needed to do this):
  python3 -m http.server 8000

3.Select the http server it outputs and open it in a browser. IF IN MAC, then open http://localhost:8000

#How to use

-Left click opens a tile with the button you choose (Reveal or Flag). Right click always put a flag. Any flag you place will decrease the mine count even if there isn't one.
-A number shows how many of the 8 tiles around it have a mine. Open every safe tile to win. Open a mine and you lose.
-Click the face or Random board for a new layout for the game. The seed number decides where the mines are, so the same seed gives the same board. 
-The mines are placed before the first click, so beware, for the first click can be a mine.

#Not implemented and notes
-No timer, question marks or middle click auto open.
-One board only: 9 x 7 with 10 mines.
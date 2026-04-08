let numSelected = null
//const tileSelected = null

let errors = 0
/* const board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---"
]
let solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763"
,
] */
//let numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
//const board = generateSudoku(45)
window.onload = function() {
  setGame()
}
function setGame() {
  // Digits 1-9
  for (let i = 1; i <= 9; i++) {
    //<div id="1" class="number"></div>
    let number = document.createElement('div')
    number.id = i
    number.innerText = i
    number.addEventListener('click', selectNumber)
    number.classList.add('number')
    document.getElementById('digits').appendChild(number)
  }

  // Board 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement('div')
      tile.id = r.toString() + "-" + c.toString()
      if(board[r][c] != "-") {
        tile.innerText = board[r][c]
        tile.classList.add('tile-start')
      }
      if(r == 2 || r == 5) {
        tile.classList.add('horizontal-line')
      }
      if(c == 2 || c == 5) {
        tile.classList.add('vertical-line')
      }
      tile.addEventListener('click', selectTile)
      tile.classList.add('tile')
      document.getElementById('board').append(tile)
    }
  }
}

function selectNumber() {
  if(numSelected != null) {
    numSelected.classList.remove('number-selected')
  }
  numSelected = this
  numSelected.classList.add('number-selected')
}

function selectTile() {
  if(numSelected) {
    if(this.innerText != "") {
      return
    }

    // "0-0" "0-1" -- "3-1"
    let coords = this.id.split('-') //  return array ["0", "0"]

    //console.log(coords)
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])

    if(solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id
    } else {
      errors += 1
      if(errors < 10) {
        document.getElementById('errors').innerText = 'Errors: '+errors
      } else {
        errors = 9
        document.getElementById('errors').innerText = 'Errors: '+errors+'+'
      }
    }
  }
}

// Funktion til at shuffle et array
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Færdig Sudoku-løsning (2D array)
let solution2 = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

// Shuffle tallene 1-9
const shuffled = shuffle([1,2,3,4,5,6,7,8,9])

// Lav ny løsning med shuffle
let newSolution = [];

for (let i = 0; i < solution2.length; i++) {
  let newRow = "";
  for (let j = 0; j < solution2[i].length; j++) {
    let currentNumber = solution2[i][j];
    let newNumber = shuffled[currentNumber - 1];
    newRow += newNumber; // tilføj tallet som string
  }
  newSolution.push(newRow); // tilføj hele rækken som string
}

// Resultat i string-format
const solution = newSolution
// Antal tomme felter vi ønsker
const emptyCells = 35

// newSolution er array med strings, fx:
// ["387491625", "241568379", "569327418", ...]
let board = [];

// Gå igennem hver række
for (let i = 0; i < newSolution.length; i++) {
  let row = "";
  
  for (let j = 0; j < newSolution[i].length; j++) {
    // Fjern tal med en tilfældig chance
    if (Math.random() < emptyCells / 81) {
      row += "-";
    } else {
      row += newSolution[i][j];
    }
  }
  
  board.push(row);
}
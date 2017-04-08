//  Setting up player objects;

var col = document.getElementsByClassName("columns");



function Player(turn, shape, isHuman) {
    this.turn = turn;
    this.shape = shape;
    this.isHuman = isHuman;
}

var playerOne = new Player();
playerOne.turn = false;
playerOne.shape = "";
playerOne.isHuman = true;


var playerTwo = new Player();
playerTwo.turn = false;
playerTwo.shape = "";
playerTwo.isHuman = false;

//Game Function
var onePlayer = function() {
     document.querySelector(".player").style.visibility = "hidden";
     document.querySelector("table").style.visibility ="initial";
    playerTwo.isHuman = false;
    if (playerOne.turn) {
        playerMove(playerOne);
    } else {
        cpu();
    }
};

//setting up player VS player mode
var twoPlayer = function() {
    document.querySelector(".player").style.visibility = "hidden";
    document.querySelector("table").style.visibility ="initial";
    playerTwo.isHuman = true;
    if (playerOne.turn) {
        turns();
        playerMove(playerOne);
    } else {
        turns();
        playerMove(playerTwo);
        
    }
};

//Human player function
var playerMove = function(player) {
    turns();
    Array.prototype.map.call(col, function(el, i) {
        return col[i].onclick = function() {
            if (this.innerText === "") {
                if ((player.turn) && (player.isHuman)) {
                    this.innerText = player.shape;
                    checkWin(player.shape);
                    if (player.shape === playerOne.shape) {
                        playerOne.turn = false;
                        playerTwo.turn = true;
                        turns()
                    } else {
                        playerTwo.turn = false;
                        playerOne.turn = true;
                        turns()
                    }
                }
            }
            if (!playerTwo.isHuman) {
                onePlayer();
            } else {
                twoPlayer();
            }
        };
    });
};


// CPU AI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function cpu(){
 let startingBoard = Array.prototype.map.call(col, function(el, i){
     if(col[i].innerHTML === ""){
         return i
     } else {
         return col[i].innerHTML;
     }
 });

 
 function emptyIndexies(board){
    return board.filter(index => index != "O" && index != "X");
 }

 
 function minimax(newBoard, player){
     let playableSpot = emptyIndexies(newBoard);
     if(winning(newBoard, playerOne.shape)){
         return {score: -10}
     } else if(winning(newBoard, playerTwo.shape)){
         return{score: 10}
     } else if(playableSpot.length === 0){
         return {score: 0};
     }

     let moves = [];
     for(var i = 0; i < playableSpot.length; i++){
         let move={};
         move.index = newBoard[playableSpot[i]];
         newBoard[playableSpot[i]] = player;

         if(player === playerTwo.shape){
             let result = minimax(newBoard, playerOne.shape);
             move.score = result.score;
         } else {
             let result = minimax(newBoard, playerTwo.shape);
             move.score = result.score;
         }
         newBoard[playableSpot[i]] = move.index;

         moves.push(move);
     }
    let bestMove;
    if(player === playerTwo.shape){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else{


    let bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
 }
setTimeout(function squareSelect(){
    if(playerTwo.turn){
        let play = minimax(startingBoard, playerTwo.shape)
        col[play.index].innerHTML = playerTwo.shape;
        checkWin(playerTwo.shape)
        playerTwo.turn = false;
        playerOne.turn = true;
        turns();

    } 
 } , 1000);

 
}
 
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}
//##################################################################################################

function checkWin(shape) {

    var combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    var boardArr = [];
    for (var i = 0; i < col.length; i++) {
        boardArr.push(col[i].innerText);
    }
    //pushed index of X and O into serpreate arrays
    var indices = [];
    var idx = boardArr.indexOf(shape);
    while (idx != -1) {
        indices.push(idx);
        idx = boardArr.indexOf(shape, idx + 1);
    }
    if (indices.length === 5) {
        win(indices.length);
    }
    //Check combos
    var check = combos.map(function(elem, ind) {
        return indices.filter(function(el) {
            return combos[ind].indexOf(el) > -1;
        }).length == combos[ind].length;
    });


    //Find the winner
    check.map(function(el, i) {
        if (el) {
            win(shape, combos[i]);
        }
    });
}


//Declare Winner
var win = function(shape, combos) {
    //stop game
    playerOne.turn = false;
    playerTwo.turn = false;
    //announce winner

    if (shape === 5) {
        document.querySelector(".win").innerHTML = "<h1> Tie </h1>";
    } else {
        document.querySelector(".win").innerHTML = "<h1>" + shape + " Wins!</h1>";
        //highlight winning shape
        col[combos[0]].className += " showWin";
        col[combos[1]].className += " showWin";
        col[combos[2]].className += " showWin";
    }
    scoreBoard(shape);
    message();
    document.querySelector(".turn").innerHTML = ""

};

var scoreBoard = function(shape) {
    var xScore = Number(document.getElementById("xScore").innerText);
    var oScore = Number(document.getElementById("oScore").innerText);
    var tie = Number(document.getElementById("tie").innerText);
    if (shape === "X") {
        xScore++;
    } else if (shape === "O") {
        oScore++;
    } else {
        tie++;
    }
    document.getElementById("xScore").innerText = xScore;
    document.getElementById("oScore").innerText = oScore;
    document.getElementById("tie").innerText = tie;
};

var message = function(shape) {
    document.querySelector(".message").style.visibility = "visible";
    document.querySelector(".success").onclick = clear;
    document.querySelector(".alert").onclick = reset;
    document.querySelector("table").style.visibility ="hidden";
    document.querySelector(".turn").style.visibility ="hidden"
};

//clear game board for replay
var clear = function() {
    for (var i = 0; i < col.length; i++) {
        col[i].innerText = "";
    }
    playerOne.turn = true;
    document.querySelector(".message").style.visibility = "hidden";
    document.querySelector("table").style.visibility ="initial";
    document.querySelector(".turn").style.visibility ="initial";
   
   for(var i = 0; i < col.length; i++){
     col[i].classList.remove("showWin");
   }
       
    
};

let reset = () => {
   window.location.reload(true);
}


//PICK X OR O
function getValue() {
    playerOne.shape = this.value;
    if (playerOne.shape == "X") {
        playerOne.turn = true;
        playerTwo.shape = "O";
    } else {
        playerTwo.shape = "X";
        playerTwo.turn = true;
    }
    document.querySelector(".choose").style.visibility = "hidden";
    document.querySelector(".player").style.visibility = "visible";

}
function turns(){
   let turn =  document.querySelector(".turn");
   if(playerOne.turn){
       turn.innerHTML = `<h1 class="one">${playerOne.shape} GO!</h1>`
   } else {
       turn.innerHTML = `<h1 class="two">${playerTwo.shape} GO!</h1>`
   }
}


window.onload = function() {
    
    document.getElementById("playerTwo").onclick = twoPlayer;
    document.getElementById("playerOne").onclick = onePlayer;
    document.getElementById("clear").onclick = reset;
    document.getElementById("X").onclick = getValue;
    document.getElementById("O").onclick = getValue;
};
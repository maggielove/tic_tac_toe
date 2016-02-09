window.onload = function() {

var boxes = document.getElementsByClassName("box");
var boxOne = document.getElementsByClassName('box')[0];
var boxTwo = document.getElementsByClassName('box')[1];
var boxThree = document.getElementsByClassName('box')[2];
var boxFour = document.getElementsByClassName('box')[3];
var boxFive = document.getElementsByClassName('box')[4];
var boxSix = document.getElementsByClassName('box')[5];
var boxSeven = document.getElementsByClassName('box')[6];
var boxEight = document.getElementsByClassName('box')[7];
var boxNine = document.getElementsByClassName('box')[8];

Player1 = 'Player 1'; Player2 = 'Player 2'; players = [Player1, Player2]; curr_turn = '';

// Player1 = 'X'; Player2 = 'O'

comp1 = function(){
  x= get_pattern_1_move()
    // If there's no clear win for O
    if(x==-1){
      // Block X from winning
      x= get_pattern_2_move()
      // If the board does not match any of the patterns_2 patterns, computer moves to take position 4, or game is over.
        if(x==-1){x= get_move()}
    }
  // Once you have the integer representing position (from arrays above and get_pattern_1_move), make the move.
  move(x, X)
}

comp2= function(){
  x= get_pattern_1_move()
    // If there's no clear win for O
    if(x==-1){
      // Block X from winning
      x= get_pattern_2_move()
      // If the board does not match any of the patterns_2 patterns, computer moves to take position 4, or game is over.
        if(x==-1){x= get_move()}
    }
  // Once you have the integer representing position (from arrays above and get_pattern_1_move), make the move.
  console.log("Inside comp2 move");
  move(x, 0)
}

move= function(pos,x){
  if(x!=curr_turn){return false}
  // If the position argument is a number between 0 and 8, and that space on the board
  // // is available, add X or O to the position.
  if(+pos>=0&&+pos<=8&&!isNaN(+pos)&&board[+pos]==' '){
    board.splice(+pos,1,x)
    // Once X or O has been added to the board, change the current player to O if X just played, or to X if O just played.
      curr_turn= (x==Player1)? Player2 : Player1
      return true
  }
  return false
}

board_filled= function(){
  x = get_move()
  // If the index of the element containing ' ' is -1, meaning it is not found,
  ////no more moves can be made, and the game is over.
    if(x==-1){
      show()
        // Add a message indicating if there was a tie. If the winner doesn't match
        // // one of patterns_3 elements, above, there must have been a tie.
        console.log('Game over. Xs and Os tied.')
        return true
    }
  return false
}

get_pattern_1_move= function(){
  board_string= board.join('')
    for(i=0;i<patterns_1.length;i++){
      // Compare the moves that have been made to the patterns most likely to result in a win.
      array= board_string.match(patterns_1[i][0])
        // If the board pattern matches one of the patterns, return the position integer at [i][1], which will result in an automatic win.
        if(array){return patterns_1[i][1]}
    }
    // If no patterns match, return -1
  return -1
}

get_pattern_2_move= function(){
  board_string= board.join('')
    for(i=0;i<patterns_2.length;i++){
      array= board_string.match(patterns_2[i][0])
        if(array){return patterns_2[i][1]}
    }
  return -1
}

get_move= function(){
  if(board[4] == ' '){return 4}
  return board.indexOf(' ')
}

// exit= function(){process.exit()}

play= function(){
  var gameType;
  // show()
    /////// Allow user to choose game type (human v. human, comp v. comp, human v. comp)
    var playerGameChoice = window.prompt("Choose game type:\n Type 1 for human v. human, \n Type 2 for computer v. computer, \n Type 3 for human v. computer");
    gameType = determineGameType(playerGameChoice);
    console.log(gameType);
    // --If the gameType is human-computer, use the game process as written.
    if (gameType === "human-comp") {
      alert("You've selected Human v. Computer. You are Player 1. Click on a square to begin.");
      playHumanComp(Player1);
    //--If the gameType is computer-computer, use modified game flow that will let comp play itself.
    } else if (gameType === "comp-comp"){
      console.log("You've selected Computer v. Computer");
      playCompComp();
      }
      //--If the gameType is human-human, use modified game flow that will let a second player play.
      else if (gameType == "human-human"){
        assignPlayerMarker();
      }
}

function determineGameType(userSelection){
  // event.preventDefault();
  console.log(userSelection.toString());
  var gameType = '';
   if (userSelection == 1) {
      return gameType = "human-human";
    } else if (userSelection == 2) {
        return gameType = "comp-comp";
      } else if (userSelection == 3){
        return gameType = "human-comp";
      } else {
        console.log("Please enter 1, 2 or 3.")
      }
}

// If the user selects human v. computer game, follow this game flow:
var boxesClicked = 0;
function playHumanComp(){
  // var markHuman = function(){
  //   this.innerHTML = 'Human';
  // }
  for (var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click', function(marked, makeComputerMove){
      event.preventDefault();
      winnerFound();
      var marked = false;
      if (winner !== '') {
        return alert("Game over. " + winner + "s win!!");
      } else if (boxesClicked >= 9) {
        return alert("Game over. All boxes clicked.")
      } else {
        boxesClicked += 1;
        console.log('boxes clicked: ' + boxesClicked);
        // USE a CALLBACK FUNCTION that won't execute makeComputerMove() until after player marks square.

        this.innerHTML = 'Human';
        marked = true;
        console.log(marked);
        makeComputerMove();


        }
      })
    }
}


// If there are two of the same marker with a space in between, create a block or a win
// }
//  else if (boxOne.innerHTML == boxThree.innerHTML) {
//   boxTwo.innerHTML = 'Comp';
//   return playHumanComp(Player1);
// } else if (boxOne.innerHTML == boxSeven.innerHTML) {
//   boxFour.innerHTML = 'Comp';
//   return playHumanComp(Player1);
// } else if (boxSeven.innerHTML == boxNine.innerHTML) {
//   boxEight.innerHTML = 'Comp';
//   return playHumanComp(Player1);
// } else if (boxThree.innerHTML == boxNine.innerHTML){
//   boxSix.innerHTML = 'Comp';
//   return playHumanComp(Player1);


var makeComputerMove = function() {
  // check if middle space is empty
  if (boxFive.innerHTML == '4'){
    boxFive.innerHTML = 'Comp';
    // boxesClicked += 1;
    playHumanComp();
  } else if ( boxOne.innerHTML == boxTwo.innerHTML) {
    boxThree.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if ( boxOne.innerHTML == boxTwo.innerHTML){
    // look to see where there are 2 of the same in a row, col or diagonal to either block human or make a win for the computer.
    boxThree.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxOne.innerHTML == boxFour.innerHTML) {
    boxSeven.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxOne.innerHTML == boxFive.innerHTML) {
    boxNine.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxTwo.innerHTML == boxFive.innerHTML) {
    boxEight.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxThree.innerHTML == boxSix.innerHTML){
    boxNine.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxFour.innerHTML == boxFive.innerHTML){
    boxSix.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxSeven.innerHTML == boxEight.innerHTML){
    boxNine.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxThree.innerHTML == boxFive.innerHTML) {
    boxSeven.innerHTML = 'Comp';
    playHumanComp();
    return;
  // If there are no winning or blocking patterns, mark the first available square.
  } else if (boxOne.innerHTML == '0'){
    boxOne.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxTwo.innerHTML == '1') {
    boxTwo.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxThree.innerHTML == '2') {
    boxThree.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxFour.innerHTML == '3'){
    boxFour.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxFive.innerHTML == '4'){
    boxFour.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxSix.innerHTML == '5') {
    boxSix.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxSeven.innerHTML == '6'){
    boxSeven.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxEight.innerHTML == '7'){
    boxEight.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else if (boxNine.innerHTML == '8') {
    boxNine.innerHTML = 'Comp';
    playHumanComp();
    return;
  } else {
    alert('Game over.');
  }

}

// If the user selects computer versus computer, follow this game flow.
function playCompComp(){
  while (!winner() || !board_filled()){
    setTimeout(comp1(), 3000);
    show();
    setTimeout(comp2(), 3000);
    if (move(x, O)){
      if (winner()||board_filled()) {exit()} else {show(); console.log("Comp 2 just moved")}
        }
  }
} //ends playCompComp

playHumanHuman = function(curr_turn){
  alert('Take turns clicking to select your spot on the board, starting with ' + curr_turn);
  var boxes = document.getElementsByClassName("box");
  var boxesClicked = 0;
  for (var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click', function(){
      winnerFound();
      if (winner !== '') {
        alert("Game over. " + winner + "s win!!");
      } else if (boxesClicked === 9) {
        alert("Game over. All boxes clicked.")
      } else {
        boxesClicked += 1;
        console.log('boxes clicked:' + boxesClicked);
        if (curr_turn == Player2 ) {
          this.innerHTML = playerMarkers[0]
          console.log(this.innerHTML);
          return curr_turn = Player1;
        } else {
          this.innerHTML = playerMarkers[1]
          console.log(this.innerHTML);
          return curr_turn = Player2;
         }
      }
    })
  }
}

function selectFirstPlayer(){
  // event.preventDefault();
  var firstPlayerSelection = window.prompt("Please select which Player will go first. Enter 1 for Player1, or 2 for Player2.")
    if (firstPlayerSelection == 1){
      playHumanHuman(Player1);
      return curr_turn = Player1;
    } else if (firstPlayerSelection == 2){
      playHumanHuman(Player2);
      return curr_turn = Player2;
    }
  // playHumanHuman(curr_turn);
}

var playerMarkers = [];
var markerChoice = '';
function assignPlayerMarker(){
  var player = Player1;
  for (var i = 0; i < 2; i++){
    player = (player == Player2) ? Player1 : Player2;
    // player = markerChoice;
    markerChoice = window.prompt(player + ", please select a board marker by entering a single keyboard key input");
    playerMarkers.push(markerChoice);
    }
  selectFirstPlayer();
}

var winner = '';
winnerFound = function(){
  if ( boxOne.innerHTML == boxTwo.innerHTML){
    if ( boxTwo.innerHTML == boxThree.innerHTML){
       winner = boxOne.innerHTML;
     }
  } else if (boxOne.innerHTML == boxFour.innerHTML) {
      if ( boxFour.innerHTML == boxSeven.innerHTML ) {
         winner = boxSeven.innerHTML;
      }
    } else if (boxOne.innerHTML == boxFive.innerHTML) {
        if (boxFive.innerHTML == boxNine.innerHTML){
         winner = boxNine.innerHTML;
      }
    } else if (boxTwo.innerHTML == boxFive.innerHTML){
        if (boxFive.innerHTML == boxEight.innerHTML){
          winner = boxEight.innerHTML;
        }
    } else if (boxThree.innerHTML == boxSix.innerHTML){
        if (boxSix.innerHTML == boxNine.innerHTML) {
          winner = boxNine.innerHTML;
        }
    } else if (boxFour.innerHTML == boxFive.innerHTML) {
      if (boxFive.innerHTML == boxSix.innerHTML){
        winner = boxSix.innerHTML;
      }
    } else if (boxFive.innerHTML == boxThree.innerHTML) {
      if (boxThree.innerHTML == boxSeven.innerHTML){
        winner = boxSeven.innerHTML;
      }
    } else if (boxSeven.innerHTML == boxEight.innerHTML){
      if (boxEight.innerHTML == boxNine.innerHTML){
        winner = boxNine.innerHTML;
      }
    }
} //ends playHumanHuman

play()

// module.exports = {
//   play: play,
//   determineGameType: determineGameType,
//   assignPlayerMarker: assignPlayerMarker
// }

}; //ends window.onload

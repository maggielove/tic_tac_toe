window.onload = function() {

  var gameBoard =
    [
      "&nbsp", "&nbsp", "&nbsp",
      "&nbsp", "&nbsp", "&nbsp",
      "&nbsp", "&nbsp", "&nbsp"
    ]

  var gameType;

  Player1 = 'Player 1'; Player2 = 'Player 2'; players = [Player1, Player2]; curr_turn = Player2;

  var box = document.getElementsByClassName('box');
  var boxes = document.getElementsByClassName('box');
  var boxesClicked = 0;

  var row = document.getElementsByClassName('row');

  // These arrays will be used to determine computer moves and determine the winner
  var firstRowVals = [];
  var secondRowVals = [];
  var thirdRowVals = [];

  var firstColVals = [];
  var secondColVals = [];
  var thirdColVals = [];

  var leftDiagVals = [];
  var rightDiagVals = [];

  // var firstRowSum = 0;
  // var secondRowSum = 0;
  // var thirdRowSum = 0;
  //
  // var firstColSum = 0;
  // var secondColSum = 0;
  // var thirdColSum = 0;
  //
  // var leftDiagSum = 0;
  // var rightDiagSum = 0;

  var renderBoard = function(){
    for (var i = 0; i < gameBoard.length; i++){
      if (i % 3 === 0 ) {
        var row = document.createElement('div');
        document.body.appendChild(row);
        row.className = 'row';
        row.setAttribute('id', i);
      }
      var box = document.createElement('div');
      box.setAttribute('id', i);
      box.className = 'box';
      box.innerHTML = gameBoard[i];
      row.appendChild(box);
      // distinguish boxes by column
      if (box.id == '0' || box.id == '3' || box.id == '6'){
        box.classList.add('first-col');
      } else if (box.id == '1' || box.id == '4' || box.id == '7') {
        box.classList.add('second-col');
      } else {
        box.classList.add('third-col');
      }
      // distinguish boxes on the diagonal
      if (box.id == '4') {
        box.classList.add('left-diag', 'right-diag');
      }
      else if (box.id == '0'|| box.id == '8'){
        box.classList.add('left-diag');
      } else if (box.id == '2' || box.id == '6'){
        box.classList.add('right-diag');
      }
    }
  }

  var markBox = function(){
    for (var i = 0; i < gameBoard.length; i++){
      boxes[i].addEventListener('click', function(){
        // checkForWin();
        if (boxesClicked == 9 ){
          checkForWin();
        } else {
          this.innerHTML = playerMarkers[1];
          this.value = 1;
          console.log(this.value);
          curr_turn = Player2;
          }
          addMarkedClass();
          boxesClicked += 1;
          console.log('clicked boxes: ' + boxesClicked);
      })
    }
  }

  // Add a class to boxes that have been marked to later determine which boxes to total in the checkForWin function.
  var addMarkedClass = function(){
    for (var i = 0; i < gameBoard.length; i++){
      if ( (boxes[i].innerHTML !== '&nbsp;') && (!boxes[i].classList.contains('marked')) ){
        boxes[i].classList.add('marked');
      }
    }
  }

  var addValueToBoard = function(){
    for (var i = 0; i < gameBoard.length; i++){
        //  add to the total value of the row the clicked box is in.
        if ((boxes[i].parentNode.id == 0) && (boxes[i].innerHTML !== '&nbsp;')){
          firstRowVals.push(boxes[i].value);
          console.log('firstRowVals: ' + firstRowVals);
        } else if ((boxes[i].parentNode.id == 3) && (boxes[i].innerHTML !== '&nbsp;')){
          secondRowVals.push(boxes[i].value);
          console.log('secRowVals: ' + secondRowVals);
        }
        else if (boxes[i].innerHTML !== '&nbsp;'){
          thirdRowVals.push(boxes[i].value);
          console.log('thirdRow Vals: ' + thirdRowVals);
        }
       //  Add to the total value of the column the box is in.
       if (boxes[i].classList.contains('first-col') && (boxes[i].innerHTML !== '&nbsp;')){
         firstColVals.push(boxes[i].value);
         console.log('firstColVals: ' + firstColVals);
       } else if ((boxes[i].classList.contains('second-col')) && (boxes[i].innerHTML !== '&nbsp;')){
         secondColVals.push(boxes[i].value);
         console.log('secondColVals: ' + secondColVals);
       } else if(boxes[i].innerHTML !== '&nbsp;'){
         thirdColVals.push(boxes[i].value);
         console.log('thirdColVals: ' + thirdColVals);
       }
       // If the box is on a diagonal, add to the total value of the diagonal
       if (boxes[i].classList.contains('right-diag') && boxes[i].classList.contains('left-diag') && (boxes[i].innerHTML !== '&nbsp;') ){
         rightDiagVals.push(boxes[i].value);
         leftDiagVals.push(boxes[i].value);
         console.log('rightDiagVals: ' + rightDiagVals);
         console.log('leftDiagVals: ' + leftDiagVals);
       } else if (boxes[i].classList.contains('right-diag') && (boxes[i].innerHTML !== '&nbsp;')){
         rightDiagVals.push(boxes[i].value);
         console.log('rightDiagVals: ' + rightDiagVals);
       } else if (boxes[i].classList.contains('left-diag') && (boxes[i].innerHTML !== '&nbsp;')){
         leftDiagVals.push(boxes[i].value);
         console.log('leftDiagVals: ' + leftDiagVals);
       }
      //   console.log(curr_turn);
      //   if (gameType == 'human-comp'){
      //     playHumanComp();
      //   }

    }
  }

  renderBoard();

  markBox();

  // totalBoxes();

  // Player1 = 'X'; Player2 = 'O'

  play= function(){
      /////// Allow user to choose game type (human v. human, comp v. comp, human v. comp)
      var playerGameChoice = window.prompt("Choose game type:\n Type 1 for human v. human, \n Type 2 for computer v. computer, \n Type 3 for human v. computer");
      gameType = determineGameType(playerGameChoice);
      console.log(gameType);
      // --If the gameType is human-computer
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

  // CUTS from playHumanComp
  // else if ( firstRowSum == -2){
  //   // make a move in the empty spot in the first row
  // } else if (secondRowSum == -2){
  //
  // } else if (thirdRowSum == -2){
  //
  // } else if (firstColSum == -2){
  //
  // } else if (secondColSum == -2){
  //
  // } else if (thirdColSum == -2){
  //
  // } else if (leftDiagSum == -2){
  //
  // } else if (rightDiagSum == -2){
  //
  // }

  // If the user selects human v. computer game, follow this game flow:
  function playHumanComp(){
    // To test, let's hard code current turn to be Player2/ comp
    // curr_turn = Player2;
    if (boxesClicked == 9){
      checkForWin();
    } else {
      playerMarkers = ['C', 'H'];
      console.log(curr_turn);
      // The computer will be assigned Player2
      if (curr_turn == Player2){
        // totalBoxes();
        // First, the program should check to see where the computer can win.
        if (boxes[4].innerHTML == '&nbsp;'){
          boxes[4].innerHTML = 'C';
          boxes[4].value = -1;
          console.log('box 4: ' + boxes[4].value);
          addMarkedClass();
          curr_turn = Player1;
          } else {
            curr_turn = Player1;
            console.log('no moves left atm');
          }
          boxesClicked += 1;
          console.log('clicked boxes: ' + boxesClicked);
        }
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
    // winnerFound();
    // PSEUDO: if (winner), alert Game over, announce winner.
    // else if no winner but all boxes clicked, alert Game over, announce tie
        // if {
        // } else {
          // When boxes are clicked, they will display the player marker according to the markBox() function.
          boxesClicked += 1;
          console.log('boxes clicked:' + boxesClicked);
        // }
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
  var checkForWin = function(){
    var firstRowTotal = 0;

    var sumFirstRow = function(){
      firstRowVals.reduce(function(a, b){
        firstRowTotal = a + b;
        return firstRowTotal;
      })
    }
    addValueToBoard();
    if (firstRowVals.length === 3){
      sumFirstRow();
      console.log(firstRowTotal);

    }

    // var getFirstRowSum = function(){
    //   console.log('firstRowSum? ' + parseInt(firstRowSum));
    // }
    // Use the values of the sums of box values in each row, column or diagonal to determine the winner

    // console.log('second col sum: ' + secondColSum);
    // if (firstRowSum == 3 || secondRowSum == 3 || thirdRowSum == 3 ||
    //     firstColSum == 3 || secondColSum == 3 || thirdColSum == 3 ||
    //     leftDiagSum == 3 || rightDiagSum == 3
    // ) {
    //   winner = Player1;
    // } else if (
    //     firstRowSum == -3 || secondRowSum == -3 || thirdRowSum == -3 ||
    //     firstColSum == -3 || secondColSum == -3 || thirdColSum == -3 ||
    //     leftDiagSum == -3 || rightDiagSum == -3
    // ){
    //   winner = Player2;
    // } else {
    //   winner = '';
    // }
  } //ends checkForWin

  play()

  // module.exports = {
  //   play: play,
  //   determineGameType: determineGameType,
  //   assignPlayerMarker: assignPlayerMarker
  // }

}; //ends window.onload

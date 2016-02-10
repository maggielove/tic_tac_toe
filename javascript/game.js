window.onload = function() {

  var gameBoard =
    [
      "&nbsp", "&nbsp", "&nbsp",
      "&nbsp", "&nbsp", "&nbsp",
      "&nbsp", "&nbsp", "&nbsp"
    ]

  Player1 = 'Player 1'; Player2 = 'Player 2'; players = [Player1, Player2]; curr_turn = '';

  var box = document.getElementsByClassName('box');
  var boxes = document.getElementsByClassName('box');
  var boxesClicked = 0;

  var row = document.getElementsByClassName('row');

  // These sums will be used to determine computer moves and determine the winner
  var firstRowSum = 0;
  var secondRowSum = 0;
  var thirdRowSum = 0;

  var firstColSum = 0;
  var secondColSum = 0;
  var thirdColSum = 0;

  var leftDiagSum = 0;
  var rightDiagSum = 0;

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

  var clickCard = function(){
    for (var i = 0; i < gameBoard.length; i++){
      boxes[i].addEventListener('click', function(){
        checkForWin();
        if (winner == Player1 || winner == Player2 ){
          alert('Game over! ' + winner + ' wins!');
        } else {
          if (curr_turn == Player2 ) {
            this.innerHTML = playerMarkers[0];
            // Assign a value to the box to more determine the eventual winner.
            box.value = -1;
            curr_turn = Player1;
          } else {
            this.innerHTML = playerMarkers[1];
            box.value = 1;
            curr_turn = Player2;
           }
          //  add to the total value of the row the clicked box is in.
           if (this.parentNode.id == 0){
             firstRowSum += box.value;
             console.log('firstRowSum: ' + firstRowSum);
           } else if (this.parentNode.id == 3){
             secondRowSum += box.value;
             console.log('secondRowSum: ' + secondRowSum);
           } else {
             thirdRowSum += box.value;
             console.log('thirdRowSum: ' + thirdRowSum);
           }
          //  Add to the total value of the column the box is in.
          if (this.classList.contains('first-col')){
            firstColSum += box.value;
            console.log('firstColSum: ' + firstColSum);
          } else if (this.classList.contains('second-col')){
            secondColSum += box.value;
            console.log('secondColSum: ' + secondColSum);
          } else {
            thirdColSum += box.value;
            console.log('thirdColSum: ' + thirdColSum);
          }
          // If the box is on a diagonal, add to the total value of the diagonal
          if (this.classList.contains('right-diag') && (this.classList.contains('left-diag'))){
            rightDiagSum += box.value;
            leftDiagSum += box.value;
            console.log('rightDiagSum: ' + rightDiagSum);
            console.log('leftDiagSum: ' + leftDiagSum);
          }
          else if (this.classList.contains('right-diag')){
            rightDiagSum += box.value;
            console.log('rightDiagSum: ' + rightDiagSum);
          } else if (this.classList.contains('left-diag')){
            leftDiagSum += box.value;
            console.log('leftDiagSum: ' + leftDiagSum);
          }
           return curr_turn;
       }
      })
    }
  }

  renderBoard();

  clickCard();

  // Player1 = 'X'; Player2 = 'O'

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
  function playHumanComp(){
    // var markHuman = function(){
    //   this.innerHTML = 'Human';
    // }
    // for (var i = 0; i < boxes.length; i++){
    //   boxes[i].addEventListener('click', function(){
    //     event.preventDefault();
    //     winnerFound();
    //     // var marked = false;
    //     if (winner !== '') {
    //       alert("Game over. " + winner + "s win!!");
    //     } else if (boxesClicked >= 9) {
    //       alert("Game over. All boxes clicked.")
    //     } else {
    //       boxesClicked += 1;
    //       console.log('boxes clicked: ' + boxesClicked);
    //       // USE a CALLBACK FUNCTION that won't execute makeComputerMove() until after player marks square.
    //
    //       this.innerHTML = 'Human';
    //       curr_turn = Player2
    //       // marked = true;
    //       // console.log(marked);
    //       if (curr_turn == Player2) {
    //         makeComputerMove()
    //       }else {
    //         playHumanComp();
    //       }
    //       }
    //     })
    //   }
  }

  var makeComputerMove = function(){
    if (boxFive.innerHTML == '4'){
      boxFive.innerHTML = 'Comp';
      // boxesClicked += 1;
      // playHumanComp();
    }
  } // ends computer move

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
          // When cards are clicked, they will display the player marker according to the clickCard() function.
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
    // Use the values of the sums of box values in each row, column or diagonal to determine the winner
    if (firstRowSum == 3 || secondRowSum == 3 || thirdRowSum == 3 ||
        firstColSum == 3 || secondColSum == 3 || thirdColSum == 3 ||
        leftDiagSum == 3 || rightDiagSum == 3
    ) {
      winner = Player1;
    } else if (
        firstRowSum == -3 || secondRowSum == -3 || thirdRowSum == -3 ||
        firstColSum == -3 || secondColSum == -3 || thirdColSum == -3 ||
        leftDiagSum == -3 || rightDiagSum == -3
    ){
      winner = Player2;
    } else {
      winner = '';
    }
  } //ends playHumanHuman

  play()

  // module.exports = {
  //   play: play,
  //   determineGameType: determineGameType,
  //   assignPlayerMarker: assignPlayerMarker
  // }

}; //ends window.onload

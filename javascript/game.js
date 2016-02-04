// patterns_1: possible computer moves; patterns_2: player moves; patterns_3: winning patterns

patterns_1= [[(/ OO....../),0],[(/O..O.. ../),6], [(/......OO /),8],[(/.. ..O..O/),2], [(/ ..O..O../),0],[(/...... OO/),6], [(/..O..O.. /),8],[(/OO ....../),2], [(/ ...O...O/),0],[(/..O.O. ../),6], [(/O...O... /),8],[(/.. .O.O../),2], [(/O O....../),1],[(/O.. ..O../),3], [(/......O O/),7],[(/..O.. ..O/),5], [(/. ..O..O./),1],[(/... OO.../),3], [(/.O..O.. ./),7],[(/...OO .../),5]]
patterns_2= [[(/  X . X  /),1],[(/ XX....../),0],[(/X..X.. ../),6], [(/......XX /),8],[(/.. ..X..X/),2],[(/ ..X..X../),0], [(/...... XX/),6],[(/..X..X.. /),8],[(/XX ....../),2], [(/ ...X...X/),0],[(/..X.X. ../),6],[(/X...X... /),8], [(/.. .X.X../),2],[(/X X....../),1],[(/X.. ..X../),3], [(/......X X/),7],[(/..X.. ..X/),5],[(/. ..X..X./),1], [(/... XX.../),3],[(/.X..X.. ./),7],[(/...XX .../),5], [(/ X X.. ../),0],[(/ ..X.. X /),6],[(/.. ..X X /),8], [(/ X ..X.. /),2],[(/  XX.. ../),0],[(/X.. .. X /),6], [(/.. .XX   /),8],[(/X  ..X.. /),2],[(/ X  ..X../),0], [(/ ..X..  X/),6],[(/..X..  X /),8],[(/X  ..X.. /),2]]
patterns_3= [[(/OOO....../),'O'], [(/...OOO.../),'O'], [(/......OOO/),'O'], [(/O..O..O../),'O'], [(/.O..O..O./),'O'], [(/..O..O..O/),'O'], [(/O...O...O/),'O'], [(/..O.O.O../),'O'], [(/XXX....../),'X'], [(/...XXX.../),'X'], [(/......XXX/),'X'], [(/X..X..X../),'X'], [(/.X..X..X./),'X'], [(/..X..X..X/),'X'], [(/X...X...X/),'X'], [(/..X.X.X../),'X']]
board= [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']; Player1 = 'X'; Player2 = 'O'; players = [Player1, Player2]; curr_turn = '';

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
board_display= function(){return ' '+board[0]+' |'+' '+board[1]+' |'+' '+board[2]+'\n===+===+===\n'+' '+board[3]+' |'+' '+board[4]+' |'+' '+board[5]+'\n===+===+===\n'+' '+board[6]+' |'+' '+board[7]+' |'+' '+board[8]}
show= function(){console.log(board_display())}
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
winner= function(){
  board_string= board.join('')
    the_winner= null
    for(i=0;i<patterns_3.length;i++){
      array= board_string.match(patterns_3[i][0])
        if(array){the_winner= patterns_3[i][1]}
    }
  if(the_winner){
    show()
    // Add a message saying who won the game.
      console.log('Game over. ' + the_winner + 's win!')
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

exit= function(){process.exit()}

play= function(){
  var gameType;
  show()
    /////// Allow user to choose game type (human v. human, comp v. comp, human v. comp)
    console.log("Choose game type:\n Type 9 for human v. human, \n Type 10 for computer v. computer, \n Type 11 for human v. computer")
    process.stdin.on('data', function(input){
      gameType = determineGameType(input);
    console.log(gameType);
    // --If the gameType is human-computer, use the game process as written.
    if (gameType === "human-comp") {
      console.log("You've selected Human v. Computer");
      playHumanComp();
    //--If the gameType is computer-computer, use modified game flow that will let comp play itself.
    } else if (gameType === "comp-comp"){
      console.log("You've selected Computer v. Computer");
      playCompComp();
      }
      //--If the gameType is human-human, use modified game flow that will let a second player play.
      else if (gameType == "human-human"){
        assignPlayerMarker(Player1);
        // assignPlayerMarker(Player2);
        // selectFirstPlayer();
      }
    })
}

function determineGameType(userSelection){
  // event.preventDefault();
  console.log(userSelection.toString());
  var gameType = '';
   if (userSelection == 9) {
      return gameType = "human-human";
    } else if (userSelection == 10) {
        return gameType = "comp-comp";
      } else if (userSelection == 11){
        return gameType = "human-comp";
      } else {
        console.log("Please enter 9, 10 or 11.")
      }
}

// If the user selects human v. computer game, follow this game flow:
function playHumanComp(){
  console.log("Enter [0-8] to choose your spot on the board:")
  /////// ALLOW USER TO CHOOSE WHICH PLAYER GOES FIRST
  /////// ALLOW USER TO DECIDE WHAT MARKER EACH PLAYER WILL MARK SELECTIONS ON THE BOARD WITH.
  process.stdin.on('data',function(res){
    if(move(res, X)){
      if(winner()||board_filled()) {exit()} else {
        comp2()
      if (move(x, O)){
        if (winner()||board_filled()) {exit()} else {show()}
        }
      }
    }
  })
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
  console.log(curr_turn + ", enter [0-8] to choose your spot on the board:")
  process.stdin.on('data', function(res){
    if(move(res, curr_turn)){
       if(winner()|| board_filled()) {exit()} else {
       show();
       playHumanHuman(curr_turn);
     }
    }
  })

  // while(!winner() || !board_filled()){
  //   show();
  //   console.log(curr_turn + ", enter [0-8] to choose your spot on the board:")
  //   process.stdin.on('data', function(res){
  //     if(move(res, curr_turn)){
  //        if(winner()|| board_filled()) {exit()} else {
  //        show();
  //       }
  //     }
  //     // console.log(curr_turn + ", enter [0-8] to choose your spot on the board:")
  //   })
  // }

  //  console.log(curr_turn + ", enter [0-8] to choose your spot on the board:")
  //  process.stdin.on('data',function(res){
  //    if(move(res, curr_turn)){
  //      if(winner()|| board_filled()) {exit()} else {
  //        show();
  //        console.log(curr_turn + ", enter [0-8] to choose your spot on the board: ")
  //        process.stdin.on('data', function(res){
  //          if (move(res, curr_turn)) {
  //            if(winner() || board_filled()) {exit()} else {
  //              show();
  //             //  Add more specific instructions for show/ make a loop so instructions are clear...
  //            }
  //          }
  //        })
  //     }
  //   }
  //  }); //ends function(res)
}

function selectFirstPlayer(){
  // event.preventDefault();
  console.log("Please select which Player will go first. Enter 1 for Player1, or 2 for Player2.")

  process.stdin.on('data', function(res){
    if (res == 1){
      playHumanHuman(Player1);
      return curr_turn = Player1;
    } else if (res == 2){
      playHumanHuman(Player2);
      return curr_turn = Player2;
    }
  });
  // playHumanHuman(curr_turn);
}

var playerCount = 0;
function assignPlayerMarker(player){
  //  event.preventDefault();
    if (playerCount < 2) {
      console.log("This is the player: " + player);
      console.log(player + ", please select a board marker by entering a single keyboard key input")
    process.stdin.on('data', function(res){
      console.log("New player marker: " + res);
      assignPlayerMarker(Player2);
      playerCount += 1;
      // return player = res;
      // assignPlayerMarker
      // if (player == Player2) {
      //   selectFirstPlayer();
      // }
    })
 } else {
   selectFirstPlayer();
 }
}

play()

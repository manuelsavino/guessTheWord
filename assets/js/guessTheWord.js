var words = ["word", "dog", "potato", "house", "javascript", "computer"]

var game = {
    word: "",
    wordLetters: [],
    rightGuesses: [],
    wrongGuesses: [],
    placeHolder: [],
    wins: 0,
    losses: 0,
    gamesPlayed: 0
}

var gamePlay = true;

console.log(game)

function newGame() {
    newGamePrep();

    document.onkeyup = function (event) {
        var status = game.rightGuesses.length
        if (event.which >= 65 && event.which <= 90) {
            var keyPressed = (event.key).toLocaleLowerCase()
        } else {
            alert("Only letters A-Z are allowed")
        }

        // var place;

        if (game.placeHolder.indexOf("_") != -1) {
            for (i = 0; i < game.wordLetters.length; i++) {
                if (keyPressed === game.wordLetters[i]) {
                    game.rightGuesses.push(i);
                    game.placeHolder[i] = keyPressed;
                    document.getElementById("word").innerHTML = game.placeHolder;
                    document.getElementById("message").innerHTML = ""
                }
            }
            if (status === game.rightGuesses.length)//items on right guesses didnt change
            {
                if (game.wrongGuesses.length != 9)//If you still have more tries
                {
                    if (game.wrongGuesses.indexOf(keyPressed) == -1)//letter is not on the array, hasnt been pressed 
                    {
                        var gameStatus = (100 - (game.wrongGuesses.length * 10))
                        game.wrongGuesses.push(keyPressed);
                        document.getElementById("message").innerHTML = "";
                        document.getElementById("wrong").innerHTML = game.wrongGuesses;
                        if (gameStatus <= 50 && gameStatus > 30) {
                            document.getElementById("progress").classList.remove("bg-success")
                            document.getElementById("progress").classList.add("bg-warning")
                        }
                        else if (gameStatus <= 30) {
                            document.getElementById("progress").classList.remove("bg-warning")
                            document.getElementById("progress").classList.add("bg-danger")
                        }
                        document.getElementById("progress").setAttribute("style", `width: ${gameStatus}%`);

                    }
                    else {//letter is on the array meaning it was tried already
                        document.getElementById("message").innerHTML = "Letter already tried";
                    }
                }
                else //no more tries, you loose
                {
                    while (gamePlay) {
                        gameOver();
                    }

                }
            }


        }
        else {//No more letters to find
            while (gamePlay) {
                winsGame();
            }
        }
        if (game.placeHolder.indexOf("_") == -1) {
            while (gamePlay) {
                winsGame();
            }
        }

    }
}
function gameOver() {
    var displayLetters = ""
    console.log("game over")
    for (i = 0; i < game.wordLetters.length; i++) {
        displayLetters += game.wordLetters[i] + " ";
    }
    document.getElementById("word").innerHTML = displayLetters;
    document.getElementById("status").style.backgroundColor = "#e74c3c";
    game.losses++
    document.getElementById("loses").innerHTML = game.losses;
    document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed
    gamePlay = false;
    document.getElementById("progress").setAttribute("style", "width:0%")
}

function winsGame() {
    document.getElementById("status").style.backgroundColor = "#27ae60";
    document.getElementById("progress").classList.remove("bg-danger")
    document.getElementById("progress").classList.remove("bg-warning")
    document.getElementById("progress").classList.add("bg-success")
    document.getElementById("progress").setAttribute("style", "width: 100%;");
    game.wins++
    document.getElementById("wins").innerHTML = game.wins;
    document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed;
    gamePlay = false;

}

function newGamePrep() {
    document.getElementById("status").style.backgroundColor = "#e9ecef";
    document.getElementById("progress").classList.remove("bg-danger")
    document.getElementById("progress").classList.remove("bg-warning")
    document.getElementById("progress").classList.add("bg-success")
    document.getElementById("progress").setAttribute("style", "width: 100%;");
    game.word = words[Math.floor(Math.random() * words.length)]
    game.wordLetters = [];
    game.rightGuesses = [];
    game.placeHolder = [];
    game.wrongGuesses = [];
    game.gamesPlayed += 1;
    document.getElementById("message").innerHTML = ""
    document.getElementById("wrong").innerHTML = ""
    gamePlay = true;


    //splits the word into letters into the wordLetters array
    for (i = 0; i < game.word.length; i++) {
        game.wordLetters.push(game.word.charAt(i))
    }
    //puts the right amount of _ on the placeHolder array
    for (i = 0; i < game.wordLetters.length; i++) {
        game.placeHolder.push("_")
    }
    var place = ""
    for (i = 0; i < game.placeHolder.length; i++) {
        place += "_ "
    }
    console.log(game.wordLetters)
    document.getElementById("word").innerHTML = place;
}





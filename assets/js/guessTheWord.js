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

function newGame() {
    newGamePrep();
    document.onkeyup = function (event) {
        var status = game.rightGuesses.length
        if (event.which >= 65 && event.which <= 90) {
            var keyPressed = (event.key).toLocaleLowerCase()
        } else {
            alert("Only letters A-Z are allowed")
        }



        if (game.placeHolder.indexOf("_") != -1) {
            for (i = 0; i < game.wordLetters.length; i++) {
                if (keyPressed === game.wordLetters[i]) {
                    game.rightGuesses.push(i);
                    game.placeHolder[i] = keyPressed;
                    document.getElementById("word").innerHTML = game.placeHolder
                    document.getElementById("message").innerHTML = ""
                }
            }
            if (status === game.rightGuesses.length)//items on right guesses didnt change
            {
                if (game.wrongGuesses.length < 7)//If you still have more tries
                {
                    if (game.wrongGuesses.indexOf(keyPressed) == -1)//letter is not on the array, hasnt been pressed 
                    {
                        game.wrongGuesses.push(keyPressed);
                        document.getElementById("message").innerHTML = "";
                        document.getElementById("wrong").innerHTML = game.wrongGuesses;
                    }
                    else {//letter is on the array meaning it was tried already
                        document.getElementById("message").innerHTML = "Letter already tried";
                    }
                }
                else //no more tries, you loose
                {
                    gameOver();
                }
            }


        }
        else {//No more letters to find
            winsGame();
        }
        if (game.placeHolder.indexOf("_") == -1) {
            winsGame();
        }

    }

    function gameOver() {
        var displayLetters = ""
        console.log("game over")
        for (i = 0; i < game.wordLetters.length; i++) {
            displayLetters += game.wordLetters[i] + " ";
        }
        document.getElementById("word").innerHTML = displayLetters;
        document.getElementById("status").style.backgroundColor = "red";
        game.losses++
        gamesPlayed++   
        document.getElementById("loses").innerHTML = game.losses;
        document.getElementById("gamesPlayed").innerHTML = game.gamesPlaye
        //console.log(game.losses)
    }

    function newGamePrep() {
        document.getElementById("status").style.backgroundColor = "white";
        game.word = words[Math.floor(Math.random() * words.length)]
        game.wordLetters = [];
        game.rightGuesses = [];
        game.placeHolder = [];
        game.wrongGuesses = [];
        game.gamesPlayed += 1;
        document.getElementById("message").innerHTML = ""
        document.getElementById("wrong").innerHTML = ""


        //splits the word into letters into the wordLetters array
        for (i = 0; i < game.word.length; i++) {
            game.wordLetters.push(game.word.charAt(i))
        }
        //puts the right amount of _ on the placeHolder array
        for (i = 0; i < game.wordLetters.length; i++) {
            game.placeHolder.push("_")
        }
        console.log(game.wordLetters)
        document.getElementById("word").innerHTML = game.placeHolder
    }

    function winsGame() {
        document.getElementById("status").style.backgroundColor = "green";
        game.wins++
        game.gamesPlayed++
        document.getElementById("wins").innerHTML = game.wins;
        document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed;

    }
}


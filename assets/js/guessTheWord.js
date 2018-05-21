var words = ["word", "dog", "potato", "house", "javascript", "computer"]

var game = {
    word: "",
    wordLetters: [],
    rightGuesses: [],
    wrongGueeses: [],
    placeHolder: [],
    wins: 0,
    losses: 0,
    gamesPlayed: 0
}

function newGame() {
    newGamePrep();
    document.onkeyup = function (event) {
        if (event.which >= 65 && event.which <= 90) {
            var keyPressed = (event.key).toLocaleLowerCase()
        } else {
            alert("Only letters A-Z are allowed")
        }

        var status = game.rightGuesses.length;
        for (i = 0; i < game.wordLetters.length; i++) {
            if (keyPressed === game.wordLetters[i]) {
                console.log(keyPressed);
                game.rightGuesses.push(i);
                game.placeHolder[i] = keyPressed;
                document.getElementById("word").innerHTML = game.placeHolder
                document.getElementById("message").innerHTML = ""

                if (game.placeHolder.indexOf("_") === -1) {
                    winsGame();
                    return;
                }
            }

        }
        console.log("Status of wordLetters " + game.rightGuesses.length)
        if (game.rightGuesses.length === status) {
            if (game.wrongGueeses.length < 7) {
                if (game.wrongGueeses.indexOf(keyPressed) === -1) {
                    game.wrongGueeses.push(keyPressed);
                    document.getElementById("message").innerHTML = "";
                }
                else {
                    document.getElementById("message").innerHTML = "Letter already tried";
                }
                document.getElementById("wrong").innerHTML = game.wrongGueeses;
            }
            else {
                gameOver();
                return;
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
        document.getElementById("status").style.backgroundColor = "red";
        game.losses++
        document.getElementById("loses").innerHTML = game.losses;
        //console.log(game.losses)
    }

    function newGamePrep() {
        document.getElementById("status").style.backgroundColor = "white";
        game.word = words[Math.floor(Math.random() * words.length)]
        game.wordLetters = [];
        game.rightGuesses = [];
        game.placeHolder = [];
        game.wrongGueeses = [];
        game.gamesPlayed += 1;
        document.getElementById("message").innerHTML = ""
        document.getElementById("wrong").innerHTML = ""

        //picks a random word from the words array
        game.word = words[Math.floor(Math.random() * words.length)]

        //splits the word into letters into the wordLetters array
        for (i = 0; i < game.word.length; i++) {
            game.wordLetters.push(game.word.charAt(i))
        }

        //puts the right amount of _ on the placeHolder array
        for (i = 0; i < game.wordLetters.length; i++) {
            game.placeHolder.push("_")
        }
        document.getElementById("word").innerHTML = game.placeHolder
    }

    function winsGame() {
        document.getElementById("status").style.backgroundColor = "green";
        game.wins++
        document.getElementById("wins").innerHTML = game.wins;

    }
}



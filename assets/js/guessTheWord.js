var words = ["Russia", "Uruguay", "Egypt", "Portugal", "Spain", "Iran", "Morocco", "France", "Peru", "Denmark", "Australia", "Argentina", "Croatia", "Iceland", "Nigeria", "Brazil", "Switzerland", "Serbia", "Germany", "Mexico", "Sweden", "Belgium", "England", "Tunisia", "Panama", "Poland", "Colombia", "Senegal", "Japan"]

var game = {
    word: "",
    wordLetters: [],
    rightGuesses: [],
    wrongGuesses: [],
    placeHolder: [],
    wins: 0,
    losses: 0,
    gamesPlayed: 0,
    gamePlay: true
}




function newGame() {
    newGamePrep();
    $('#exampleModal').modal({ show: false })

    document.onkeyup = function (event) {
        var status = game.rightGuesses.length
        if (event.which >= 65 && event.which <= 90) {
            var keyPressed = (event.key).toLocaleLowerCase()
        } else {
            //alert("Only letters A-Z are allowed")
            $('#exampleModal').modal('show');
        }

        var place = ""

        if (game.placeHolder.indexOf("_") != -1) {
            for (i = 0; i < game.wordLetters.length; i++) {
                if (keyPressed === game.wordLetters[i]) {
                    game.rightGuesses.push(i);
                    game.placeHolder[i] = keyPressed;
                    //document.getElementById("word").innerHTML = game.placeHolder;
                    document.getElementById("message").innerHTML = ""
                }
            }

            for (i = 0; i < game.placeHolder.length; i++) {
                if(game.placeHolder[i] === "_")
                {
                    place += "_ "
                    console.log(place)
                }
                else
                {
                    place += game.placeHolder[i] + " "
                }
                
            }
            console.log(game.wordLetters)
            document.getElementById("word").innerHTML = place;
            
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
                    while (game.gamePlay) {
                        gameOver();
                    }

                }
            }


        }
        else {//No more letters to find
            while (game.gamePlay) {
                winsGame();
            }
        }
        if (game.placeHolder.indexOf("_") == -1) {
            while (game.gamePlay) {
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
    game.gamesPlayed += 1;
    document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed
    game.gamePlay = false;
    game.placeHolder = game.wordLetters.slice(0);
    document.getElementById("progress").setAttribute("style", "width:0%")
    document.getElementById("redCard").style.display = "block"
    document.getElementById("redCard").classList.add("zoomInDown")
    var audio = new Audio('assets/sounds/gameover.mp3');
    audio.play();
    setTimeout(function () {
        document.getElementById("redCard").classList.remove("zoomInDown")
        document.getElementById("redCard").classList.add("bounceOutLeft")
    }, 3000);
    
}

function winsGame() {
    document.getElementById("status").style.backgroundColor = "#27ae60";
    document.getElementById("progress").classList.remove("bg-danger")
    document.getElementById("progress").classList.remove("bg-warning")
    document.getElementById("progress").classList.add("bg-success")
    document.getElementById("progress").setAttribute("style", "width: 100%;");
    document.getElementById("ball").style.display = "block"
    document.getElementById("ball").classList.add("zoomInDown")
    setTimeout(function () {
        document.getElementById("ball").classList.remove("zoomInDown")
        document.getElementById("ball").classList.add("bounceOutRight")
    }, 2000);

    game.wins++
    document.getElementById("wins").innerHTML = game.wins;
    game.gamesPlayed += 1;
    document.getElementById("gamesPlayed").innerHTML = game.gamesPlayed;
    game.gamePlay = false;

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
    
    document.getElementById("message").innerHTML = ""
    document.getElementById("wrong").innerHTML = ""
    game.gamePlay = true;


    //splits the word into letters into the wordLetters array
    for (i = 0; i < game.word.length; i++) {
        game.wordLetters.push(game.word.charAt(i).toLowerCase())
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





var words = ["word", "dog", "potato","house","javascript","computer"]

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

game.word = words [Math.floor(Math.random() * words.length)]


function newGame(){
    game.wordLetters = [];
    game.rightGuesses = [];
    game.placeHolder = [];
    game.wrongGueeses = [];
    game.gamesPlayed += 1;
    game.word = words [Math.floor(Math.random() * words.length)]
    for(i=0; i < game.word.length; i++)
    {
        game.wordLetters.push(game.word.charAt(i))
    }
    for(i = 0; i< game.wordLetters.length; i++)
    {
        game.placeHolder.push("_")
    }
    document.getElementById("word").innerHTML = game.placeHolder

    console.log(game.wordLetters);
    document.onkeyup = function(event){

        var keyPressed = (event.key).toLocaleLowerCase()
            for(i=0; i< game.wrongGueeses.length; i++)
            {
                if(keyPressed === game.wrongGueeses[i] )
                {
                    document.getElementById("message").innerHTML = "Letter already tried"
                }
            }
       
            //console.log(keyPressed)
            for(i = 0; i< game.wordLetters.length; i++)
            {
                if(keyPressed === game.wordLetters[i])
                {
                    console.log(keyPressed);
                    game.rightGuesses.push(i);
                    game.placeHolder[i] = keyPressed;
                    document.getElementById("word").innerHTML = game.placeHolder
                    document.getElementById("message").innerHTML = ""
                }
                else
                {
                    game.wrongGueeses.push(keyPressed)
                }
                
            }
            //console.log(game.rightGuesses.length)
            console.log(game.wrongGueeses)
                
        


    }
}


var words = ["word1", "dog", "potato"]

var game = {
    word: "",
    wordLetters: [],
    guesses: [],
    wins: 0,
    losses: 0,
    gamesPlayed: 0
}

game.word = words [Math.floor(Math.random() * words.length)]
// for(i=0; i < game.word.length; i++)
//     {
//         game.wordLetters.push(game.word.charAt(i))
//     }

//     console.log(game.wordLetters);
console.log(game.word);
newGame();

function newGame(){
    game.gamesPlayed += 1;
    game.word = words [Math.floor(Math.random() * words.length)]

    for(i=0; i < game.word.length; i++)
    {
        game.wordLetters.push(game.word.charAt(i))
    }

    

    console.log(game.wordLetters);
    document.onkeyup = function(event){

        var keyPressed = (event.key).toLocaleLowerCase()

        game.wordLetters.forEach(function(element)
        {
            for(i = 0; i< game.wordLetters.length; i++)
            {
                if(element === i)
                game.guesses.push(i);
            }

                
        })


    }
}
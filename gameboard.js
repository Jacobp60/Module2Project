$(document).ready(function(){
    createBoard();
    let numOfClicks =10;
    let numOfBones = 0;

function playerGuess()
{
    let clickedSpan = $(this);
    if(numOfBones === 5){
        gameOver();

    }
    if(numOfClicks <= 0)
    {
        $("p#clicksLeft").text("OUT OF CLICKS");
        clickedSpan.off("click");
        progressBar();
        gameOver();
    }else{
        let isSurprise = clickedSpan.hasClass("surprise");

        if (isSurprise === true)
        {
            clickedSpan.addClass("foundBone");
            clickedSpan.off("click");
            numOfBones ++;
            progressBar();
        }else{
            clickedSpan.addClass("dugout");
            clickedSpan.off("click");
            progressBar();
        }
        $("p#clicksLeft").text(`Number of Clicks Left: ${numOfClicks}`);
        $("p#remainingBones").text(`Number of Bones found!: ${numOfBones}`);
        numOfClicks--;
    }

}
function progressBar(){
    let initial = $('#myBar').css('width');
    let update = `initial += 10`;
    $('div#myBar').css(update,'width');
}


function createSquare(number){
    let board = $("div#board");
    let square = $("<span>");
    let squareWidth = Math.round(window.innerWidth/(5+2))
    let squareHeight = Math.round(window.innerHeight/(5+2));
    let bestDimension = Math.min(squareWidth,squareHeight)
    board.append(square);
    square.height(bestDimension);
    square.width(bestDimension);
    square.addClass("square");
    square.text(`${number}`);
    square.click(playerGuess);


}
function gameOver()
{
    let square = $("*span");
    square.off("click");
    if(numOfBones === 5)
    {
        $("p#finalMessage").text(`GOOOD BOYY! You found all the Bones!`);
    }else{
        $("p#finalMessage").text(`BAD BOY! Better luck next Time`);
    }

}
function createBoard()
{
    let boxNum = 0;

    for(let j = 0; j < 5; j++)
    {

        for(let i = 0; i < 5; i++)
        {
            boxNum++;
            createSquare(boxNum);
        }
        let breaktag = $("<br>");
        $("div#board").append(breaktag)
    }
    for(let numBones = 0; numBones < 5; numBones++)
    {
        let randomNumber = Math.floor(Math.random() * 25);

        let randomSquare = $("span.square").eq(randomNumber);

        if(!randomSquare.hasClass("surprise"))
        {
            randomSquare.addClass("surprise")
        }
    }

}

});



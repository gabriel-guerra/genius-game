var colors = [];
var answers = [];
var endGame = false;

$("body").on("keypress", startGame);

function startGame(){
    colors = [];
    answers = []; 
    endGame = false;
 
    $("body").off("keypress", startGame);
    $("#level-title").text("Level 1");
    nextLevel(colors);
    playGame(colors);
}

async function playGame(){
    $(".btn").on("click", handleButtonClick);
}

async function handleButtonClick(event){
    let color = event.target.id;
    answers.push(color);

    playSound(color);

    $("#" + event.target.id).addClass("pressed");
    setTimeout(function (){
            $("#" + event.target.id).removeClass("pressed");
        }, 100
    );

    checkAnswers();

    if (colors.length == answers.length && !endGame){
        $("#level-title").text("Level " + (colors.length+1));
        await timeBetweenColors();
        await nextLevel(colors);
        answers = [];
    }
}

async function nextLevel(colors){
    addColor(colors);
    playColors(colors);
}

function generateColor(){
    switch (Math.floor(Math.random()*4)){
        case 0:
            return "green";
        case 1:
            return "red";
        case 2:
            return "yellow";
        case 3: 
            return "blue";
    }
}

function addColor(colors){
    colors[colors.length] = generateColor();
    console.log("Level " + colors.length + ", colors: " + colors);
}

async function playColors(colors){
    
    for (let color of colors){
        if (!endGame){
            switch (color){
                case "green":
                    playSound(color);
    
                    $("#green").addClass("pressed");
                    setTimeout(function (){
                        $("#green").removeClass("pressed");    
                        }, 100
                    );
    
                break;
                case "red":
                    playSound(color);
    
                    $("#red").addClass("pressed");
                    setTimeout(function (){
                            $("#red").removeClass("pressed");      
                        }, 100
                    );
                break;
                case "yellow":
                    playSound(color);
                    
                    $("#yellow").addClass("pressed");
                    setTimeout(function (){
                            $("#yellow").removeClass("pressed");      
                        }, 100
                    );
                break;
                case "blue":
                    playSound(color);
    
                    $("#blue").addClass("pressed");
                    setTimeout(function (){
                            $("#blue").removeClass("pressed");      
                        }, 100
                    );
                break;
            }
    
            await timeBetweenColors();
        }        
    }

}

function playSound(sound){
    let audio = new Audio("./sounds/" + sound + ".mp3");
    audio.volume = 0.18;
    audio.play();
}

async function timeBetweenColors() {
    await new Promise(resolve => setTimeout(resolve, 750));
}

function checkAnswers(){
    for (let i = 0; i<answers.length; i++){
        if (colors[i] !== answers[i]){
            gameOver(answers);
            break;
        }
    }
}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function (){
            $("body").removeClass("game-over");      
        }, 200
    );
    playSound("wrong");
    $(".btn").off("click");
    endGame = true;
    $("body").on("keypress", startGame);
}
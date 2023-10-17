var boy=document.getElementById("boy");
var background=document.getElementById("background");
var idleImageNumber=1;
var idleAnimationNumber=0;
var runImageNumber=1;
var runAnimationNumber=0;
var backgroundImagePositionX=0;
var moveBackgroundAnimationId=0;
var jumpAnimationNumber=0;
var jumpImageNumber=1;
var boyMarginTop=460;
var trap;
var trapMarginLeft=1700;
var trapAnimationId = 0;
var currentMarginLeft;
var newMarginLeft;
deathImageNumber = 1;
deadAnimationNumber = 0;
var score=0;

let sound_background= new Audio('assets/Sound/retro-background-219.wav');
let sound_Jump= new Audio('assets/Sound/jump-223.wav');
let sound_fail= new Audio('assets/Sound/fail-game.mp3');

// document.getElementById('play-button').addEventListener('click', function() {
//     document.querySelector('#home-page').style.display = 'hidden';
//     document.querySelector('.background').style.display = 'block';
// });

sound_background.play();

// Idle Animation

function idleAnimation() {
    boy.src="assets/images/Boy/Idle (" +idleImageNumber + ").png";

    idleImageNumber=idleImageNumber+1;

    if (idleImageNumber===11){
        idleImageNumber=1;
    }
}

function idleAnimationStart() {
    idleAnimationNumber=setInterval(idleAnimation,100);
}


//Run Animation

function runAnimation() {
    sound_background.play();
    boy.src="assets/images/Boy/Run (" + runImageNumber + ").png";

    runImageNumber=runImageNumber+1;

    if(runImageNumber===8){
        runImageNumber=1;
    }
}

function runAnimationStart() {
    runAnimationNumber=setInterval(runAnimation,100);

    clearInterval(idleAnimationNumber);
}

function keyCheck(event) {

    let keyCode=event.which;

    if (keyCode===13){
        if (runAnimationNumber===0){
            runAnimationStart();
        }

        if(moveBackgroundAnimationId==0){
            moveBackgroundAnimationId=setInterval(moveBackground,100);
        }
        if(trapAnimationId===0){
            trapAnimationId=setInterval(trapAnimation, 100);
        }
    }

    if(keyCode ===32){
        if(jumpAnimationNumber===0){
            jumpAnimationStart();
        }

        if(moveBackgroundAnimationId===0){
            moveBackgroundAnimationId=setInterval(moveBackground,100);
        }
        if(trapAnimationId===0){
            trapAnimationId=setInterval(trapAnimation, 100);
        }
    }
}

function moveBackground(){

    /*document.getElementById("background").style.backgroundPositionX=backgroundImagePositionX+"px";*/
    background.style.backgroundPositionX=backgroundImagePositionX+"px";

    backgroundImagePositionX=backgroundImagePositionX-60;

    score = score + 1;
    document.getElementById("score").innerHTML= score;
}


//Jump Animation


function jumpAnimation() {

    sound_Jump.play();

    boy.src="assets/images/Boy/jump (" + jumpImageNumber + ").png";
    jumpImageNumber=jumpImageNumber+1;


//    Increase height
    if(jumpImageNumber <=5){
        boyMarginTop=boyMarginTop-35;
        boy.style.marginTop=boyMarginTop+"px";
    }

    //Reduce height
    if(jumpImageNumber >=10){
        boyMarginTop=boyMarginTop+35;
        boy.style.marginTop=boyMarginTop+"px";
    }

    if(jumpImageNumber===13){
        jumpImageNumber=1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber=0;
        runImageNumber=0;
        runAnimationStart();
    }

}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    runImageNumber=0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber=setInterval(jumpAnimation,100);
}

// add barrier



function creatTraps() {

    for (var i=0; i<=200; i++) {

        trap = document.createElement("div");
        trap.className = "trap";
        document.getElementById("background").appendChild(trap);

        trap.style.marginLeft = trapMarginLeft + "px"
        trap.id= "trap" + i;
        trapMarginLeft= trapMarginLeft+800;

        if(i<50){
            trapMarginLeft=trapMarginLeft + 500;
        }

        if(i>=50 && i<=100){
            trapMarginLeft=trapMarginLeft + 300;
        }

        if(i>=100 && i<=150){
            trapMarginLeft=trapMarginLeft + 100;
        }

        if(i>=150 && i<=200){
            trapMarginLeft=trapMarginLeft + 50;
        }

    }
}

function trapAnimation() {
    for (let i = 0; i < 200; i++) {
        trap = document.getElementById("trap"+i);
        currentMarginLeft=getComputedStyle(trap).marginLeft;
        newMarginLeft = parseInt(currentMarginLeft)-35;
        trap.style.marginLeft=newMarginLeft + "px";


        if (newMarginLeft>=-110 & newMarginLeft<=100){
            if (boyMarginTop > 355){

                sound_fail.play();

                clearInterval(trapAnimationId);

                clearInterval(runAnimationNumber);
                runAnimationNumber=-1;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber=-1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId=-1;


                deadAnimationNumber = setInterval(boyDeathAnimation, 100)
            }
        }
    }
}

// Death

function boyDeathAnimation() {
    deathImageNumber = deathImageNumber+1;

    if (deathImageNumber == 11){
        deathImageNumber=10;

//ens page view & Score
        document.getElementById("end").style.visibility= "visible";
        document.getElementById("endScore").innerHTML= score;
    }

    boy.src= "assets/images/Boy/Dead (" + deathImageNumber + ").png"
}


//Game reload

function reload() {
    location.reload();
}





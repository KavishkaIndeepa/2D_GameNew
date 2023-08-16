var dog=document.getElementById("dog");
var background=document.getElementById("background");
var idleImageNumber=1;
var idleAnimationNumber=0;
var runImageNumber=1;
var runAnimationNumber=0;
var backgroundImagePositionX=0;
var moveBackgroundAnimationId=0;
var jumpAnimationNumber=0;
var jumpImageNumber=1;
var dogMarginTop=490;
var trap;
var trapMarginleft=1700;
var trapAnimationId = 0;
var currentMarginLeft;
var newMarginLeft;

// Idle Animation

function idleAnimation() {
    dog.src="assets/images/dog/Idle (" +idleImageNumber + ").png";

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
    dog.src="assets/images/dog/Run (" + runImageNumber + ").png";

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
}


//Jump Animation


function jumpAnimation() {


    dog.src="assets/images/dog/jump (" + jumpImageNumber + ").png";
    jumpImageNumber=jumpImageNumber+1;


//    Increase height
    if(jumpImageNumber <=5){
        dogMarginTop=dogMarginTop-35;
        dog.style.marginTop=dogMarginTop+"px";
    }

    //Reduce height
    if(jumpImageNumber >=6){
        dogMarginTop=dogMarginTop+35;
        dog.style.marginTop=dogMarginTop+"px";
    }

    if(jumpImageNumber===9){
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

        trap.style.marginLeft = trapMarginleft + "px"
        trap.id= "trap" + i;
        trapMarginleft= trapMarginleft+1000;

        if(i<50){
            trapMarginleft=trapMarginleft + 800;
        }

        if(i>=50 && i<=100){
            trapMarginleft=trapMarginleft + 600;
        }

        if(i>=100 && i<=150){
            trapMarginleft=trapMarginleft + 400;
        }

        if(i>=150 && i<=200){
            trapMarginleft=trapMarginleft + 200;
        }

    }
}

function trapAnimation() {
    for (let i = 0; i < 10; i++) {
        trap = document.getElementById("trap"+i);
        currentMarginLeft=getComputedStyle(trap).marginLeft;
        newMarginLeft = parseInt(currentMarginLeft)-35;
        trap.style.marginLeft=newMarginLeft + "px";


        if (newMarginLeft>=-100 & newMarginLeft<=100){
            if (dogMarginTop >200){
                clearInterval(trapAnimationId);

                clearInterval(runAnimationNumber);
                runAnimationNumber=-1;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber=-1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId=-1;
            }
        }
    }
}

// Death




let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let button = document.querySelector("button");
let btns = ["red","purple","green","yellow"];

button.addEventListener("click",function(){
    if(started==false){
        // console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
};

function levelUp(){
    userSeq = [];
    level++;
    button.innerText=`Level ${level}`;
    button.classList.add("active");

    //random btn choose
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    // console.log(gameSeq);
    
    gameFlash(randBtn);
};

function checkAns(idx){
    // console.log(`curr level : ${level}`);
    if(userSeq[idx] === gameSeq[idx]){
        // console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        button.innerHTML=`Game over! Your score was ${level}. <br>Press for play again!`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
};

function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
};

let  allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};
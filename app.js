//game constant and variables
let inputDir={x:0,y:0};
const foodsound=new Audio("food_G1U6tlb.mp3");
const GameoverSound=new Audio('UC3CKCR-game-over-a.mp3');
const moveSound=new Audio('interface-124464.mp3')
const musicSound=new Audio('music.mp3')
let speed=.6;
let score=0;
let lastPaintTime=0;

let snakeArr=[
    {x:13,y:15}
];

 food={x:6,y:9};
//Game functions 
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -lastPaintTime)/100 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if you bumped into yourself
    for(let i=1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bumbed into wall
        if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
            return true;
        }
    
}
function gameEngine(){
    //updating the snake array and food;
    if(isCollide(snakeArr)){
        GameoverSound.play();
        musicSound.pause();
        
        inputDir={x:0,y:0};
        alert("press any key to play again");
        snakeArr=[
            {x:13,y:15}
        ];
        musicSound.play();
        score=0;

    }
    //if you have eaten the food then increament score and regenerete snake
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score+=1;
        if(score>hiscore){
           let  hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highscorebox.innerHTML="High Score: "+hiscoreval;
        }
        scorebox.innerHTML="Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+ (b-a)*Math.random()),y:Math.round(a+ (b-a)*Math.random())}
    }
    //moving snake

    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //render the snake and food;
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //displaying food
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

//game logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    let hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscorebox.innerHTML="High Score: "+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDirection={x:0,y:1};//game start
    musicSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        default :break;
    }
});
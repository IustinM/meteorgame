
// class
class Can {
    constructor(canElem){
        this.canElem = canElem;
    }
    get x(){
        return getComputedStyle(this.canElem).getPropertyValue("--x");
    }
    set x(value){
        this.canElem.style.setProperty("--x",value);
    }
    get y(){
        return getComputedStyle(this.canElem).getPropertyValue("--y");
    }
    set y(value){
        this.canElem.style.setProperty("--y",value);
    }

    rects(){
        return this.canElem.getBoundingClientRect();
    }

   
}

// declaring variables
const can = new Can(document.querySelector(".can img"));
const meteors = [];
const scoreTable = document.querySelector('.score')
let score = 0;
const meteorDiv = document.querySelector(".meteor-field");
const lose = document.querySelector(".lose");
const loseText = lose.querySelector('p');
const playAgain = lose.querySelector('button');
let meteorFall = 0.1225;
const startContainer = document.querySelector(".start");
const startBtn = document.querySelector('.start h1');
const difBtns = document.querySelectorAll(".buttons button");
let timeSpeed = 1500;



// adding events

startBtn.addEventListener("click",() =>{
    
    startContainer.classList.add("playing")
    playGame()

})
document.addEventListener("mousemove",e =>{

    can.x = e.x / window.innerWidth * 100;
    can.y = e.y / window.innerHeight * 100;
});
difBtns.forEach(button =>{
    button.addEventListener('click',()=>{

        if(button.classList.contains("active")){
            button.classList.remove("active");
        }else{
            difBtns.forEach(button =>{
                button.classList.remove("active")

            })
            
            button.classList.add("active");
            difNr(button.className.split(" ")[0]);
            
        }
    })
})


// functions 

// starting game 

function difNr(button){
    switch(button){
        case "easy":
        timeSpeed=3500;
        meteorFall= 0.1300;
        break;
        case "medium":
        timeSpeed=1500;
        meteorFall= 0.1400;
        break;
        case "hard":
        timeSpeed=500;
        meteorFall= 0.1500;
        break;
        
    }
    console.log(timeSpeed)
}

function playGame(){
    
    playAgain.addEventListener("click",restart);

function randomNumber (){
    return Math.floor(Math.random() * 11)
}
function fixedNumber(Min,Max){
    return Math.floor(Math.random()*(Max-Min +1) + Min)
}


 function createMeteorite(delta){
    
    const meteorit = document.createElement("img");
    meteorit.src="./img/meteor.png";
    meteorit.classList.add("meteor");;
    meteorDiv.appendChild(meteorit);
    meteorit.style.left = `${randomNumber()*10}%`;
    const meteor = {
        meteorit : meteorit,
        get y(){
            return parseFloat(getComputedStyle(meteorit).getPropertyValue("--y"));
        },
        set y(value){
            meteorit.style.setProperty("--y",value);
        },
        rect(){
            return meteorit.getBoundingClientRect();
        }
    }
    meteors.push(meteor)
   
    
}
function updateMeteor(delta){
    meteors.forEach(meteor =>{
        meteor.y = meteor.y + delta /10  + Math.random();
        if(meteor.y > window.innerHeight){
            return;
        }
    })

}

let ad;
let lastTime;
function updateLoop(time){
    
    if(lastTime == null){
        lastTime = time;
            window.requestAnimationFrame(updateLoop);
        
        return;
    }
    const delta = (time-lastTime)/2.5;
    updateMeteor(delta);
    meteors.forEach(meteor =>{
        
        if(meteor.rect().bottom >= window.innerHeight){
            ad = true;
           
            loseGame();
        }
        if(isColision(meteor.rect(),can.rects())){
            score++;
            scoreTable.textContent = score;
            clear(meteor.meteorit);
            
        }

    })
    if(ad){
        return;
    }
   
    lastTime = time;
        window.requestAnimationFrame(updateLoop);

    
    
}
function isColision(rect1,rect2){
       if(rect2.top > 10 && rect2.left > -69){
           console.log("da")
           return (
               rect1.left <= rect2.right && 
               rect1.right >= rect2.left && 
               rect1.top <=rect2.bottom && 
               rect1.bottom >= rect2.top
               )
       
       }
       console.log(rect2.top)
       console.log(rect2.left)

}
function clear(meteor){
    meteor.remove();
}


function loseGame(){
   if(ad){
       lose.classList.add('active');
       loseText.textContent = `Your score is:${score}`;
       
   }
}
function restart(){
    score=0;
    scoreTable.textContent=score;
    ad=false;
    zero();
    lose.classList.remove('active');
    window.requestAnimationFrame(updateLoop);
    
}

function zero(){
    meteorDiv.innerHTML="";
}



const interval = setInterval(()=>{

    if(ad){
        return;
    }
    switch(fixedNumber(1,4)){
        case 1:
            createMeteorite();
            break;
        case 2:
            createMeteorite();
            createMeteorite();
            break;
        case 3:
            createMeteorite();
            createMeteorite();
            createMeteorite();
        break;

        default:
            createMeteorite();
            break;

    }

},timeSpeed);
            





 
console.log(window)
window.requestAnimationFrame(updateLoop);



}

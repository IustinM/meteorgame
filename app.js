
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
export default Can;

const can = new Can(document.querySelector(".can img"));
const meteors = [];
const scoreTable = document.querySelector('.score')
let score = 0;
const meteorDiv = document.querySelector(".meteor-field");
const lose = document.querySelector(".lose");
const loseText = lose.querySelector('p');
const playAgain = lose.querySelector('button');
const meteorFall = 0.0125;;


// functions 

function randomNumber (){
    return Math.floor(Math.random() * 11)
}
function fixedNumber(Min,Max){
    return Math.floor(Math.random()*(Max-Min +1) + Min)
}
console.log(fixedNumber(1,3))

export function createMeteorite(delta){
    
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
        meteor.y = meteor.y + delta /10 + meteorFall;
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
  
        return (
            rect1.left <= rect2.right && 
            rect1.right >= rect2.left && 
            rect1.top <=rect2.bottom && 
            rect1.bottom >= rect2.top
            )
    

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

// adding evemts
document.addEventListener("mousemove",e =>{

    can.x = e.x / window.innerWidth * 100;
    can.y = e.y / window.innerHeight * 100;
});

playAgain.addEventListener("click",restart);


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
   
},2000);





 

    window.requestAnimationFrame(updateLoop);




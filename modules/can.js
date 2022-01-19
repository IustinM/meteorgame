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
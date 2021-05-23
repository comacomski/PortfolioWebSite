import prop from './prop'

class Krug{

constructor(){
    var trex =Math.random()*prop.canvas.width-25;
    var trey =Math.random()*prop.canvas.height-25;
  /*  var colors=['green','green','green','green'];*/
    if(trex<25) trex=25; 
    if(trey<25) trey=25;
    this.x=trex;
    this.y=trey;
    this.oldX=undefined;
    this.oldY=undefined;
    this.r=10;
    this.speedX=Math.random()*3-1.5;//from -1.5 to 1.5
    //this.speedY=Math.random()*3-1.5;
    this.speedY = 2-Math.abs(this.speedX);
    this.color=prop.color;
}

getX(){
    return this.x;
}
getY(){
    return this.y;
}
}
export default Krug;
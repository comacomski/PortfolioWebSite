import React from 'react'
import './css/Home.css'
import Krug from './Krug'
import prop from './prop'
import Background from './img/about2.png'
import Background2 from './img/projects2.jpg'
import Background3 from './img/contact2.jpg'

class Home extends React.Component{

    constructor(){
        super();
        this.state={
            backgroundAbout:undefined,
            backgroundProjects:undefined,
            backgroundContact:undefined,
            bAbout:undefined,
            bProjects:undefined,
            bContact:undefined,
        };
        this.drawCircle = this.drawCircle.bind(this);
        this.animate = this.animate.bind(this);
        this.overAbout = this.overAbout.bind(this);
        this.overProjects = this.overProjects.bind(this);
        this.overContact = this.overContact.bind(this);
        this.overCanvas=this.overCanvas.bind(this);
        this.risajz=this.risajz.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.interval=undefined;
    }
    componentDidMount(){
        this.postavljanjeKanvasa();
        this.krugovi();
        this.animate();
        window.addEventListener('resize', this.risajz);
    }
    componentWillUnmount(){
       cancelAnimationFrame(this.interval);

    }
    izracunajPP(){
        prop.ppKruga=(window.innerHeight*window.innerWidth)/45107.2;
    }
    izracunajBrKr(){
        prop.ppKruga=(window.innerHeight*window.innerWidth)/45107.2;
    }
    overAbout(){
        var nn=document.getElementById('about');   
        prop.ymin = parseFloat(getComputedStyle(nn,null).getPropertyValue("top"),10);
        prop.xmin = parseFloat(getComputedStyle(nn,null).getPropertyValue("left"),10);
        prop.ymax =parseFloat(getComputedStyle(nn,null).getPropertyValue("height"),10)+parseFloat(getComputedStyle(nn,null).getPropertyValue("top"),10);
        prop.xmax = parseFloat(getComputedStyle(nn,null).getPropertyValue("left"),10)+parseFloat(getComputedStyle(nn,null).getPropertyValue("width"),10);
        this.setState({
            backgroundAbout:`url(${Background})`,
            bContact:'black',
            bProjects:'black'
        });
     /*   for(let i in prop.krugovi)
        {
            prop.krugovi[i].color='orange'
        }*/
        this.setColor('orange');
    }
    overProjects(){
        var nn = document.getElementById('projects');
        prop.ymin = parseFloat(getComputedStyle(nn,null).getPropertyValue("top"),10);
        prop.xmin = parseFloat(getComputedStyle(nn,null).getPropertyValue("left"),10);
        prop.ymax =parseFloat(getComputedStyle(nn,null).getPropertyValue("height"),10)+parseFloat(getComputedStyle(nn,null).getPropertyValue("top"),10);
        prop.xmax = parseFloat(getComputedStyle(nn,null).getPropertyValue("left"),10)+parseFloat(getComputedStyle(nn,null).getPropertyValue("width"),10);
        this.setState({
            backgroundProjects:`url(${Background2})`,
            bAbout:'black',
            bContact:'black'
        });
      /*  for(let i in prop.krugovi)
        {
        prop.krugovi[i].color='rgb(0, 153, 255)';
        }*/
        this.setColor('green');
    }
    overContact(){
        var nn = document.getElementById('contact');
        prop.ymin = parseFloat(getComputedStyle(nn,null).getPropertyValue("top"),10);
        prop.xmin = parseFloat(getComputedStyle(nn,null).getPropertyValue("left"),10);
        prop.ymax =parseFloat(getComputedStyle(nn,null).getPropertyValue("height"),10)+parseFloat(getComputedStyle(nn,null).getPropertyValue("top"),10);
        prop.xmax = parseFloat(getComputedStyle(nn,null).getPropertyValue("left"),10)+parseFloat(getComputedStyle(nn,null).getPropertyValue("width"),10);
        this.setState({
            backgroundContact:`url(${Background3})`,
            bAbout:'black',
            bProjects:'black'
        });
     /*   for(let i in prop.krugovi)
        {
            prop.krugovi[i].color='black'
        }*/
        this.setColor('black');
    }
    overCanvas(){
        prop.xmin=0;
        prop.xmax=window.innerWidth;
        prop.ymin=0;
        prop.ymax=window.innerHeight;
        this.setState({
            backgroundAbout:'none',
            backgroundProjects:'none',
            backgroundContact:'none',
            bAbout:'transparent',
            bProjects:'transparent',
            bContact:'transparent',
        });
     /*   for(let i in prop.krugovi)
        {
            prop.krugovi[i].color='green'
        }*/
        this.setColor('orange');
    }
    setColor(c){
        for(let i in prop.krugovi)
        {
            prop.krugovi[i].color=c;
        }
    }
    risajz(){
        prop.canvas.width=window.innerWidth;
        prop.canvas.height=window.innerHeight;
        prop.ctx.strokeStyle= 'red';
        prop.ctx.lineWidth=1;
     //   var w = window.innerWidth; 
      //  this.setState({canW: w});
      prop.xmin=0;
        prop.xmax=window.innerWidth;
        prop.ymin=0;
        prop.ymax=window.innerHeight;
      //  this.izracunajPP();
    }
    postavljanjeKanvasa(){
        prop.canvas = document.getElementById('canvas1');
        prop.ctx = prop.canvas.getContext('2d');
        prop.canvas.width=window.innerWidth;
        prop.canvas.height=window.innerHeight;
        prop.ctx.strokeStyle= 'white';
        prop.ctx.lineWidth=1;
        prop.xmin=0;
        prop.xmax=window.innerWidth;
        prop.ymin=0;
        prop.ymax=window.innerHeight;
        
        
        
    }
    krugovi(){
       // var krugovi =[];
        for(let i =0;i<prop.brKrugova;i++){
            prop.krugovi[i]= new Krug();
            this.drawCircle(prop.krugovi[i].getX(),prop.krugovi[i].getY(),prop.krugovi[i].color);
        }
    }
    drawCircle(x,y,c){
        prop.ctx.beginPath();
        prop.ctx.arc(x,y,prop.ppKruga,0,Math.PI*2);
    //    prop.ctx.stroke();
        var gradient = prop.ctx.createRadialGradient(x, y, prop.ppKruga/2, x, y, prop.ppKruga);
        gradient.addColorStop(0, 'transparent');           
        gradient.addColorStop(1, c);
        prop.ctx.fillStyle = gradient;
        prop.ctx.fill();
      }
    animate(){
        prop.ctx.clearRect(0,0,prop.canvas.width,prop.canvas.height);
        for(let i =0;i<prop.brKrugova;i++){
            prop.krugovi[i].x=prop.krugovi[i].getX()+prop.krugovi[i].speedX;
            prop.krugovi[i].y=prop.krugovi[i].getY()+prop.krugovi[i].speedY;
            this.drawCircle(prop.krugovi[i].getX(),prop.krugovi[i].getY(),prop.krugovi[i].color);
          }
          this.borderCheck();
          this.interval=requestAnimationFrame(this.animate);
    //   setInterval(this.animate, 1000);

    }
      //---------------------------------
    borderCheck(){
        for(let i in prop.krugovi){
            if((prop.krugovi[i].x+prop.ppKruga>=prop.xmax && prop.krugovi[i].speedX>0) || (prop.krugovi[i].speedX<0 &&prop.krugovi[i].x-prop.ppKruga<=prop.xmin)){
                prop.krugovi[i].speedX=prop.krugovi[i].speedX*(-1);
            
            }
            if((prop.krugovi[i].y+prop.ppKruga>=prop.ymax && prop.krugovi[i].speedY>0) || (prop.krugovi[i].speedY<0 && prop.krugovi[i].y-prop.ppKruga<=prop.ymin)){
                prop.krugovi[i].speedY=prop.krugovi[i].speedY*(-1);
            }
          //collision detection
            for(let j =0;j<prop.brKrugova;j++){
                var d=Math.sqrt(Math.pow(prop.krugovi[j].x-prop.krugovi[i].x,2)+Math.pow(prop.krugovi[j].y-prop.krugovi[i].y,2));
                if(d<=prop.ppKruga*2 && i!=j){
       
                    prop.krugovi[j].speedX=(prop.krugovi[j].x-prop.krugovi[i].x)/25;
                    prop.krugovi[j].speedY=(prop.krugovi[j].y-prop.krugovi[i].y)/25;
                    prop.krugovi[i].speedX=(prop.krugovi[i].x-prop.krugovi[j].x)/25;
                    prop.krugovi[i].speedY=(prop.krugovi[i].y-prop.krugovi[j].y)/25;
                    prop.ctx.clearRect(0,0,prop.canvas.width,prop.canvas.height);
                    for(let k =0;k<prop.brKrugova;k++){
                        prop.krugovi[k].x=prop.krugovi[k].getX()+prop.krugovi[k].speedX;
                        prop.krugovi[k].y=prop.krugovi[k].getY()+prop.krugovi[k].speedY;
                        this.drawCircle(prop.krugovi[k].getX(),prop.krugovi[k].getY(),prop.krugovi[k].color);
                    }
                    this.borderCheck();
                }
            }
        }
    }
    handleClick(e){
            this.props.funkcija(e.target.className);
    }
      //---------------------------------
    render(){
        var styles = {
            backgroundImage: this.state.backgroundAbout,          
        };
        var styles2 = {
            backgroundImage: this.state.backgroundProjects,          
        };
        var styles3 = {
            backgroundImage: this.state.backgroundContact,          
        };
        var styles4 = {
            backgroundColor: this.state.bAbout,          
        };
        var styles5 = {
            backgroundColor: this.state.bProjects,          
        };
        var styles6 = {
            backgroundColor: this.state.bContact,          
        };
      return( 
            <div id="wrapper">
                <div id="about" style={styles}></div>
                <div id="projects" style={styles2}></div>
                <div id="contact" style={styles3}></div>
                <div id="about3"onMouseOver={this.overCanvas} style={styles4}></div>
                <div id="projects3"onMouseOver={this.overCanvas} style={styles5}></div>
                <div id="contact3"onMouseOver={this.overCanvas} style={styles6}></div>
                <canvas id = "canvas1" onMouseOver={this.overCanvas}></canvas>
                <div id = "about2" className="about" onMouseOver={this.overAbout} onClick={this.handleClick}><b className="about">About me</b><p className="about">Education, interest fields, bio.</p></div>
                <div id = "projects2" className="projects" onMouseOver={this.overProjects} onClick={this.handleClick}><b className="projects">Projects</b><p className="projects">Click here to see my work.</p></div>
                <div id = "contact2" className="contact" onMouseOver={this.overContact} onClick={this.handleClick}><b className="contact">Contact</b><p className="contact">Send me an email.</p></div>
            </div>
      );
    }
}
export default Home;
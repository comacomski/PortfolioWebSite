import React from 'react';
import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects'
import Contact from './Contact'
import '../node_modules/font-awesome/css/font-awesome.min.css';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      prikazati: "home",
    }
    this.overSettings = this.overSettings.bind(this);
    this.outSettings = this.outSettings.bind(this);
    this.whatToShow = this.whatToShow.bind(this);
    this.navButtonClick = this.navButtonClick.bind(this);
  }
  navButtonClick() {
    if (this.state.prikazati != "home") {
      this.setState({
        prikazati: "home"
      });
      this.changeNavButton("home");
      this.animationRestart();
    }
  }
  overSettings(e) {
    // document.getElementById("fa").classList.remove("fa-lg");
    e.target.classList.remove("fa-lg");
    //   document.getElementById("fa").classList.add("fa-2x");
    e.target.classList.add("fa-2x");
    //console.log(e);

  }
  outSettings(e) {
    //  document.getElementById("fa").classList.remove("fa-2x");
    // document.getElementById("fa").classList.add("fa-lg");
    e.target.classList.remove("fa-2x");
    e.target.classList.add("fa-lg");
  }
  changeNavButton(br) {
    var faImg = document.getElementById("navbutton");
    if (br == "home") {
      faImg.classList.remove("fa-arrow-left");
      faImg.classList.add("fa-cog");
    }
    else if (br != "home") {
      faImg.classList.remove("fa-cog");
      faImg.classList.add("fa-arrow-left");
    }
  }
  animationRestart() {
    var intro = document.getElementById("intro");
    intro.classList.remove("intro");
    setTimeout(function () { intro.classList.add("intro"); }, 1);
  }
  whatToShow(br) {
    this.setState({ prikazati: br });
    this.animationRestart();
    this.changeNavButton(br);
  }
  render() {
    return (
      <div>
        <div id="nav"><div id="fa"><i id="navbutton" class="fa fa-cog fa-lg" aria-hidden="true" onMouseOut={this.outSettings} onMouseOver={this.overSettings} onClick={this.navButtonClick}></i></div><b>MIĆO ANTONIĆ</b></div>
        {this.state.prikazati == "home" && <Home funkcija={this.whatToShow} />}
        {this.state.prikazati == "about" && <About funkcija={this.whatToShow} />}
        {this.state.prikazati == "projects" && <Projects funkcija={this.whatToShow} />}
        {this.state.prikazati == "contact" && <Contact funkcija={this.whatToShow} />}
        <div id="footer">
          <a href="https://github.com/comacomski" target="_blank"><i class="fa fa-github fa-lg" aria-hidden="true" onMouseOut={this.outSettings} onMouseOver={this.overSettings}></i></a>
          <i class="fa fa-linkedin fa-lg" aria-hidden="true" onMouseOut={this.outSettings} onMouseOver={this.overSettings}></i>
          <a href="https://www.facebook.com/mico.antonic.545" target="_blank"><i class="fa fa-facebook-official fa-lg" aria-hidden="true" onMouseOut={this.outSettings} onMouseOver={this.overSettings}></i></a>
        </div>
        <div id="intro" class="intro"></div>
      </div>);
  }
}

export default App;

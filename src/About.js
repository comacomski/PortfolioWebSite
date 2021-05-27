import React from 'react'
import './css/Components.css'
import cv from './pdf/CV.pdf';

class About extends React.Component {

    constructor() {
        super();
      
    
    }
    render() {

        return (
            <div id="wrapper">
           
                <div id="frame">
                  
                    <iframe src={cv+'#toolbar=0'}  width="99%" height="99%">
                    </iframe>
                 
                </div>
            </div>);
    }
}
export default About;
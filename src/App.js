import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{


  constructor(props){
    super(props);

    this.boxSize = 500;
    this.r=200;
    
    this.startX = this.boxSize/2 - this.r;
    this.startY = this.boxSize/2;
  
    this.minX = this.startX;
    this.maxX = this.startX + 2 * this.r;

    this.topLimit = this.startX;
  
    this.d=`M ${this.startX} ${this.r + this.topLimit} a ${this.r} ${this.r} 0 0 1 ${2 * this.r} 0`;
    
    this.state = {
      pointx: this.startX,
      pointy: this.startY,
    }
  }

  onTouchMove=(e) => {
    let point = e.touches ? e.touches[0] :e;

    if(point.pageX >= this.minX && point.pageX <= this.maxX){
      //鼠标点机的坐标换算成，
      let x1 = parseInt((point.pageX - this.startX)/(2*this.r)*100);
      let y1 = parseInt((this.startY - point.pageY)/(2*this.r)*100);
      let r = 50;

      console.log("pageX:",point.pageX,"pageXY:",point.pageY);
      
      let angle = Math.atan(y1*-1/(x1-r))*180/Math.PI;
      console.log("x:",x1,"y:",y1,"n:",angle);
      if(x1 >= r){
        angle += 180;
      }

      if(angle >= 0 && angle <= 180) {
        
        const sliderLength = this.slider.getTotalLength();
        const sliderValueLength = parseInt(sliderLength * (angle/180));
        let newpoint = this.slider.getPointAtLength(sliderValueLength);
        
        this.setState({
          pointx: newpoint.x,
          pointy: newpoint.y,
        });
      }
    }

    e.preventDefault();
  }

  render() {
    const d2=`M ${this.startX} ${this.r + this.topLimit} a ${this.r} ${this.r} 0 0 1 ${this.state.pointx - this.startX} ${this.state.pointy - this.r - this.topLimit}`;
    return (
      <div className="App">
        <svg width={this.boxSize} height={this.boxSize}>
          <path
          d={this.d} 
          stroke="blue"
          stroke-width="5" 
          fill="none"
          ref={path=>this.slider = path}
          />

          <path
          d={d2} 
          stroke="yellow"
          stroke-width="5" 
          fill="none"
          />

          <circle 
          cx={this.state.pointx}
          cy={this.state.pointy}
          r="10" 
          stroke="black"
          stroke-width="2" 
          fill="red"
          onTouchMove={this.onTouchMove}
          />
        </svg>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import CountDown from './CountDown/CountDown'
import Controller from './Controller/Controller'
import Title from './Title/Title';

class App extends Component {

  constructor(props){
    super(props)
    this.state={
      time: {
        min: 0,
        sec: 0,
        mili: 0
      }
    }
  }

  getStart(){
    this.intervalID = setInterval(() => {
      let min = this.state.time.min
      let sec = this.state.time.sec
      let mili = this.state.time.mili

      if(mili >= 10){
        sec++
        mili = 0
      }
      if(sec >= 10){
        min  = sec + 1
        sec = 0
      }
      this.setState({
        ...this.state,
        time:{
          min,
          sec,
          mili: mili + 1
        }
      })
    },100)
  }
  getPause(){
    clearInterval(this. intervalID)
  }
 
  getLap(){
    let time = {
      ...this.state.time
    }
    this.setState({
      ...this.state,
      laps: [time, ...this.state.laps]
    })
    console.log(this.state.laps);
  }

  getReset(){
    this.setState({
      time: {
        min: 0,
        sec: 0,
        mili: 0
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
                <Title/>
                <CountDown time = {this.state.time}/>
                <Controller 
                  start = {this.getStart.bind(this)}
                  pause = {this.getPause.bind(this)}
                  reset =  {this.getReset.bind(this)}
                  lap = {this.getLap.bind(this)}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

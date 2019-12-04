import React, { Component } from 'react'

import Calender from 'reactjs-event-calendar'

export default class App extends Component {

  weakHeaders = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  events =
  [
    { from: new Date("11-1-2019"), to: new Date() },
    { from: new Date(), to: new Date("1-3-2020") },
    { from: new Date("1-2-2020"), to: new Date("1-3-2020") },
    { from: new Date("1-3-2020"), to: new Date("1-3-2020") },
    { from: new Date("1-3-2020"), to: new Date("1-4-2020") },
    { from: new Date(), to: new Date() },
    { from: new Date(), to: new Date() },
  ]

  render () {
    return (
      <div>
        <Calender year={2019} month={12} startWeek={1} weakHeaders={this.weakHeaders} events={this.events}/>
      </div>
    )
  }
}

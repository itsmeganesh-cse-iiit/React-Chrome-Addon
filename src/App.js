/*global chrome*/
import React, { Component } from "react";
import "./App.css";
import TrafficContainer from "./components/TrafficContainer";
import { getCurrentTab } from "./common/Utils";
var elem = document.getElementById("notification");

function openFullscreen() {
  alert(1);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      traffic: {}
    };
  }

  componentDidMount() {
    getCurrentTab(tab => {
      chrome.runtime.sendMessage(
        { type: "popupInit", tabId: tab.id },
        response => {
          if (response) {
            this.setState({
              traffic: Object.assign(this.state.traffic, response)
            });
          }
        }
      );
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to WebTraffic</h1>
          <button onClick={openFullscreen}>Click</button>
        </header>
        <div id="notification">Message</div>
        <p className="App-intro">
          <TrafficContainer traffic={this.state.traffic} />
        </p>
      </div>
    );
  }
}

export default App;

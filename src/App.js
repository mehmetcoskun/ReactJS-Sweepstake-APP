import React, { Component } from 'react';
import loop from './assets/audios/loop.mp3';
import win from './assets/audios/win.mp3';
import './assets/css/App.css';

class App extends Component {
  state = {
    names: [],
    name: '?'
  }

  showFile = async e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = (e.target.result);
      const names = text.replace(/\r\n/g, "\n").split("\n").filter(line => line);
      this.setState({
        names
      });
    };
    reader.readAsText(e.target.files[0]);
  }

  onSelectFileClick = () => {
    document.getElementById("file").click();
  }

  onClick = () => {
    let i = 0;
    const loop = document.getElementsByClassName("loop")[0];
    const win = document.getElementsByClassName("win")[0];
    loop.play();
    const random = setInterval(() => {
      document.getElementById("headerNames").innerHTML = this.state.names[i++ % this.state.names.length];
    }, 50);
    setTimeout(() => {
      clearInterval(random);
      loop.pause();
      win.play();
      this.setState({
        name: this.state.names[Math.floor(Math.random() * (this.state.names.length))]
      });
    }, 5000);
  }

  reset = () => {
    window.location.reload();
  }
  render() {
    return (
      <div>
        <audio className="loop"><source src={loop}></source></audio>
        <audio className="win"><source src={win}></source></audio>
        <h1 id="headerNames">{this.state.name}</h1>
        <div className="wrap">
          {
            !this.state.names.length ? (
              <div>
                <button className="selectFile" onClick={this.onSelectFileClick}>Çekiliş Listesini Aktar (txt)</button>
                <input type="file" id="file" onChange={e => this.showFile(e)} />
              </div>
            ) : this.state.name === "?" ? (
              <button className="start" onClick={this.onClick}>Şanslı kişiyi seç</button>
            ) : (
                  <button className="reset" onClick={this.reset}>Sıfırla</button>
                )
          }
        </div>
      </div>
    )
  }
}

export default App;
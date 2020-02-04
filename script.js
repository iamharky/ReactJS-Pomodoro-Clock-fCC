function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Controller = props => {
  const { ID, label, value, handleDec, handleInc } = props;
  return (
    React.createElement("div", { className: "controller" },
    React.createElement("label", { id: ID + '-label' }, label),
    React.createElement("div", { className: "flex-area" },
    React.createElement("button", { id: ID + '-decrement', onClick: handleDec },
    React.createElement("i", { className: "fas fa-arrow-down" })),

    React.createElement("span", { id: ID + '-length' }, value),
    React.createElement("button", { id: ID + '-increment', onClick: handleInc },
    React.createElement("i", { className: "fas fa-arrow-up" })))));




};

const Timer = props => {
  const { phase, timeLeft, startOrStop, startStop, handleReset } = props;
  return (
    React.createElement("div", { id: "timer" },
    React.createElement("span", { id: "timer-label" }, phase),
    React.createElement("span", { id: "time-left" }, timeLeft),
    React.createElement("div", { id: "timer-btn-area" },
    React.createElement("button", { id: "start_stop", onClick: startStop }, startOrStop),
    React.createElement("button", { id: "reset", onClick: handleReset }, React.createElement("i", { className: "fas fa-undo fa-2x" })))));



};

class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      phase: 'Session',
      breakValue: 5,
      sessionValue: 25,
      leftMins: 25,
      leftSecs: 0,
      isStarted: false,
      intervalID: 0 });_defineProperty(this, "handleReset",


    () => {
      clearInterval(this.state.intervalID);
      let beepSound = document.getElementById('beep');
      beepSound.pause();
      beepSound.currentTime = 0;
      this.setState({ isStarted: false, breakValue: 5, sessionValue: 25, leftMins: 25, leftSecs: 0, phase: 'Session' });
    });_defineProperty(this, "handleInc",

    type => {
      if (type === 'break' && !this.state.isStarted) {
        let br = this.state.breakValue;
        br !== 60 ? this.setState({ breakValue: br + 1 }) : null;
        this.state.phase === 'Break' && br !== 60 ? this.setState({ leftMins: br + 1 }) : null;
      } else if (type === 'session' && !this.state.isStarted) {
        let ss = this.state.sessionValue;
        ss !== 60 ? this.setState({ sessionValue: ss + 1 }) : null;
        this.state.phase === 'Session' && ss !== 60 ? this.setState({ leftMins: ss + 1 }) : null;
      }
    });_defineProperty(this, "handleDec",

    type => {
      if (type === 'break' && !this.state.isStarted) {
        let br = this.state.breakValue;
        br !== 1 ? this.setState({ breakValue: br - 1 }) : null;
        this.state.phase === 'Break' && br !== 1 ? this.setState({ leftMins: br - 1 }) : null;
      } else if (type === 'session' && !this.state.isStarted) {
        let ss = this.state.sessionValue;
        ss !== 1 ? this.setState({ sessionValue: ss - 1 }) : null;
        this.state.phase === 'Session' && ss !== 1 ? this.setState({ leftMins: ss - 1 }) : null;
      }
    });_defineProperty(this, "countDown",

    () => {

      let secs = this.state.leftSecs === 0 ? 60 : this.state.leftSecs;
      let mins = this.state.leftMins;
      let ph = this.state.phase;

      if (secs === 60 && mins > 0) {
        --mins;
        this.setState({ leftMins: mins });
      }

      --secs;
      this.setState({ leftSecs: secs });

      if (secs === 0 && mins === 0) {
        // CALL BEEP
        if (ph === 'Session') {
          ph = 'Break';
          this.switchPhase(ph, this.state.breakValue);
        } else {
          ph = 'Session';
          this.switchPhase(ph, this.state.sessionValue);
        }
      }
    });_defineProperty(this, "switchPhase",

    (name, min) => {
      //this.setState({phase: name})
      clearInterval(this.state.intervalID);
      setTimeout(() => {
        this.setState({ phase: name, leftMins: min, leftSecs: 0 });
        this.startInterval();
      }, 1000);
      document.getElementById('beep').play();
    });_defineProperty(this, "startInterval",

    () => {
      var intervalID = setInterval(() => this.countDown(), 1000);
      this.setState({ intervalID: intervalID });
    });_defineProperty(this, "startStop",

    () => {

      if (!this.state.isStarted) {
        this.startInterval();
      } else if (this.state.isStarted) {
        clearInterval(this.state.intervalID);
      }

      this.setState({ isStarted: !this.state.isStarted });
    });}

  render() {
    return (
      React.createElement(React.Fragment, null,
      React.createElement(Controller, { label: "Break Length", ID: "break", value: this.state.breakValue,
        handleInc: () => this.handleInc('break'), handleDec: () => this.handleDec('break') }),

      React.createElement(Controller, { label: "Session Length", ID: "session", value: this.state.sessionValue,
        handleInc: () => this.handleInc('session'), handleDec: () => this.handleDec('session') }),

      React.createElement(Timer, { phase: this.state.phase, handleReset: this.handleReset, startStop: this.startStop,
        timeLeft: (this.state.leftMins < 10 ? '0' : '') + this.state.leftMins + ':' + (this.state.leftSecs < 10 ? '0' : '') + this.state.leftSecs,
        startOrStop: this.state.isStarted ? React.createElement("i", { className: "fas fa-pause fa-2x" }) : React.createElement("i", { className: "fas fa-play fa-2x" }) }),
      React.createElement("audio", { id: "beep", preload: "auto", src: "http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav" })));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
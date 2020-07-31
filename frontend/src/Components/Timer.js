import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

import '../App.css';


class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
        phaseCounter: 0,
        isActive: false,
        innerJSX: this.waitingForStartRender(),
        resultMessage: null,
        restTime: {
            minutes: 5,
            seconds: 0
        },
        workTime: {
            minutes: 25,
            seconds: 0
        },
        longRestTime: {
            minutes: 15,
            seconds: 0
        }
    }

    constructor(props) {
        super(props);
        this.intervalId = null;
        this.waitingForStartRender = this.waitingForStartRender.bind(this);
        this.workPhaseRender = this.workPhaseRender.bind(this);
        this.decrementTime = this.decrementTime.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.switchPhase = this.switchPhase.bind(this);
        this.restPhaseRender = this.restPhaseRender.bind(this);
        this.setRestTime = this.setRestTime.bind(this);
        this.setWorkTime = this.setWorkTime.bind(this);
        this.setLongRestTime = this.setLongRestTime.bind(this);
        this.longRestPhaseRender = this.longRestPhaseRender.bind(this);
        this.startButtonRender = this.startButtonRender.bind(this);
        this.stopButtonRender = this.stopButtonRender.bind(this);
    }

    switchPhase() {
        if (this.state.phaseCounter === 8) {
            this.setState({
                phaseCounter: this.state.phaseCounter + 1,
                innerJSX: this.longRestPhaseRender(),
                minutes: this.state.longRestTime.minutes,
                seconds: this.state.longRestTime.seconds
            });
        } else if (this.state.phaseCounter === 9) {
            this.setState({
                phaseCounter: 0,
                innerJSX: this.waitingForStartRender(),
                minutes: 0,
                seconds: 0,
                isActive: false,
                resultMessage: 'Ququmber finished his working day!'
            });
            clearInterval(this.intervalId);
        } else {
            if (this.state.phaseCounter % 2 !== 0) {  // work phase
                this.setState({
                    phaseCounter: this.state.phaseCounter + 1,
                    innerJSX: this.restPhaseRender(),
                    minutes: this.state.workTime.minutes,
                    seconds: this.state.workTime.seconds
                });
            } else {  // rest phase
                this.setState({
                    phaseCounter: this.state.phaseCounter + 1,
                    innerJSX: this.workPhaseRender(),
                    minutes: this.state.restTime.minutes,
                    seconds: this.state.restTime.seconds
                });
            }
        }
    }

    setRestTime(mins, secs) {
        this.setState({
            restTime: {
                minutes: mins,
                seconds: secs
        }});
    }

    setWorkTime(mins, secs) {
        this.setState({
            workTime: {
                minutes: mins,
                seconds: secs
            }
        });
    }

    setLongRestTime(mins, secs) {
        this.setState({
            longRestTime: {
                minutes: mins,
                seconds: secs
            }
        });
    }

    waitingForStartRender() {
        return (
            <div>
                <p>Press start button to start the session</p>
            </div>
        );
    }

    workPhaseRender() {
        return (
            <div>
                <h3>work work work work wooooooooooork!</h3>
            </div>
        );
    }

    restPhaseRender() {
        return (
            <div>
                <h3>Ququmber is having a rest...</h3>
            </div>
        );
    }

    longRestPhaseRender() {
        return (
            <div>
                <h3>long rest time!</h3>
            </div>
        );
    }

    decrementTime() {
        if (this.state.seconds > 0) {
            this.setState({seconds: this.state.seconds - 1});
        }

        if (this.state.seconds === 0) {
            if (this.state.minutes === 0) {
                this.switchPhase();
            } else {
                this.setState({seconds: 59, minutes: this.state.minutes - 1});
            }
        }
    }

    start() {
        this.intervalId = setInterval(this.decrementTime, 1000);
        this.setState({
            phaseCounter: 1,
            innerJSX: this.workPhaseRender(),
            minutes: this.state.workTime.minutes,
            seconds: this.state.workTime.seconds,
            isActive: true
        });
        console.log(this.state.phaseCounter);
    }

    stop() {
        this.setState({
            minutes: 0,
            seconds: 0,
            phaseCounter: 0,
            innerJSX: this.waitingForStartRender(),
            isActive: false
        });
        clearInterval(this.intervalId);
    }
    startButtonRender() {
        return (
            <Button variant="success" onClick={this.start}>Start</Button>
        );
    }
    
    stopButtonRender() {
        return (
            <Button variant="danger" onClick={this.stop}>Stop</Button>
        );
    }

    render() {
        let button;
        if (this.state.isActive) {
            button = this.stopButtonRender();
        } else {
            button = this.startButtonRender();
        }
        return (
            <div className="timer">
                <Jumbotron>
                    <h1>Ququmber timer</h1>
                    <h2>{this.state.minutes}:{this.state.seconds}</h2>
                    <h2>{this.state.currendPhaseName}</h2>
                    {this.state.innerJSX}
                    {button}
                </Jumbotron>
            </div>
        );
    }
}

export default Timer;

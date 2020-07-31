import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import {bounceIn, swing, tada, flipInX} from 'react-animations'
import styled, {keyframes} from 'styled-components'

import '../App.css';


const BounceIn = styled.div`animation: 0.5s ${keyframes `${bounceIn}`}`;
const Swing = styled.div`animation: 0.5s ${keyframes `${swing}`}`;
const Tada = styled.div`animation: 2s ${keyframes `${tada}`}`;
const FlipInX = styled.div`animation: 0.5s ${keyframes `${flipInX}`}`;


class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
        phaseCounter: 0,
        isActive: false,
        innerJSX: this.waitingForStartRender(),
        resultMessage: null,
        restTime: {
            minutes: 0,  // 5
            seconds: 5
        },
        workTime: {
            minutes: 0,  // 25
            seconds: 5
        },
        longRestTime: {
            minutes: 0,  // 15
            seconds: 5
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

    componentDidMount() {
        this.setState({
            minutes: JSON.parse(localStorage.minutes),
            seconds: JSON.parse(localStorage.seconds),
            phaseCounter: JSON.parse(localStorage.phaseCounter),
            isActive: JSON.parse(localStorage.isActive)
        });
        console.log(JSON.parse(localStorage.phaseCounter));
        
        if (JSON.parse(localStorage.isActive)) {
            this.intervalId = setInterval(this.decrementTime, 1000);
            if (localStorage.phaseCounter === 9) {
                this.setState({innerJSX: this.longRestPhaseRender()});
            } else {
                if (localStorage.phaseCounter % 2 !== 0) {
                    this.setState({innerJSX: this.workPhaseRender()});
                } else {
                    this.setState({innerJSX: this.restPhaseRender()});
                }
            }
        }
    }

    switchPhase() {
        if (this.state.phaseCounter === 8) {
            this.setState({
                phaseCounter: this.state.phaseCounter + 1,
                innerJSX: this.longRestPhaseRender(),
                minutes: this.state.longRestTime.minutes,
                seconds: this.state.longRestTime.seconds
            });
            localStorage.phaseCounter = this.state.phaseCounter;
        } else if (this.state.phaseCounter === 9) {
            this.setState({
                phaseCounter: 0,
                innerJSX: this.waitingForStartRender(),
                minutes: 0,
                seconds: 0,
                isActive: false,
                resultMessage: 'Ququmber finished his working day!'
            });
            localStorage.isActive = false;
            localStorage.phaseCounter = this.state.phaseCounter;
            clearInterval(this.intervalId);
        } else {
            if (this.state.phaseCounter % 2 === 0) {  // work phase
                this.setState({
                    phaseCounter: this.state.phaseCounter + 1,
                    innerJSX: this.workPhaseRender(),
                    minutes: this.state.workTime.minutes,
                    seconds: this.state.workTime.seconds
                });
                localStorage.phaseCounter = this.state.phaseCounter;
            } else {  // rest phase
                this.setState({
                    phaseCounter: this.state.phaseCounter + 1,
                    innerJSX: this.restPhaseRender(),
                    minutes: this.state.restTime.minutes,
                    seconds: this.state.restTime.seconds
                });
                localStorage.phaseCounter = this.state.phaseCounter;
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
                <FlipInX><p>Press start button to start the session</p></FlipInX>
            </div>
        );
    }

    workPhaseRender() {
        return (
            <div>
                <BounceIn><h3>work work work work wooooooooooork!</h3></BounceIn>
            </div>
        );
    }

    restPhaseRender() {
        return (
            <div>
                <Swing><h3>Ququmber is having a rest...</h3></Swing>
            </div>
        );
    }

    longRestPhaseRender() {
        return (
            <div>
                <Tada><h3>long rest time!</h3></Tada>
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
        localStorage.minutes = this.state.minutes;
        localStorage.seconds = this.state.seconds;
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
        localStorage.isActive = true;
        localStorage.phaseCounter = 1;
    }

    stop() {
        this.setState({
            minutes: 0,
            seconds: 0,
            phaseCounter: 0,
            innerJSX: this.waitingForStartRender(),
            isActive: false
        });
        localStorage.isActive = false;
        localStorage.phaseCounter = 0;
        localStorage.minutes = 0;
        localStorage.seconds = 0;
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
            <div className="timer margin-edges">
                <Jumbotron>
                    <h1 className='ququmber-font'>Ququmber timer</h1>
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

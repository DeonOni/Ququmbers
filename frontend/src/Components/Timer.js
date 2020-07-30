import React, {Component, setInterval} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

import '../App.css';


class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 0,
        phaseCounter: 0,
        currendPhaseName: 'waiting for session start...',
        innerJSX: null
    }
    timerInterval = null;

    constructor(props) {
        super(props);
        this.setState({innerJSX: this.waitingForStartRender()});
    }

    waitingForStartRender() {
        return (
            <div>
                <p>Press start button to start the session</p>
            </div>
        );
    }

    firstPhaseRender() {
        return (
            <div>
                <h2>{this.state.minutes}:{this.state.seconds}</h2>
                <h3>work work work work wooooooooooork!</h3>
            </div>
        );
    }
    decrementTime() {
        if (this.state.seconds > 0) {
            this.setState({seconds: this.state.seconds - 1});
        }

        if (this.state.seconds === 0) {
            if (this.state.minutes === 0) {
                clearInterval(this.timerInterval);
            }
            this.setState({seconds: 59, minutes: this.state.minutes - 1});
        }
    }

    start() {
        console.log('Started!');
        /*
        this.timerInterval = setInterval(this.decrementTime, 1000);
        this.setState({innerJSX: this.firstPhaseRender()});
        this.setState({phaseCounter: 1, currendPhaseName: 'work!'});
        */
    }

    stop() {
        clearInterval(this.myInterval)
    }
    

    render() {
        return (
            <div className="timer">
                <Jumbotron>
                    <h4> Date: {(new Date()).toLocaleTimeString()}</h4>
                    <h1>Ququmber timer</h1>
                    <h2>{this.state.currendPhaseName}</h2>
                    {this.state.innerJSX}
                    <ButtonGroup aria-label="Basic example">
                    <Button variant="success" onClick={this.start}>Start</Button>
                    <Button variant="danger" onClick={this.stop}>Stop</Button>
                    <Button variant="secondary" onClick={this.pause}>Pause</Button>
                </ButtonGroup>
                </Jumbotron>
            </div>
        );
    }
}
/*
    render() {
        return (
            <div className="timer">
                <Jumbotron>
        <h4> Date: {(new Date()).toLocaleTimeString()}</h4>
                    <h3>Ququmber timer</h3>
                    <h4>{this.minutes}:{this.seconds}</h4>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="success" onClick={this.start}>Start</Button>
                        <Button variant="danger" onClick={this.stop}>Stop</Button>
                        <Button variant="secondary" onClick={this.pause}>Pause</Button>
                    </ButtonGroup>
                </Jumbotron>
            </div>
        );
    }

    start() {
        console.log('Timer started');
    }

    stop() {
        console.log('Timer stopped');
    }
    pause() {
        console.log('Timer pause');
    }
*/
export default Timer;

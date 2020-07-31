import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class TimerSettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.toggleComponent = this.toggleComponent.bind(this);
    this.state = {
      copmonentIsShown: false
    }
  }

  toggleComponent() {
    console.log('Click clock!');
    console.log(this.state.copmonentIsShown);
    this.setState({copmonentIsShown: !this.state.copmonentIsShown});
  }

  formRender() {
    console.log('Form is rendered!');
    return (
      <div>
        <Form.Group>
        <Form.Label >Phase</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Large text" />
        <Form.Label className="settingsLabelStyle">Short Break</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Large text" />
        <Form.Label className="settingsLabelStyle">Long Break</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Large text" />
      </Form.Group>
      <Button variant="success">
      Submit
    </Button>
      </div>
    );
  }

  render() {
    let innerJSX;
    if (this.state.copmonentIsShown) {
      innerJSX = this.formRender();
    }
    return (
      <div>
        <div className="accordion" onClick={this.toggleComponent}>Timer settings</div>
          {innerJSX}
      </div>
    );
  }
}

export default TimerSettingsComponent;

import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class TimerSettingsComponent extends Component {
  render() {
    return (
      <div>
        <div className="accordion">Timer settings</div>

        <div className="panel">
          <Form.Group>
            <Form.Label className="settingsLabelStyle">Phase</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Large text" />
            <Form.Label className="settingsLabelStyle">Short Break</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Large text" />
            <Form.Label className="settingsLabelStyle">Long Break</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Large text" />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let acc = document.querySelector(".accordion");
    let panel = document.querySelector(".panel");

    acc.addEventListener("click", () => {
      acc.classList.toggle("active");

      if (panel.style.display === "block") {
        panel.style.display = "none";
        acc.innerHTML = "Timer settings"
      } else {
        panel.style.display = "block";
        acc.innerHTML = "Hide"
      }
    });
  }
}

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import './bootstrap.min.css';
import Timer from './Components/Timer';
import TimerSettingsComponent from './Components/TimerSettingsComponent';


function App() {
  return (
    <div>
      <Header />
      <Timer/>
      <TimerSettingsComponent/>
    </div>
  );
}

export default App;

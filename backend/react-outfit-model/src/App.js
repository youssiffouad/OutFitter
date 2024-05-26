import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from './ImageUploader'; // Import the ImageUploader component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ImageUploader /> {/* Replace existing content with the ImageUploader component */}
      </header>
    </div>
  );
}

export default App;

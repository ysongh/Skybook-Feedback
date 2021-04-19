import React from 'react';
import './App.css';

import { GlobalProvider } from './context/GlobalState';
import Home from './pages/Home';

function App() {
  return (
    <GlobalProvider className="App">
      <h1>Skybook Feedback</h1>
      <Home />
    </GlobalProvider>
  );
}

export default App;

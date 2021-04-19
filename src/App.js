import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { GlobalProvider } from './context/GlobalState';
import Home from './pages/Home';
import BookList from './pages/BookList';

function App() {
  return (
    <GlobalProvider className="App">
      <Router>
        <Switch>
          <Route path="/booklist">
            <BookList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;

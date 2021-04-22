import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';

function App() {
  return (
    <GlobalProvider className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/booklist">
            <BookList />
          </Route>
          <Route path="/addbook">
            <AddBook />
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

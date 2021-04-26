import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import MyBooks from './pages/MyBooks';

function App() {
  return (
    <GlobalProvider className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/mybooks">
            <MyBooks />
          </Route>
          <Route path="/addbook">
            <AddBook />
          </Route>
          <Route path="/bookdetail/:id">
            <BookDetail />
          </Route>
          <Route path="/">
            <BookList />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;

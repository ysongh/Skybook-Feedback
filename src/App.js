import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import MyBooks from './pages/MyBooks';
import CreateBook from './pages/CreateBook';
import Profile from './pages/Profile';
import Footer from './components/Footer';

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
          <Route path="/createbook">
            <CreateBook />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/bookdetail/:id">
            <BookDetail />
          </Route>
          <Route path="/editbook/:id">
            <CreateBook />
          </Route>
          <Route path="/">
            <BookList />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;

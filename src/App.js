import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalProvider } from './context/GlobalState';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import UploadBook from './pages/UploadBook';
import BookDetail from './pages/BookDetail';
import MyBookDetail from './pages/MyBookDetail';
import MyBooks from './pages/MyBooks';
import CreateBook from './pages/CreateBook';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import './App.css';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
          <Route path="/uploadbook">
            <UploadBook />
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
          <Route path="/mybookdetail/:id">
            <MyBookDetail />
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

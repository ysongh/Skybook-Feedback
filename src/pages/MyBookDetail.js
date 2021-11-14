import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Grid, Container, Card, Pagination, Button, Label, Icon } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf'

import { GlobalContext } from '../context/GlobalState';

const dataDomain = window.location.hostname;

function MyBookDetail() {
  const { userID, mySky } = useContext(GlobalContext);
  const { id } = useParams();

  const [book, setBooks] = useState({});
  const [userData, setUserData] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  document.onkeydown = function(e) {
    console.log(pageNumber)
    switch (e.keyCode) {
      case 37:
        if(pageNumber > 1) setPageNumber(pageNumber - 1);
        break;
      case 39:
        if(pageNumber < numPages) setPageNumber(pageNumber + 1);
        break;
    }
  };

  useEffect(() => {
    async function getBookFromMySky() {
      // Get discoverable JSON data from the given path.
      const { data, skylink } = await mySky.getJSON(dataDomain + "/" + userID);
      console.log(data, skylink);
      
      setBooks(data.books[id]);
    }

    getBookFromMySky();

    const page = JSON.parse(localStorage.getItem('pages')) || {};
    console.log(page, "Page Number from bookmark");
    setPageNumber(page[id] || 1);
  }, [])

  useEffect(() => {
    async function getUserData(userID) {
      const { data, skylink } = await mySky.getJSON(dataDomain + "/profile" + userID);
      console.log(data, skylink);
      setUserData(data);
    }

    if(userID) getUserData(userID);
  }, [userID])

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  function changePage(e, data){
    console.log(data);
    setPageNumber(data.activePage);
  }

  function bookmark(){
    let data = JSON.parse(localStorage.getItem('pages')) || {};
    console.log("add", data)
    data[id] = pageNumber;
    localStorage.setItem('pages', JSON.stringify(data));
  }

  return (
    <Container className="bodyHeight">
      <br />
      <Grid centered>
        {book.title && (
          <Grid.Column mobile={16} tablet={16} computer={10}>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Card.Header style={{ fontSize: '1.75rem' }}>{book.title}</Card.Header>
                    <Card.Meta>{book.date}</Card.Meta>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Card.Header>Page {pageNumber}</Card.Header>
                    <Button color="blue" onClick={bookmark}>
                      <Icon name="bookmark" />
                      Bookmark
                    </Button>
                  </div>

                  <Document
                    file={book.bookURL}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} width={650}/>
                  </Document>
                  <center style={{ marginTop: '.7rem' }}>
                    <Pagination
                      pointing
                      secondary
                      activePage={pageNumber}
                      totalPages={numPages}
                      onPageChange={(e, data) => changePage(e, data)}
                    />
                  </center>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Label as='a' image>
                      <img src='/images/defaultuser.png' />
                      {book.author}
                    </Label>
                  </div>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        )}
      </Grid>
    </Container>
  );
}

export default MyBookDetail;

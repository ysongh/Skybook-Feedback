import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Button, Label, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';
import { seedphase } from '../config';
import CardListLoading from '../components/loading/CardListLoading';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed(seedphase);
const dataKey = "localhost";
const TOTALPAGE = 4;

function BookList() {
  const { userID, mySky } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);
  const [currentSet, setCurrentSet] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getJSONFromSkyDB() {
      try {
        setLoading(true);
        const { data, skylink } = await client.db.getJSON(publicKey, dataKey);
        console.log(data, skylink);
        setBooks(data.books);
        setCurrentSet(data.books.slice(0, TOTALPAGE));
        setComments(data.comments);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getJSONFromSkyDB();
  }, [])

  const changePage = (e, data) => {
    const bookNumber = (+data.activePage - 1) * TOTALPAGE;
    setCurrentSet(books.slice(bookNumber, bookNumber + TOTALPAGE));
    setCurrentPage(+data.activePage - 1);
  }

  return (
    <Container className="bodyHeight">
      <Card
        fluid
        color='red'
        header='Create your books or stories and share it for the world to see'
      />

      {loading 
        ? <CardListLoading /> 
        : currentSet.map((book, index) => (
            <Card.Group key={index}>
              <Card fluid>
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Label as='a' image>
                      <img src='/images/defaultuser.png' />
                      {book.author}
                    </Label>
                    <Button
                      as={Link}
                      basic color='red'
                      to={{
                        pathname: `/bookdetail/${(index + (TOTALPAGE * currentPage))}`,
                        state: { selectedBook: book, selectedComments: comments }
                    }}
                    >
                      View
                    </Button>
                  </div>
                  <Card.Header>{book.title}</Card.Header>
                  
                  <Card.Description>
                    {book.preview}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          ))
      }

      <center style={{ marginTop: '.7rem'}}>
        <Pagination defaultActivePage={1} totalPages={Math.ceil(books.length / TOTALPAGE)} onPageChange={(e, data) => changePage(e, data)}/>
      </center>
      
    </Container>
  );
}

export default BookList;

import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

import { GlobalContext } from '../context/GlobalState';
import CardListLoading from '../components/loading/CardListLoading';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed("sky book feed back");
const dataKey = "localhost";

function BookList() {
  const { userID, mySky } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getJSONFromSkyDB() {
      try {
        setLoading(true);
        const { data, skylink } = await client.db.getJSON(publicKey, dataKey);
        console.log(data, skylink);
        setBooks(data.books);
        setComments(data.comments);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getJSONFromSkyDB();
  }, [])

  return (
    <Container>
      <p>userID: {userID}</p>

      {loading 
        ? <CardListLoading /> 
        : books.map((book, index) => (
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
                        pathname: `/bookdetail/${index}`,
                        state: { selectedBook: books[index], selectedComments: comments }
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
      
    </Container>
  );
}

export default BookList;

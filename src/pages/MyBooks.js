import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Card, Button } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

import { GlobalContext } from '../context/GlobalState';
import { seedphase } from '../config';

const portal = 'https://siasky.net/';
const dataDomain = 'localhost';

function MyBooks() {
  const { userID, mySky } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getJSONfromMySky = async (userID) => {
      try {
        // Get discoverable JSON data from the given path.
        const { data, skylink } = await mySky.getJSON(dataDomain + "/" + userID);
        console.log(data, skylink);
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    }

    getJSONfromMySky(userID);
  }, [userID])

  const setJSONtoMySky = async () => {
    try {
      // Set discoverable JSON data at the given path. The return type is the same as getJSON.
      const { data, skylink } = await mySky.setJSON((dataDomain + "/" + userID), { message: "test123" });
      console.log(data, skylink);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <div style={{ marginBottom: '1rem' }}></div>
      <Header as='h4'>User Id: {userID}</Header>
      <Button as={Link} to="/createbook" color='black' style={{ marginBottom: '1rem' }}>
        New Book
      </Button>
      <button onClick={setJSONtoMySky}>
        Set Data
      </button>
      <Card.Group>
        { books.map((book, index) => (
          <Card key={index}>
            <Card.Content>
              <Card.Header>{book.title}</Card.Header>
              <Card.Meta>{book.date}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button 
                  as={Link}
                  basic
                  color='green'
                  to={{
                      pathname: `/editbook/${index}`,
                      state: { selectedBook: books[index]}
                    }}
                  >
                  Open
                </Button>
                <Button basic color='red'>
                  Publish
                </Button>
              </div>
            </Card.Content>
          </Card>
        )) }
      </Card.Group>
    </Container>
  );
}

export default MyBooks;

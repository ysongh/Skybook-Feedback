import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Card, Button } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

import { GlobalContext } from '../context/GlobalState';
import { seedphase } from '../config';
import PublishModal from '../components/PublishModal';

const portal = 'https://siasky.net/';
const dataDomain = 'localhost';

function MyBooks() {
  const { userID, mySky } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const openModal = index => {
    setOpen(true);
    setTitle(books[index].title)
    setBody(books[index].body);
  }

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

  return (
    <Container>
      <div style={{ marginBottom: '1rem' }}></div>
      <Header as='h4'>User Id: {userID}</Header>
      <Button as={Link} to="/createbook" color='black' style={{ marginBottom: '1rem' }}>
        New Book
      </Button>
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
                <Button basic color='red' onClick={() => openModal(index)}>
                  Publish
                </Button>
              </div>
            </Card.Content>
          </Card>
        )) }
      </Card.Group>
      <PublishModal
        open={open}
        setOpen={setOpen}
        title={title}
        body={body} />
    </Container>
  );
}

export default MyBooks;

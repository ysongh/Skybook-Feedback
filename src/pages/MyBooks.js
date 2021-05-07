import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Card, Button, Placeholder, Confirm, Icon } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';
import PublishModal from '../components/PublishModal';
import CardLoading from '../components/loading/CardLoading';

const dataDomain = window.location.hostname;

function MyBooks() {
  const { userID, mySky, contentRecord } = useContext(GlobalContext);

  const [books, setBooks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const openModal = index => {
    setOpen(true);
    setTitle(books[index].title)
    setBody(books[index].body);
  }

  useEffect(() => {
    const getJSONfromMySky = async (userID) => {
      try {
        setLoading(true);

        // Get discoverable JSON data from the given path.
        const { data, skylink } = await mySky.getJSON(dataDomain + "/" + userID);
        console.log(data, skylink);

        await contentRecord.recordInteraction({
          skylink,
          metadata: data
        });
        
        setLoading(false);
        setBooks(data.books);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getJSONfromMySky(userID);
  }, [userID])

  const removeABookfromMySky = async index => {
    try {
      setLoading(true);

      let temp = books;
      if(books.length === 1){
        temp = [];
      } else {
        temp.splice(index, 1);
      }
      
      const { data, skylink } = await mySky.setJSON((dataDomain + "/" + userID), { books: temp });
      console.log(data, skylink);

      await contentRecord.recordInteraction({
        skylink,
        metadata: { "action": "remove a book" }
      });

      setBooks(data.books);
      setOpenConfirm(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Container className="bodyHeight">
      <div style={{ marginBottom: '1rem' }}></div>
      <Header as='h1' style={{ marginBottom: '0rem' }}>Your List of book draft</Header>
      <p style={{ color: 'grey' }}>* Your drafts are private until you publish them</p>
      <p>User Id: {userID ? userID : <Placeholder.Line />}</p>
      <Button as={Link} to="/createbook" color='black' style={{ marginBottom: '1rem' }}>
        New Draft
      </Button>
      {loading
        ? <CardLoading /> 
        : <Card.Group>
          { books.map((book, index) => (
            <Card key={index}>
              <Card.Content>
                <Button icon style={{ float: 'right' }} color='red' onClick={() => setOpenConfirm(true)}>
                  <Icon name='trash alternate' />
                </Button>
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
              <Confirm
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => removeABookfromMySky(index)} />
            </Card>
          )) }
        </Card.Group>
      }
      <PublishModal
        open={open}
        setOpen={setOpen}
        title={title}
        body={body} />
    </Container>
  );
}

export default MyBooks;

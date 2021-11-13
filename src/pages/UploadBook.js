import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/loading/Spinner';

function UploadBook() {
  const { userID, privateKey, publicKey, clientSkyDB } = useContext(GlobalContext);
  const history = useHistory();
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [loading, setLoading] = useState(false);

  const getBookFile = event => {
    const file = event.target.files[0];
    console.log(file);
    setBookURL(file);
  }

  async function addBookToSkyDB() {
    try {
      setLoading(true);
      let { data, skylink } = await clientSkyDB.db.getJSON(publicKey, "books");
      console.log(data, skylink);

      const bookData = {
        title,
        author,
        preview,
        bookURL,
        date: new Date().toLocaleDateString(),
        likes: [],
        userID
      };

      let json;

      if(data === null) {
        json = {
          books: [bookData]
        };
      }
      else {
        data.books.push(bookData);

        json = {
          books: data.books
        };
      }
      
      await clientSkyDB.db.setJSON(privateKey, "books", json);
      history.push('/booklist');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Container className="bodyHeight">
      <Card centered style={{ minWidth: '500px'}}>
        <Card.Content>
          <Card.Header>Upload a book</Card.Header>
          <br />
          <Form>
            <Form.Field>
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Preview</label>
              <input value={preview} onChange={(e) => setPreview(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Book (PDF)</label>
              <input type="file" onChange={getBookFile} />
            </Form.Field>
            
            <Button
              type='submit'
              color="black"
              onClick={addBookToSkyDB}
              disabled={!title || !author || !preview || !bookURL}
            >Upload</Button>
            
            {loading && <Spinner />}
          </Form>
        </Card.Content>
      </Card>
    </Container>
  );
}

export default UploadBook;
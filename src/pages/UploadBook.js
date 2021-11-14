import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/loading/Spinner';

const dataDomain = window.location.hostname;

function UploadBook() {
  const { userID, mySky, clientSkyDB } = useContext(GlobalContext);
  const history = useHistory();
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [preview, setPreview] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [loading, setLoading] = useState(false);

  const getBookFile = async event => {
    try{
      setLoading(true);
      const file = event.target.files[0];
      console.log(file);
  
      const { skylink } = await clientSkyDB.uploadFile(file);
  
      // skylinks start with `sia://` and don't specify a portal URL
      // generate URLs for our current portal though.
      const skylinkUrl = await clientSkyDB.getSkylinkUrl(skylink);
      console.log(skylinkUrl);
      setBookURL(skylinkUrl);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function addBookToMySky() {
    try {
      setLoading(true);
      const { data, skylink } = await mySky.getJSON(dataDomain + "/" + userID);
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

      // Set discoverable JSON data at the given path. The return type is the same as getJSON.
      await mySky.setJSON((dataDomain + "/" + userID), json);

      history.push('/mybooks');
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
              <label>Book (PDF only)</label>
              <input type="file" onChange={getBookFile} />
            </Form.Field>
            
            <Button
              type='submit'
              color="black"
              onClick={addBookToMySky}
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
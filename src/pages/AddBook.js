import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';
import Spinner from '../components/loading/Spinner';
// import TextEditor from '../components/TextEditor';

function AddBook({ pdfData, setOpen}) {
  const { userID, privateKey, publicKey, clientSkyDB } = useContext(GlobalContext);
  const history = useHistory();
  
  const [title, setTitle] = useState(pdfData.title || "");
  const [author, setAuthor] = useState(pdfData.author || "");
  const [preview, setPreview] = useState(pdfData.preview || "");
  const [body, setBody] = useState(pdfData.bookURL || "");
  const [loading, setLoading] = useState(false);

  async function addBookToSkyDB() {
    try {
      setLoading(true);
      let { data, skylink } = await clientSkyDB.db.getJSON(publicKey, "books");
      console.log(data, skylink);

      const bookData = {
        title,
        author,
        preview,
        bookURL: body,
        date: new Date().toLocaleDateString(),
        likes: [],
        userID
      };

      console.log(bookData)

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
      setOpen(false);
      history.push('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Card centered style={{ width: '100%'}}>
        <Card.Content>
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
            {/* <Form.Field>
              <label>Body</label>
              <TextEditor body={body} setBody={setBody} />
            </Form.Field> */}
            
            <Button
              type='submit'
              color="black"
              onClick={addBookToSkyDB}
              disabled={!title || !author || !preview || !body}
            >Submit</Button>
            
            {loading && <Spinner />}
          </Form>
        </Card.Content>
      </Card>
      
    </Container>
  );
}

export default AddBook;

import React, { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { Container, Card, Image, Form, Header, Comment, Button, Label } from 'semantic-ui-react';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { GlobalContext } from '../context/GlobalState';
import { seedphase } from '../config';
import Spinner from '../components/loading/Spinner';

const portal = 'https://siasky.net/';
const client = new SkynetClient(portal);
const { privateKey, publicKey } = genKeyPairFromSeed(seedphase);
const dataKey = "localhost";

function BookDetail() {
  const { userID } = useContext(GlobalContext);
  const { id } = useParams();
  const { state = {} } = useLocation();

  const [comments, setComments] = useState(state.selectedComments);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function addComment() {
    try {
      setLoading(true);
      let { data, skylink } = await client.db.getJSON(publicKey, dataKey);
      console.log(data, skylink);

      const commentData = {
        bookId: id,
        comment,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        userID
      }

      let _comments = comments;
      _comments.push(commentData);

      data.comments.push(commentData);

      const json = {
        books: data.books,
        comments: data.comments
      };

      await client.db.setJSON(privateKey, dataKey, json);

      setLoading(false);
      setComments(_comments);
      setComment("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Container className="bodyHeight">
      <br />
      
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <Card.Header style={{ fontSize: '1.75rem' }}>{state.selectedBook.title}</Card.Header>
              <Card.Meta>{state.selectedBook.date}</Card.Meta>
            </div>
            <Card.Description>
              {state.selectedBook.preview}
            </Card.Description>
            <br />
            <ReactQuill className="hideToolbar" theme="snow" value={state.selectedBook.body} readOnly/>
            <br />
            <Label as='a' image>
              <img src='/images/defaultuser.png' />
              {state.selectedBook.author}
            </Label>
          </Card.Content>
        </Card>
      </Card.Group>

      <Header as='h3' dividing>
        Comments
      </Header>

      {userID && <Form reply style={{marginBottom: '2rem'}}>
        <Form.TextArea value={comment} onChange={(e) => setComment(e.target.value)}/>
        <Button disabled={!comment} content='Add Comment' labelPosition='left' icon='edit' color='black' onClick={addComment} />
        {loading && <Spinner />}
      </Form> }

      {comments.map((comment, index) => {
        if (comment.bookId === id) {
          return (
            <Comment style={{marginBottom: '1rem'}} key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image size='mini' avatar src="/images/defaultuser.png" />
                <Comment.Author as='a'>{comment.userID}</Comment.Author>
              </div>
              <Comment.Content>
                <Comment.Metadata>
                  <div>{comment.date}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        }
      })}
      
    </Container>
  );
}

export default BookDetail;

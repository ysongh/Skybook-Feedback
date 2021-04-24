import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Container, Card, Image, Form, Header, Comment, Button } from 'semantic-ui-react';

import { GlobalContext } from '../context/GlobalState';

function BookDetail() {
  const { userID } = useContext(GlobalContext);
  const { state = {} } = useLocation();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  async function addComment() {
    try {
      let _comments = comments;
      _comments.push({
        comment,
        userID
      });

      setComments(_comments);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <Card.Header>{state.selectedBook.title}</Card.Header>
              <Card.Meta>{state.selectedBook.date}</Card.Meta>
            </div>
            <Card.Meta><Image size='mini' avatar src="/images/defaultuser.png" />{state.selectedBook.author}</Card.Meta>
            <Card.Description>
              {state.selectedBook.preview}
            </Card.Description>
            <br />
            <p>{state.selectedBook.body}</p>
          </Card.Content>
        </Card>
      </Card.Group>

      <Header as='h3' dividing>
        Comments
      </Header>

      <Form reply style={{marginBottom: '2rem'}}>
        <Form.TextArea value={comment} onChange={(e) => setComment(e.target.value)}/>
        <Button disabled={!comment} content='Add Comment' labelPosition='left' icon='edit' primary onClick={addComment} />
      </Form>

      {comments.map((comment, index) => (
        <Comment style={{marginBottom: '1rem'}} key={index}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image size='mini' avatar src="/images/defaultuser.png" />
            <Comment.Author as='a'>{comment.userID}</Comment.Author>
          </div>
          <Comment.Content>
            <Comment.Metadata>
              <div>Today</div>
            </Comment.Metadata>
            <Comment.Text>{comment.comment}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
      
    </Container>
  );
}

export default BookDetail;

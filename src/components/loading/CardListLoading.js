import React from 'react';
import { Segment, Placeholder, Button } from 'semantic-ui-react'

function CardListLoading() {
  return (
    Array(5).fill(1).map((el, i) => (
      <Segment raised key={i}>
        <Button basic color='red' disabled floated="right">
          View
        </Button>
        <Placeholder fluid>
          <Placeholder.Header image>
          <Placeholder.Line length='short' />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='short' />
            <Placeholder.Line length='full' />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    )
  ))
}

export default CardListLoading;

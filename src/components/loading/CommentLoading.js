import React from 'react';
import { Grid, Segment, Placeholder } from 'semantic-ui-react'

function CommentLoading() {
  return (
    <Grid columns={1}>
      { Array(5).fill(1).map((el, i) => (
        <Grid.Column key={i}>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line length='medium' />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='medium' />
              <Placeholder.Line length='full' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default CommentLoading;

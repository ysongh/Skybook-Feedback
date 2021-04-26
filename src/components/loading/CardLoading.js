import React from 'react';
import { Grid, Segment, Placeholder } from 'semantic-ui-react'

function CardLoading() {
  return (
    <Grid columns={3} stackable>
      { Array(9).fill(1).map((el, i) => (
        <Grid.Column key={i}>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default CardLoading;

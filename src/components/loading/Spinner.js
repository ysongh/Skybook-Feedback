import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

function Spinner() {
  return (
    <Dimmer active inverted>
      <Loader inverted content='Loading' />
    </Dimmer>
  )
}

export default Spinner;

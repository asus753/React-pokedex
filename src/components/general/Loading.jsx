import React from 'react'
import {Spinner} from 'react-bootstrap'


export const Loading = () => {
  return (
    <div style={{textAlign : 'center'}}>
      <Spinner animation="grow" />
  </div>
  )
}

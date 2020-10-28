import React from 'react'
import {ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const List = ({listElements, typeElement = '', id}) => {
  return (
    <ListGroup className="text-center mt-3" id={id}>
      {listElements.map((element, idx) => {
        return <Link key={idx} to={`/${typeElement}/${element}`}>
          <ListGroup.Item action>{element}</ListGroup.Item>
        </Link>
      })}
    </ListGroup>
  )
}

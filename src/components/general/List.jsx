import React from 'react'
import {ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const List = ({listElements, typeElement = ''}) => {
  return (
    <ListGroup style={{textAlign : 'center'}}>
      {listElements.map((element, idx) => {
        return <Link key={idx} to={`${typeElement}/${element}`}>
          <ListGroup.Item action>{element}</ListGroup.Item>
        </Link>
      })}
    </ListGroup>
  )
}
import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments}) {
  var comment = null
  if (comments) {
    comment = comments.map((c) => {
      return (
          <ul className="list-unstyled" id={c.id}>
            <li>{c.comment}</li>
            <li>{"--"}{c.author}{", "}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}</li>
          </ul>
      )
    })
  }
  return (
    <div>
      {comment}
    </div>
  )
}

const DishDetail = (props) => {
  if (props.dish) {
    return (
      <div className="row m-1">
        <RenderDish dish={props.dish} />
        <div className="col-12 col-md-5 m-1">
        <h4>{"Comments"}</h4>
        <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

export default DishDetail
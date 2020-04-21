import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
  var comment = null
  console.log(comments);

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
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
          </div>
        </div>
        <div className="row m-1">
          <RenderDish dish={props.dish} />
          <div className="col-12 col-md-5 m-1">
            <h4>{"Comments"}</h4>
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

export default DishDetail
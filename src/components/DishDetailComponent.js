import React, { Component } from 'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props)
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    var comment = null
    if (comments) {
      comment = comments.map((c) => {
        return (
          <ul className="list-unstyled" id={c.id}>
            <li>{c.comment}</li>
            <li>{"--"}{c.author}{","}{c.date}</li>
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

  render() {
    const dish = this.props.dish
    if (dish) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4>{"Comments"}</h4>
            {this.renderComments(dish.comments)}
          </div>
        </div>
      )
    }
    else {
      return null
    }
  }
}

export default DishDetail
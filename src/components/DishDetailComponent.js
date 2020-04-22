import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"></i> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating" defaultValue="3" className="form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Control.text model=".author" id="author" name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters!',
                    maxLength: 'Must be 15 characters or less!'
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6">
                </Control.textarea>
              </FormGroup>

              <FormGroup>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </FormGroup>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay> </CardImgOverlay>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    const commentsArray = comments.map((item) => {
      return (
        <div key={item.id} className='list-unstyled m-3'>
          <li className="mb-1">{item.comment}</li>
          <li className="mb-1">-- {item.author}, {
            new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
              .format(new Date(Date.parse(item.date)))}
          </li>
        </div>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        {commentsArray}
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
};

export default DishDetail;
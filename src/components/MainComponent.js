import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './HeaderComponent'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Footer from './FooterComponent'

import { COMMENTS } from '../shared/comments'
import { DISHES } from '../shared/dishes'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'

import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comments: COMMENTS,
      dishes: DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      selectedDishID: null
    }
  }

  onDishSelect(dishID) {
    this.setState({ selectedDishID: dishID });
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithID = ({ match }) => {
      return (
        <DishDetail
          dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishID, 10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishID, 10))}
        />
      )
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} onClick={(dishID) => { this.onDishSelect(dishID) }} />} />
          <Route path='/menu/:dishID' component={DishWithID} />
          <Route path='/contactus' component={Contact} />
          <Route path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;

import React, { Component } from 'react';

import Header from './HeaderComponent'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Footer from './FooterComponent'

import { DISHES } from '../shared/dishes'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dishes: DISHES,
      selectedDishID: null
    }
  }

  onDishSelect(dishID) {
    this.setState({ selectedDishID: dishID });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishID) => { this.onDishSelect(dishID) }} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDishID)[0]} />
        <Footer />
      </div>
    );
  }
}

export default Main;

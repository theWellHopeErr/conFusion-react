import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'

import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
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
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
          <Menu dishes={this.state.dishes} onClick={(dishID) => { this.onDishSelect(dishID) }} />
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDishID)[0]} />
        </div>
      </div>
    );
  }
}

export default Main;

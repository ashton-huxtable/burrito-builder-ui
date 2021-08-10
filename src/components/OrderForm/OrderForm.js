import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: '',
      
    };
  }

  handleNameChange = e => {
    this.setState({name: e.target.value})
  }
  
  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, (e.target.name)]})

  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }

    {(this.state.name && this.state.ingredients.length) ?
      (this.props.addOrder(newOrder) && this.clearError()) :
      this.setState({error: 'Sorry, you must enter a name and at least one ingredient to order!'})
    }

    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  clearError = () => {
    this.setState({error: ''})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className='ingredients' key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />
        <div className='ing-section'>
          { ingredientButtons }
        </div>

        <p className='order-list'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button className='submit-btn' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
        {this.state.error && <h4>{this.state.error}</h4>}
      </form>
    )
  }
}

export default OrderForm;

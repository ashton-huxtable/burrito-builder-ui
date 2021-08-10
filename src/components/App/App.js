import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => {
        this.setState({orders: data.orders})
      })
      .catch(err => console.error('Error fetching:', err));
  }

   addOrder = (newOrder) => {
     postOrder(newOrder)
      .then(data => {
        this.setState({orders: [...this.state.orders, newOrder]})
      })
      .catch(data => {
        this.setState({error: 'Your order could not be added. Please try again!'})
      })
   }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
        </header>
        <section className='form'>
          <OrderForm addOrder={this.addOrder}/>
          {this.state.error && <h2 className='order-error'>{this.state.error}</h2>}
        </section>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;

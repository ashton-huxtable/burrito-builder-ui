import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div key={order.name} className="order">
        <h3 className='order-name'>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <>
      <h2 className='orders'>Orders: </h2>
      <section className='orders-section'>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    </>
  )
}

export default Orders;
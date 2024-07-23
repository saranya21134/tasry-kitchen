import {Link} from 'react-router-dom'

import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const OrderTotalSection = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalCost = 0
      cartList.forEach(eachCartItem => {
        totalCost += eachCartItem.cost * eachCartItem.itemQuantity
      })

      return (
        <>
          <hr className="hr-line" />
          <div className="cart-summary-container">
            <h1 className="order-total-value">Order Total:</h1>
            <div className="total-container">
              <p className="total">
                <FaRupeeSign /> {totalCost}
              </p>
              <Link to="/payment">
                <button type="button" className="order-button">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default OrderTotalSection

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItemsView = props => (
  <CartContext.Consumer>
    {value => {
      const {removeCartItem, increaseQuantity, decreaseQuantity} = value
      const {cartItems} = props
      const {id, name, itemQuantity, cost, imageUrl} = cartItems

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onIncreaseQuantity = () => {
        increaseQuantity(id)
      }

      const onDecreaseQuantity = () => {
        decreaseQuantity(id)
      }

      return (
        <li>
          <div className="cart-items">
            <div className="cart-item-name-container">
              <img className="cart-product-image" src={imageUrl} alt={name} />
              <h1 className="cart-name">{name}</h1>
            </div>
            <div className="cart-quantity-container">
              <button
                aria-label="decrement-quantity"
                onClick={onDecreaseQuantity}
                type="button"
                className="quantity-controller-button"
              >
                <BsDashSquare color="#52606D" size={10} />
              </button>
              <p className="cart-quantity">{itemQuantity}</p>
              <button
                aria-label="increment-quantity"
                onClick={onIncreaseQuantity}
                type="button"
                className="quantity-controller-button"
              >
                <BsPlusSquare color="#52606D" size={10} />
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">
                <FaRupeeSign /> {cost * itemQuantity}/-
              </p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>

            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
              aria-label="remove-item"
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItemsView

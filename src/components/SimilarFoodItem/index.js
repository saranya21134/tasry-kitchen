import {Component} from 'react'

import {FaStar, FaRupeeSign, FaRegMinusSquare} from 'react-icons/fa'
import {MdOutlineAddBox} from 'react-icons/md'
import CartContext from '../../context/CartContext'

import './index.css'

class SimilarFoodItem extends Component {
  state = {
    isItemAdded: true,
    itemQuantity: 1,
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem, increaseQuantity, decreaseQuantity} = value

          const {foodDetails} = this.props
          const {name, cost, imageUrl, rating, id} = foodDetails
          const {isItemAdded, itemQuantity} = this.state

          const onClickAddToCart = () => {
            this.setState({isItemAdded: false})
            addCartItem({...foodDetails, itemQuantity})
          }

          const onChangeItemLess = () => {
            if (itemQuantity > 1) {
              this.setState(prevState => ({
                itemQuantity: prevState.itemQuantity - 1,
              }))
            }
            decreaseQuantity(id)
          }

          const onChangeItemAdd = () => {
            this.setState(prevState => ({
              itemQuantity: prevState.itemQuantity + 1,
            }))

            increaseQuantity(id)
          }

          return (
            <li className="similar-product-item">
              <div className="similar-product-image-container">
                <img
                  src={imageUrl}
                  className="similar-product-image"
                  alt={`similar product ${name}`}
                />
              </div>
              <div className="similar-food-details-container">
                <h1 className="similar-food-name">{name}</h1>
                <div className="similar-cost-for-two-container">
                  <FaRupeeSign className="similar-food-cost" />
                  <p className="similar-food-cost">{cost}</p>
                </div>
                <div className="similar-cost-for-two-container">
                  <FaStar className="similar-food-star" />
                  <p className="similar-rating">{rating}</p>
                </div>
                {isItemAdded && (
                  <button
                    type="button"
                    className="similar-food-item-button"
                    onClick={onClickAddToCart}
                  >
                    Add
                  </button>
                )}
                {!isItemAdded && (
                  <div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={onChangeItemLess}
                    >
                      <FaRegMinusSquare />
                    </button>
                    {itemQuantity}
                    <button
                      type="button"
                      aria-label="Add item"
                      onClick={onChangeItemAdd}
                    >
                      <MdOutlineAddBox />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default SimilarFoodItem

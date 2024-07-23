import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default CartContext

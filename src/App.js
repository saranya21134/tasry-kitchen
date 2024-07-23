import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import FoodItemDetails from './components/FoodItemDetails'
import Cart from './components/Cart'

import Home from './components/Home'
import SuccessfulPaymentView from './components/SuccessfulPaymentView'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'
import './App.css'

const getCartItemListFromLocalStorage = () => {
  const stringifiedCartItemList = localStorage.getItem('cartDetails')
  const parsedCartItemList = JSON.parse(stringifiedCartItemList)
  if (parsedCartItemList === null) {
    return []
  }
  return parsedCartItemList
}

class App extends Component {
  state = {
    cartList: getCartItemListFromLocalStorage(),
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodObject = cartList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )
    console.log(foodObject)
    if (foodObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = foodItem.itemQuantity0
            return {...eachCartItem, itemQuantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  increaseQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.itemQuantity + 1
          return {...eachCartItem, itemQuantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.itemQuantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.itemQuantity - 1
            return {...eachCartItem, itemQuantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartDetails', JSON.stringify(cartList))
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={FoodItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/payment"
            component={SuccessfulPaymentView}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosClose} from 'react-icons/io'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    showNavbar: false,
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamburger = () => {
    this.setState({showNavbar: true})
  }

  onClickClose = () => {
    this.setState({showNavbar: false})
  }

  render() {
    const {showNavbar} = this.state

    return (
      <div className="navbar-container">
        <div className="navbar-desktop-container">
          <div className="image-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dstrrgmd3/image/upload/v1719223123/Frame_274cap_1_ctgcfo.png"
                className="logo-image"
                alt="Logo"
              />
            </Link>
            <h2 className="logo-heading">Tasty Kitchens</h2>
          </div>

          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li className="nav-menu-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="hamburger-button"
            onClick={this.onClickHamburger}
            aria-label="Open Menu"
          >
            <GiHamburgerMenu size={30} />
          </button>
        </div>

        {showNavbar && (
          <div className="mobile-nav-menu">
            <ul className="nav-mobile-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-menu-item">
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={this.onClickLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            </ul>

            <button
              type="button"
              className="close-button"
              onClick={this.onClickClose}
              aria-label="Close Menu"
            >
              <IoIosClose size={30} />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)

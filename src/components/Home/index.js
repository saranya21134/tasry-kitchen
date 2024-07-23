import {Component} from 'react'
import {Link} from 'react-router-dom'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import {BsFilterRight} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import Header from '../Header'
import Carousel from '../Carousel'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    activeOptionId: sortByOptions[1].value,
    foodList: [],
    apiStatus: apiStatusConstants.initial,
    activePage: 1,
    totalPageLimit: 0,
  }

  componentDidMount() {
    this.getFoodItem()
  }

  getFoodItem = async () => {
    const {activePage, activeOptionId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const limit = 9
    const offset = (activePage - 1) * limit

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    const totalItems = fetchedData.total

    const totalPages = Math.ceil(totalItems / limit)

    const updatedFoodItems = fetchedData.restaurants.map(eachFoodItems => ({
      hasOnlineDelivery: eachFoodItems.has_online_delivery,
      userRating: eachFoodItems.user_rating,
      ratingText: eachFoodItems.user_rating.rating_text,
      ratingColor: eachFoodItems.user_rating.rating_color,
      totalReviews: eachFoodItems.user_rating.total_reviews,
      rating: eachFoodItems.user_rating.rating,
      name: eachFoodItems.name,
      hasTableBooking: eachFoodItems.has_table_booking,
      isDeliveringNow: eachFoodItems.is_delivering_now,
      costForTwo: eachFoodItems.cost_for_two,
      cuisine: eachFoodItems.cuisine,
      imageUrl: eachFoodItems.image_url,
      id: eachFoodItems.id,
      menuType: eachFoodItems.menu_type,
      location: eachFoodItems.location,
      opensAt: eachFoodItems.opens_at,
      groupByTime: eachFoodItems.group_by_time,
    }))

    this.setState({
      foodList: updatedFoodItems,
      apiStatus: apiStatusConstants.success,
      totalPageLimit: totalPages,
    })
  }

  onChangeSortBy = event => {
    this.setState({activeOptionId: event.target.value}, this.getFoodItem)
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getFoodItem,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage, totalPageLimit} = this.state
    if (activePage < totalPageLimit) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getFoodItem,
      )
    }
  }

  renderFoodDetailsView = () => {
    const {foodList} = this.state
    return (
      <ul className="food-details-list-container">
        {foodList.map(eachFoodList => (
          <Link
            to={`/restaurant/${eachFoodList.id}`}
            className="link-item"
            key={eachFoodList.id}
            testid="restaurant-item"
          >
            <li className="food-list-item">
              <div className="food-list-image">
                <img
                  src={eachFoodList.imageUrl}
                  className="food-image"
                  alt="restaurant"
                />
              </div>
              <div className="rating-name-container">
                <h1 className="food-name">{eachFoodList.name}</h1>
                <h3 className="food-cuisine">{eachFoodList.cuisine}</h3>
                <div className="food-details-sub-container">
                  <FaStar className="star" />
                  <p className="food-rating">{eachFoodList.rating}</p>
                  <p className="food-review">
                    ({eachFoodList.totalReviews} ratings)
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFoodDetailsView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeOptionId, activePage, totalPageLimit} = this.state
    return (
      <>
        <Header />
        <Carousel />
        <div className="restaurants-bg-container">
          <div className="restaurants-heading-sort-options-container">
            <div className="restaurants-heading-container">
              <h1 className="popular-restaurants-heading">
                Popular Restaurants
              </h1>
              <p className="popular-restaurants-text">
                Select your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>

            <div className="sort-by-container">
              <BsFilterRight className="sort-by-icon" />
              <p className="sort-by">Sort by</p>
              <select
                className="sort-by-select"
                value={activeOptionId}
                onChange={this.onChangeSortBy}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.id}
                    value={eachOption.value}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div>{this.renderView()}</div>
          <div className="button-container">
            <button
              testid="pagination-left-button"
              className="button"
              type="button"
              onClick={this.onClickLeftArrow}
            >
              <RiArrowDropLeftLine className="arrow" />
            </button>
            <span className="span-button">
              {activePage} of {totalPageLimit}
            </span>

            <button
              testid="pagination-right-button"
              className="button"
              type="button"
              onClick={this.onClickRightArrow}
            >
              <RiArrowDropRightLine className="arrow" />
            </button>
          </div>
        </div>

        <Footer />
      </>
    )
  }
}
export default Home

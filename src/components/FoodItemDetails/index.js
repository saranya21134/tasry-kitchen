import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import SimilarFoodItem from '../SimilarFoodItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class FoodItemDetails extends Component {
  state = {
    foodData: {},
    similarFoodData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFoodData()
  }

  getFoodData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()
    console.log(data)

    const updatedData = {
      rating: data.rating,
      id: data.id,
      name: data.name,
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      reviewsCount: data.reviews_count,
      opensAt: data.opens_at,
      location: data.location,
      itemsCount: data.items_count,
    }

    const upDatedSimilarFoodItems = data.food_items.map(eachFoodItems => ({
      name: eachFoodItems.name,
      cost: eachFoodItems.cost,
      foodType: eachFoodItems.food_type,
      imageUrl: eachFoodItems.image_url,
      id: eachFoodItems.id,
      rating: eachFoodItems.rating,
    }))

    this.setState({
      foodData: updatedData,
      similarFoodData: upDatedSimilarFoodItems,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderFoodDetailsView = () => {
    const {foodData, similarFoodData} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      location,
    } = foodData

    return (
      <div>
        <div className="restaurant-bg-image">
          <div className="restaurant-image-container">
            <img src={imageUrl} className="restaurant-image" alt="restaurant" />
          </div>
          <div className="restaurant-details-container">
            <h1 className="restaurant-name">{name}</h1>
            <p className="restaurant-cuisine">{cuisine}</p>
            <p className="restaurant-location">{location}</p>
            <div className="rating-cost-container">
              <div className="rating-review-container">
                <div className="cost-for-two-container">
                  <FaStar className="restaurant-star" />
                  <p className="restaurant-rating">{rating}</p>
                </div>
                <p className="review-count">{reviewsCount}+ Rating</p>
              </div>
              <div>
                <div className="cost-for-two-container">
                  <FaRupeeSign />
                  <p className="money">{costForTwo}</p>
                </div>
                <div>
                  <p className="cost-for-two">cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="similar-products-list">
            {similarFoodData.map(eachSimilarFood => (
              <SimilarFoodItem
                foodDetails={eachSimilarFood}
                key={eachSimilarFood.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="restaurant-details-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderFoodDetails = () => {
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
    return (
      <>
        <Header />
        <div>{this.renderFoodDetails()}</div>
        <Footer />
      </>
    )
  }
}

export default FoodItemDetails

import {Component} from 'react'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Carousel extends Component {
  state = {
    carouselImage: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCarouselList()
  }

  getCarouselList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    const fetchedData = await response.json()

    const updatedData = fetchedData.offers.map(eachImage => ({
      id: eachImage.id,
      imageUrl: eachImage.image_url,
    }))

    this.setState({
      carouselImage: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div className="image-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCarouselImageListView = () => {
    const {carouselImage} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <ul className="carousel-list-container">
        <Slider {...settings}>
          {carouselImage.map(eachCarousel => (
            <li className="carousel-list-item">
              <img
                src={eachCarousel.imageUrl}
                className="carsouel-image"
                alt="offer"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderCarouselList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselImageListView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCarouselList()}</div>
  }
}

export default Carousel

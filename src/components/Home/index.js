import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard/index'
import './index.css'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const result = await fetch('https://apis.ccbp.in/ipl')
    const data = await result.json()
    const {teams} = data

    const updatedTeams = teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teams: updatedTeams, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state

    return (
      <Link to="/">
        <div className="main-home">
          <div className="title-logo">
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1>IPL Dashboard</h1>
          </div>
          {isLoading ? (
            // eslint-disable-next-line react/no-unknown-property
            <div testid="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            <ul>
              {teams.map(each => (
                <TeamCard key={each.id} details={each} />
              ))}
            </ul>
          )}
        </div>
      </Link>
    )
  }
}

export default Home

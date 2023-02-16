import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import './index.css'

class TeamMatches extends Component {
  state = {detail: {}, isLoading: true}

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const result = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await result.json()
    console.log(data)

    const camelData = [data].map(each => ({
      teamBannerUrl: each.team_banner_url,
      latestMatchDetails: [each.latest_match_details].map(item => ({
        umpires: item.umpires,
        result: item.result,
        manOfTheMatch: item.man_of_the_match,
        id: item.id,
        date: item.date,
        venue: item.venue,
        competingTeam: item.competing_team,
        competingTeamLogo: item.competing_team_logo,
        firstInnings: item.first_innings,
        secondInnings: item.second_innings,
        matchStatus: item.match_status,
      })),
      recentMatches: each.recent_matches.map(mat => ({
        umpires: mat.umpires,
        result: mat.result,
        manOfTheMatch: mat.man_of_the_match,
        id: mat.id,
        venue: mat.venue,
        competingTeam: mat.competing_team,
        competingTeamLogo: mat.competing_team_logo,
        firstInnings: mat.first_innings,
        secondInnings: mat.second_innings,
        matchStatus: mat.match_status,
        date: mat.date,
      })),
    }))

    this.setState({isLoading: false, detail: camelData[0]})
  }

  render() {
    const {detail, isLoading} = this.state

    const {teamBannerUrl, latestMatchDetails, recentMatches} = detail
    console.log(detail)
    return (
      <div className="main-home">
        {isLoading ? (
          // eslint-disable-next-line react/no-unknown-property
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <div>
            <img
              className="team-banner"
              src={teamBannerUrl}
              alt="team banner"
            />
            <div>
              {latestMatchDetails.map(each => (
                <LatestMatch matchDetails={each} key={each.id} />
              ))}
            </div>
            <ul className="match-details">
              {recentMatches.map(each => (
                <MatchCard details={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches

import './index.css'

const MatchCard = props => {
  const {details} = props
  const {
    competingTeam,
    competingTeamLogo,

    result,
    matchStatus,
  } = details

  return (
    <li className="match-card">
      <img
        className="team-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>

      <p className={matchStatus === 'Won' ? 'status' : 'lost'}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard

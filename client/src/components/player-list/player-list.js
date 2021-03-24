import Player from './components/player'
import {StyledPlayerList} from './player-list-styles'

const PlayerList = (props) => {
    return (
        <StyledPlayerList>
            {
                props.users.map((u,idx)=>{
                    return (
                        <Player
                            isActive={(props.currentTurnUserId == u.id)}
                            user={u}
                            points={props.userPoints[u.id]}
                            numDiceRemaining={props.userDiceCounts[u.id]}
                            diceDisplayVal={(idx+1) % 6}
                        />
                    )
                })
            }
        </StyledPlayerList>
    )
}

export default PlayerList;
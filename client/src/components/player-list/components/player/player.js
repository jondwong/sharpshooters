import {
    StyledPlayer,
    PlayerName,
    PlayerScore,
    PlayerDiceCount,
    PlayerDiceCountLabel
} from  './player-styles'

import Dice from '../../../dice'

const INSENSITIVE_COLOR = '#3C4653';

const Player = ({
    isActive,
    user,
    points,
    numDiceRemaining,
    diceDisplayVal
}) => {
    return(
        <StyledPlayer isActive={isActive}>
            <PlayerName isActive={isActive}>{user.username}</PlayerName>
            <PlayerScore isActive={isActive}>${points}</PlayerScore>
            <PlayerDiceCount>
                <PlayerDiceCountLabel isActive={isActive}>{numDiceRemaining}</PlayerDiceCountLabel>
                <Dice
                    value={diceDisplayVal}
                    size={20}
                    backgroundColor={ isActive ? user.color : 'transparent' }
                    borderColor = { isActive ? 'white' : INSENSITIVE_COLOR }
                    dotColor={(isActive) ? 'white': INSENSITIVE_COLOR }
                />
            </PlayerDiceCount>
        </StyledPlayer>
    )
}

export default Player;
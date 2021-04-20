
import {
    StyledEndgameModal,
    WinnerContainer,
    WinnerTitle,
    WinnerScore
} from './endgame-modal-styles'

import BorderBox from '../../../../components/border-box'

const EndgameModal = ({
    winner
}) => {
    return (
        <StyledEndgameModal>    
            <WinnerContainer>
                WINNER
                <WinnerTitle>{winner.user.username}</WinnerTitle>
                <WinnerScore>{winner.score}</WinnerScore>
            </WinnerContainer>
        </StyledEndgameModal>
    )
}

export default EndgameModal;
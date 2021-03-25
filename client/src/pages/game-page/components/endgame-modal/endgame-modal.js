
import {
    StyledEndgameModal,
    WinnerContainer,
    WinnerTitle,
    WinnerScore
} from './endgame-modal-styles'

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
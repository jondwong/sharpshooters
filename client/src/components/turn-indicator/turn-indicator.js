import styled from 'styled-components';

const getName = (currentTurnUserId, userId, users) => {
    if(currentTurnUserId == userId) {
        return 'YOUR TURN'
    } else if(users[currentTurnUserId]) {
        return `${users[currentTurnUserId].username.toUpperCase()}'S TURN`
    }

    return 'hi';
}

const StyledTurnIndicator = styled.div`
    text-align: left;
    font-weight: 900;
`

const TurnIndicator = ({
    currentTurnUserId,
    userId, 
    users
}) => {
    return (
        <StyledTurnIndicator>
            {getName(currentTurnUserId, userId, users)}          
        </StyledTurnIndicator>
    )
}

export default TurnIndicator;
export {
    StyledTurnIndicator
}
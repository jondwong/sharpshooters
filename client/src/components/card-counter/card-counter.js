import styled from 'styled-components';
import { FaChessKnight} from 'react-icons/fa'

const StyledCardCounter = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
    color: #ffd000;
    
    font-size:1.0em;
    font-weight:900;

    div {
        margin-right: 5px;
    }
`

const CardCounter = ({
    currentCardIdx,
    numCards
}) => {
    return (
        <StyledCardCounter>
            <div>{currentCardIdx + 1} of {numCards}</div>
            <FaChessKnight />
        </StyledCardCounter>
    )
}

export default CardCounter;
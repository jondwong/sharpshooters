
import styled from 'styled-components'

const StyledBorderBox = styled.div`
    padding: 10px;
    border: 1px solid #333b4b;
`

const BorderBox = (props) => {
    return (
        <StyledBorderBox>
            {props.children}
        </StyledBorderBox>
    )
}

export default BorderBox;
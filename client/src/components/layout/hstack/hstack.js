import styled from 'styled-components';

export const StyledHStack = styled.div`
    display: flex;
    flex-direction: row;
`

const HStack = (props) => {
    return (
        <StyledHStack>
            {props.children}
        </StyledHStack>
    )
}

export default HStack;
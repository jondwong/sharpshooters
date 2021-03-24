import styled from 'styled-components';

export const StyledVStack = styled.div`
    display: flex;
    flex-direction: column;
`

export const CenteredVStack = styled(StyledVStack)`
    align-items: center;
    justify-content: center;
`

const VStack = (props) => {
    return (
        <StyledVStack>
            {props.children}
        </StyledVStack>
    )
};

export default VStack;
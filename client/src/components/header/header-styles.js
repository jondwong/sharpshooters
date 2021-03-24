import styled from 'styled-components'

export const StyledHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    @media (max-width:600px) {
        margin-bottom: 0px;
    }
`;

export const StyledHeaderLogo = styled.div`
    padding: 10px;
    font-size: 1.5em;
    font-weight: 700;
    color: #495772;
    cursor: pointer;
    
    @media (max-width:600px) {
        &::after {
            content: "shϟsh";
        }
    }
`;

export const StyledHeaderLogoText = styled.span`
    @media (max-width:600px) {
        display: none;
    }
`;

export const StyledHeaderGameId = styled.div`
    font-size:1.2em;
`;
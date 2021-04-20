import styled from 'styled-components';

export const StyledEndgameModal = styled.div`
    background-color: #151618ce;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    display:flex;
    z-index:10;
    align-items: center;
    justify-content: center;
    animation: fadeIn ease .75s;
`;

export const WinnerContainer = styled.div`
    min-width:400px;
    padding:20px;
    border-radius:10px;
    background-color: #d6b704;
    color:white;
    font-weight:bold;
    box-shadow: 0 0 25px gold;
`;

export const WinnerTitle = styled.div`
    font-size:2em;
`;

export const WinnerScore = styled.div`
    margin-top:10px;
    font-size:1.5em;
`;


export const PlayAgainContainer = styled.div`
    margin-top:10px;
    font-size:20px;
    text-transform: uppercase;
    color:white;
    padding:10px;
    border:1px solid white;
`
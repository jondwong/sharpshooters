import styled, {keyframes}  from 'styled-components'

const spinCubeAnimation = keyframes`
    16% { transform: rotateY(-90deg); }
    33% { transform: rotateY(-90deg) rotateZ(90deg); }
    50% { transform: rotateY(180deg) rotateZ(90deg); }
    66% { transform: rotateY(90deg) rotateX(90deg); }
    83% { ttransform: rotateX(90deg); }
`;


export const StyledDice = styled.div`
    font-size:80px;
    width: 100px;
    height: 100px;
    margin:10px 0px;
    transform-style: preserve-3d;
    box-sizing: border-box;
    border: ${props => props.selected ? "5px solid gold" : 'none'};
    border-radius: 5px;

    @media (max-width:600px) {
        height:60px;
        width:60px;
    }
`

export const RollingDice = styled(StyledDice)`
    animation: ${spinCubeAnimation} infinite .6s;
`
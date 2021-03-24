import styled from 'styled-components'
import {StyledDot} from '../dot/dot-styles'

export const StyledDiceFace = styled.div`
    position: absolute;
    padding: 3px;
    width: 100%;
    height: 100%;
    background:rgba(rgb(46, 137, 190), .9);
    border:1px solid #1b5272;
    text-align:center;
    line-height: 100px;
    border-radius:5px;
    display: flex;
    cursor: pointer;
`

export const StyledDiceFaceOne =  styled(StyledDiceFace)`
    justify-content: center;
    align-items: center;

    &.cube-face {
        transform: rotateX(0deg) translateZ(50px);
    }

    @media (max-width:600px) {
        &.cube-face {
            justify-content: center;
            align-items: center;
            transform: rotateX(0deg) translateZ(30px);
        }

        ${StyledDot} {
            height:15px;
            width:15px;
        }
    }
`

export const StyledDiceFaceTwo =  styled(StyledDiceFace)`
    justify-content: space-between;
    .col {
        display:flex;
    }
    ${StyledDot}:nth-of-type(2) {
        align-self: flex-end;
    }

    .icon:nth-of-type(2) {
        align-self: flex-end;
    }

    &.cube-face {
        transform: rotateX(-90deg) translateZ(50px);
    }

    @media (max-width:600px) {
        &.cube-face {
            transform: rotateX(-90deg) translateZ(30px);
        }

        ${StyledDot} {
            height:15px;
            width:15px;
        }
    }
`

export const StyledDiceFaceThree = styled(StyledDiceFace)`
    justify-content: space-between;
    
     ${StyledDot}:nth-of-type(3) {
        align-self: flex-end;
    }

     ${StyledDot}:nth-of-type(2) {
        align-self: center;
    }

    &.cube-face {
        transform: rotateY(-90deg) translateZ(50px);
    }

    @media (max-width:600px) {
        &.cube-face {
            transform: rotateY(-90deg) translateZ(30px);
        }

        ${StyledDot} {
            height:15px;
            width:15px;
        }
    }
`

export const StyledDiceFaceFour = styled(StyledDiceFace)`
    display:flex; 
    .col {
        
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        flex-grow:1;
    }

    .col:first-child {
        align-items: flex-start;
    }

    &.cube-face {
        transform: rotateY(90deg) translateZ(50px);
    }

    @media (max-width:600px) {
        &.cube-face {
            transform: rotateY(90deg) translateZ(30px);
        }

        ${StyledDot} {
            height:15px;
            width:15px;
        }
    }
`
export const StyledDiceFaceFive = styled(StyledDiceFace)`
    .col {
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        flex-grow:1;
        color: #3c4653;
    }

    .col:first-child {
        align-items: flex-start;
    }
    
    .col:nth-child(2) {
        align-items: center;
        justify-content: center;
    }

    &.cube-face {
        transform: rotateX(90deg) translateZ(50px);
    }

    @media (max-width:600px) {
        &.cube-face {
            transform: rotateX(90deg) translateZ(30px);
        }

        ${StyledDot} {
            height:15px;
            width:15px;
        }
    }
`

export const StyledDiceFaceSix = styled(StyledDiceFace)`
    display:flex;
    
    .col { 
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        flex-grow:1;
    }

    .col:first-child {
        align-items: flex-start;
    }

    &.cube-face {
        transform: rotateY(-180deg) translateZ(50px);
    }

    @media (max-width:600px) {

        &.cube-face {
            transform: rotateX(-180deg) translateZ(30px);
        }

        ${StyledDot} {
            height:15px;
            width:15px;
        }
    }
`
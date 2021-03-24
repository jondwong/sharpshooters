import styled from 'styled-components'
import {StyledDice} from '../../../dice/dice-styles'

export const INSENSITIVE_COLOR = "#3C4653"

export const StyledGameCardRow = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    
    @media (max-width:600px) {
        display: flex;
        flex-direction: column;   
    }
`

export const GameCardRowPoints = styled.div`
    font-size:1.3em;
    font-weight:bold;
    color: ${props => props.isNegative ? 'rgb(194,2,2)' : 'white' };
    border: ${props => props.isNegative ? '2px solid rgb(194, 2, 2)' : '1px solid #505050' };
    width:60px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height:60px;
`

export const GameCardRowValues = styled.div`
    display: flex;
    flex-grow: 1;

    ${StyledDice}:not(:first-child) {
        margin-left: 10px;
    }

    @media (max-width:600px) {
        display: flex;
        flex-direction: column;
        margin-top:10px;
        ${StyledDice} {
            margin:unset;
        }

        ${StyledDice}:not(:first-child) {
            margin: 10px 0px 0px 0px;
        }
    }
`

import styled from 'styled-components'
import { StyledDice } from '../dice/dice-styles'

export const StyledDiceManager = styled.div`
    display: flex;
    justify-content: space-between;
    
    ${StyledDice}:not(:first-child) {
        margin-left:20px;
    }

    @media (max-width:600px) {
        padding:10px;
        ${StyledDice}:not(:first-child) {
            margin-left: 8px;
        }
    }
`
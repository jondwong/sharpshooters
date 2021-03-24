import { FaBorderNone } from 'react-icons/fa'
import styled from 'styled-components'

export const StyledPlayer = styled.div`
    padding: 0px 20px 0px 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${props => props.isActive ? 'white' : 'grey '};
    border: ${props => props.isActive ? '1px solid rgb(59, 66, 83)' : 'none'};
    ${'' /* background-color:  ${props => props.isActive ? 'rgb(59, 66, 83)': 'none'}; */}
`

export const PlayerName = styled.div`
    flex-grow: 1;
    text-align: left;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipses;
    white-space: nowrap;
    color: ${props => props.isActive ? 'white' : 'grey '}
`

export const PlayerScore = styled.div`
    text-align: right;
    font-weight:bold;
    min-width:60px;
    font-size:.9em;
    color: ${props => props.isActive ? 'white' : 'grey '}
`

export const PlayerDiceCount = styled.div`
    display: flex;
    align-items: center;
    font-size: .9em;
    margin-left:10px;
`

export const PlayerDiceCountLabel = styled.div`
    margin-right:5px;
    min-width:20px;
    text-align: right;
`

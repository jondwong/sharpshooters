import styled from 'styled-components'
import { StyledPlayerList } from '../../components/player-list/player-list-styles'
import { HStack, Divider} from '../../components/layout'
import { StyledTurnIndicator } from '../../components/turn-indicator'
export const Heading = styled.div`
    font-weight: 900;
    color: white;
    text-transform: uppercase;
    text-align: left;
`


const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
    align-items:center;
    justify-content:center;
    background-color: #282c34;
    padding-bottom:50px;
`

export const Loading = styled(Page)``

export const GameLobby = styled(Page)`
    align-items:unset;
    justify-content:unset;
`

export const StyledGamePage = styled(Page)`
    justify-content:start;
`
export const FullScreenPlayerSection = styled.div`
    padding-top: 20px;
    padding-left: 10px;

    ${StyledPlayerList} {
        margin-top: 10px;
    }
`

export const GameContainerHStack = styled.div`
    display: flex;
    flex-direction:row;

    @media (max-width: 900px) {
        width: 100%;
        ${FullScreenPlayerSection} {
            display:none;
        }

        ${Divider} {
            display:none;
        }
    }
`

export const GameCardSection = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`

export const GameControlsSection = styled.div`
    display: ${props => props.isUserTurn ? 'flex': 'none'};
    flex-direction: row;
    margin-top:15px;

    button:not(:first-child) {
        margin-left:10px;
    }
`

export const MobilePlayerListContainer = styled.div`
    display:none;
    width: 100%;
    padding: 10px;

    ${StyledPlayerList} {
        margin-top: 10px;
    }

    @media (max-width:900px) {
        display: block;
        ${StyledPlayerList} {
            width: 100%;
            margin-left:0px;
        }
    }
`

export const InformationSection = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    ${StyledTurnIndicator} {
        flex-grow: 1;
    }
`
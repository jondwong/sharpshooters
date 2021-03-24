import GameCardRow from './components/game-card-row'
import {
    StyledGameCard
} from './game-card-styles'

const GameCard = ({
    cardData,
    onDiceClick = (row,cell) => {}
}) => {
    return(
        <StyledGameCard>
            {
                 cardData.rows.map((cardRowData, rowIdx) => {
                     return <GameCardRow 
                            rowData={cardRowData} 
                            rowIdx={rowIdx} 
                            onDiceClick={onDiceClick}
                            />
                 })
            }
        </StyledGameCard>
    )
}

export default GameCard;
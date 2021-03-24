import Dice from "../../../dice"
import { 
    INSENSITIVE_COLOR,
    StyledGameCardRow,
    GameCardRowPoints,
    GameCardRowValues
} from './game-card-row-styles'

const GameCardRow = ({ rowData, rowIdx, onDiceClick = (row, idx) => {
    console.log('GameCardRow clicked:', row, idx);
} }) => {
    return (
        <StyledGameCardRow>
            <GameCardRowPoints isNegative={rowData.points < 0}>{rowData.points}</GameCardRowPoints>
            <GameCardRowValues>
                {
                    rowData.values.map((diceValue, index)=> {
                        let isSensitive =  (index == rowData.activeIdx) ? true : false;
                        let isComplete = diceValue.owner ? true : false;
                        return (
                            <Dice
                                value={diceValue.diceVal}
                                size={60}
                                backgroundColor={ isComplete ? diceValue.owner.color : 'transparent' }
                                borderColor = { isSensitive ? 'white' : INSENSITIVE_COLOR }
                                dotColor={( isComplete || isSensitive ) ? 'white': INSENSITIVE_COLOR }
                                onClick={() => { onDiceClick(rowIdx, index); } }
                            />
                        )
                    })
                }
            </GameCardRowValues>
        </StyledGameCardRow>
    )
}

export default GameCardRow;
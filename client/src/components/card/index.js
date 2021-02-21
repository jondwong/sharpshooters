import Dice from '../die';
import './card.scss';

const Card = ({ card, highlightedValue = -1, onDiceClick=(row,cell)=>{

} }) => {
    return (
        <div className='game-card'>
            {
                card.rows.map((r, rowIdx)=> {
                    return(
                        <div className='card-row'>
                            <div className='card-row-values'>
                                {
                                    r.values.map((dice, valIdx) =>{
                                        return (
                                            <CardDice 
                                                value={dice.diceVal} 
                                                highlight={(dice.diceVal == highlightedValue ? true: false)} 
                                                sensitive={valIdx == r.activeIdx ? true : false}
                                                selectedByUser={dice.owner}
                                                onClick={ ()=>{
                                                    onDiceClick(rowIdx, valIdx);
                                                }}
                                                key={valIdx}
                                             />
                                        )
                                    })
                                }
                            </div>
                            <div className={`card-points ${r.points < 0 ? 'black' : ''}`}>
                                {
                                    r.points
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export const CardDice = ({ 
    active,  selectedByUser = null, value, 
    sensitive, highlight, onClick,
    size=60
}) => {
    return (
        <div className={`card-dice ${highlight ? 'dice-highlight' : ''}`}>
            {
                <Dice 
                    size={size} 
                    value={value} 
                    borderColor={sensitive ? 'white': '#3c4653' }
                    dotColor ={(sensitive || selectedByUser)? 'white': '#3c4653' }
                    backgroundColor={ selectedByUser ? selectedByUser.color : 'transparent'}
                    onClick={onClick}
                />
            }
        </div>
    )
}
export default Card;
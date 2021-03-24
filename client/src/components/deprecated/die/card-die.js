export const CardDice = ({ 
    selectedByUser = null, value, 
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
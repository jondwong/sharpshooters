import DiceFace from './components/dice-face'
import { RollingDice, StyledDice } from './dice-styles';

const Dice = ({
    value,
    size = null,
    rolling = false,
    onClick = () => {},
    selected = false,
    backgroundColor=null,
    borderColor=null,
    dotColor='white',
    opacity=null,
}) => {
    let additionalStyles = {};
    if(size) {
        additionalStyles.width = `${size}px`;
        additionalStyles.height = `${size}px`;
    }
    

    if (rolling) {
        return (
            <RollingDice onClick={onClick} style={additionalStyles}>
                {[1,2,3,4,5,6].map((value)=>{
                    return (
                        <DiceFace 
                            value={value} isCube={true} backgroundColor={backgroundColor}
                            dotColor={dotColor} opacity={opacity} />
                    )
                })}
            </RollingDice>
        )
    } else {
        return (
            <StyledDice onClick={onClick} selected={selected} style={additionalStyles}> 
                <DiceFace
                    value={value} isCube={false} backgroundColor={backgroundColor}
                    borderColor={borderColor} dotColor={dotColor} opacity={opacity}
                    size={size}
                />
            </StyledDice>
        )
    }
}

export default Dice;
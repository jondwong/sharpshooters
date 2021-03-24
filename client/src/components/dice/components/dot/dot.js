import {
    StyledDot
} from './dot-styles'

const Dot = ({
    color = null,
    size = null
}) => {
    let additionalStyles= {}
    if(size) {
        additionalStyles.height=`${size}px`;
        additionalStyles.width=`${size}px`
    }

    if(color) {
        additionalStyles.backgroundColor= color;
    }
    return (<StyledDot style={additionalStyles}/>)
}

export default Dot;
import React from 'react';
import Dot from '../dot';
import { FaRegStar } from 'react-icons/fa'
import {
    StyledDiceFaceOne,
    StyledDiceFaceTwo,
    StyledDiceFaceThree,
    StyledDiceFaceFour,
    StyledDiceFaceFive,
    StyledDiceFaceSix
} from './dice-face-styles';

const DiceFaceOne = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceOne className={`${isCube ? 'cube-face' : ''}`} style={styles}>
            <Dot size={dotSize} color={dotColor}/>
        </StyledDiceFaceOne>
    )
}

const DiceFaceTwo = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceTwo className={`${isCube ? 'cube-face' : ''}`} style={styles} >
            <Dot size={dotSize} color={dotColor}/>
            <Dot size={dotSize} color={dotColor}/>
        </StyledDiceFaceTwo>
    )
}

const DiceFaceThree = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceThree className={`${isCube ? 'cube-face' : ''}`} style={styles} >
            <Dot size={dotSize} color={dotColor}/>
            <Dot size={dotSize} color={dotColor}/>
            <Dot size={dotSize} color={dotColor}/>
        </StyledDiceFaceThree>
    )
}

const DiceFaceFour = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceFour className={`${isCube ? 'cube-face' : ''}`} style={styles} >
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
        </StyledDiceFaceFour>
    )
}

const DiceFaceFive = ({ isCube = false, dotSize = null, dotColor = 'white', styles={}}) => { 
    return (
        <StyledDiceFaceFive className={`${isCube ? 'cube-face' : ''}`} style={styles}>
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
            </div>
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
        </StyledDiceFaceFive>
    )
}


const DiceFaceSix = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceSix className={`${isCube ? 'cube-face' : ''}`} style={styles}>
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
        </StyledDiceFaceSix>
    )
}


const DiceFaceWild = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceOne style={styles} >
            <div className='icon'>
                <FaRegStar size={dotSize * 2} color={dotColor}/>
            </div>
        </StyledDiceFaceOne>
    )
}

const DiceFaceWild2 = ({ isCube = false, dotSize = null, dotColor = 'white', styles={} }) => { 
    return (
        <StyledDiceFaceOne style={styles}>
            <div className='icon'>
                <FaRegStar size={dotSize * 1.5} color={dotColor} />
            </div>,
             <div className='icon'>
                <FaRegStar size={dotSize * 1.5} color={dotColor} />
            </div>
        </StyledDiceFaceOne>
    )
}

const VALUE_TO_FACE = {
    '1': DiceFaceOne,
    '2': DiceFaceTwo,
    '3': DiceFaceThree,
    '4': DiceFaceFour,
    '5': DiceFaceFive,
    '6': DiceFaceSix,
    '*': DiceFaceWild,
    '**': DiceFaceWild2
};

const DiceFace = ({
    value,
    backgroundColor = null,
    borderColor = null,
    opacity = 1,
    size = null,
    isCube = false,
    dotColor = 'white'
}) => {
    let diceFace = VALUE_TO_FACE[`${value}`];

    let dotSize = null;
    let styles = {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        opacity: opacity
    };
    if(size) {
        styles.width = `${size}px`;
        styles.height = `${size}px`;
        dotSize = Math.floor(size/4);
    }
    return React.createElement(diceFace, { dotSize, dotColor, isCube, styles }, null)
};


export default DiceFace;
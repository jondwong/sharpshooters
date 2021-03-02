
import './die.scss';
import React from 'react';
import { FaRegStar} from 'react-icons/fa';

/********************************************************
 * Dice
 ********************************************************/
const Dice = ({
    value,
    size = null,
    rolling = false,
    onClick = null,
    selected = false,
    backgroundColor=null,
    borderColor=null,
    dotColor='white',
    opacity=null,
    
}) => {
    let style = {};
    if(size) {
        style.width = `${size}px`;
        style.height = `${size}px`;
    }
    
    if (!onClick) {
        onClick = () => {};
    }

    return (
        <div className={`die`} onClick={onClick} >
         {
             rolling &&
             (
                 <div className={`cube ${rolling ? 'rolling' : ''}`}>
                    {[1,2,3,4,5,6].map((value)=>{
                        return DiceFaceFactory({
                            value,
                            isCube: true,
                            backgroundColor,
                            dotColor,
                            opacity
                        })
                    })}
                </div>
                
             )
         }
         {
            !rolling  &&
            (<div className={`cube ${selected ? 'selected': ''}`} style={style}>
                { DiceFaceFactory({
                    value, 
                    backgroundColor,
                    borderColor,
                    dotColor,
                    opacity,
                    size} ) }
            </div>)
         }
            
        </div>
    )
}

export default Dice;

/********************************************************
 * Dot
 ********************************************************/
const Dot = (props) => {
    let style= {}
    if(props.size) {
        style.height=`${props.size}px`;
        style.width=`${props.size}px`
    }

    if(props.color) {
        style.backgroundColor=props.color;
    }
    return (<span className='dot' style={style}/>)
}

/********************************************************
 * DiceManager
 ********************************************************/

export class DiceManager extends React.Component {
    constructor(props) {
        super(props);
        console.log('dicemanager props =', props)
        this.state = {
            rolling: this.props.roll,
        }
    }

    componentDidMount() {
        
    }

    _rollDice() {
        this.setState({ rolling: true });
        setTimeout(function() {
            this.setState({ rolling: false });
        }.bind(this),3000)
        let dice = new Array(this.props.numDice).fill(
            null
        ).map(()=>({ value: Math.floor(Math.random() * 6) + 1 }));
        this.setState({
            dice
        });
    }

    _diceSelected(idx) {

        this.props.onDiceActivated(this.props.dice[idx], idx);
    }

    render() {
        return (
            <div className='dice-manager'>
                <div className='dice-container'>
                    {
                        this.props.dice && this.props.dice.map((d, idx)=>(
                            <Dice 
                                selected={this.props.activeDiceIdx == idx ? true: false} 
                                rolling={this.props.roll} 
                           
                                onClick={this._diceSelected.bind(this, idx)}
                                backgroundColor={this.props.currentUser.color}
                                value={d.diceVal}

                                />
                        ))
                    }
                     {
                        (!this.props.dice || this.props.dice.length == 0) && new Array(this.props.numAvailableDice).fill(null).map((d, idx)=>(
                            <Dice 
                                selected={false}
                                rolling={this.props.roll} 
                                value={Math.floor(Math.random()*6)+1}
                                onClick={()=>{}}

                                backgroundColor={this.props.currentUser.color}
                                opacity={.5}
                                />
                        ))
                    }
                </div>
                {/* <div className='dice-control'>
                    <button className='button' onClick={this._rollDice.bind(this)}>Roll Dice</button>
                </div> */}
            </div>
        );
    }
}


/********************************************************
 * DiceFaceFactory
 ********************************************************/


const DiceFaceFactory = ({ 
    value, 
    backgroundColor=null, 
    opacity=null,
    borderColor=null, 
    size = null, 
    isCube = false,
    dotColor = 'white'
}) => 
{
    const CUBE_VAL_MAPPINGS = {
        '1': { class: 'one', pos: 'front'},
        '2': { class: 'two', pos: 'bottom'},
        '3': { class: 'three', pos: 'left'},
        '4': { class: 'four', pos: 'right' },
        '5': { class: 'five', pos: 'top' },
        '6': { class: 'six', pos: 'back'},
        '*': { class: 'one' },
        '**': { class: 'two' }
    }

    const VAL_ELEMENTS = ({dotSize=null, dotColor=dotColor}) => ({
        '1': [
            <Dot size={dotSize} color={dotColor}/>
        ],
        '2': [
            <Dot size={dotSize} color={dotColor}/>,
            <Dot size={dotSize} color={dotColor}/>
        ],
        '3': [
            <Dot size={dotSize} color={dotColor}/>,
            <Dot size={dotSize} color={dotColor}/>,
            <Dot size={dotSize} color={dotColor}/>
        ],
        '4': [
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>,
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
        ],
        '5': [
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>,
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
            </div>,
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
        ],
        '6': [
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>,
            <div className='col'>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
                <Dot size={dotSize} color={dotColor}/>
            </div>
        ],
        '*': [
            <div className='icon'>
                <FaRegStar size={dotSize * 2} color={dotColor}/>
            </div>
        ],
        '**': [
             <div className='icon'>
                <FaRegStar size={dotSize * 1.5} color={dotColor} />
            </div>,
             <div className='icon'>
                <FaRegStar size={dotSize * 1.5} color={dotColor} />
            </div>
        ]
    })
    let key = `${value}`;
    let classes = [ 'side',  CUBE_VAL_MAPPINGS[key] ? CUBE_VAL_MAPPINGS[key].class : '' ]
    if( isCube && CUBE_VAL_MAPPINGS[key]) {
        classes = classes.concat([ 
            CUBE_VAL_MAPPINGS[`${value}`].pos,
        ])
    }

    let style = {};
    let dotSize = null

    if(size) {
        style.width = `${size}px`;
        style.height = `${size}px`;
        dotSize = Math.floor(size/4);
    }

    if(opacity) {
        style.opacity = opacity;
    }

    if(backgroundColor) {
        style.backgroundColor = backgroundColor; 
    }

    if( borderColor ) {
        style.borderColor = borderColor;
    }

    return (
        <div className={classes.join(" ")} style={style}>
            {VAL_ELEMENTS({dotSize, dotColor})[`${value}`]}
        </div>
    )

}
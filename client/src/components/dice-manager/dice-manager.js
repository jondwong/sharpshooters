import React from 'react'
import Dice from '../dice'
import {
    StyledDiceManager
} from './dice-manager-styles'

export default class DiceManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolling: this.props.roll
        };
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

    _generateDice() {
        console.log(this.props);

        if(this.props.dice && this.props.dice.length > 0) {
            return this.props.dice.map((d, idx) => {
                return (
                    <Dice 
                        selected={this.props.activeDiceIdx == idx ? true: false} 
                        rolling={this.props.roll} 
                        onClick={this._diceSelected.bind(this, idx)}
                        backgroundColor={this.props.currentUser.color}
                        value={d.diceVal}
                    />
                )
            });
        } else if (!this.props.dice || this.props.dice.length == 0) {
            console.log('in here in this case');
            return new Array(this.props.numAvailableDice).fill(null).map((d, idx)=>(
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

        return null;
    }

    render() {
        return (
            <StyledDiceManager>
                {this._generateDice()}
            </StyledDiceManager>
        );
    }
}
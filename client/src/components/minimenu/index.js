import React from 'react'
import {FaChessKnight} from 'react-icons/fa'
import './minimenu.scss'

const getName = (currentTurnUserId, userId, users) => {
    if(currentTurnUserId == userId) {
        return 'YOUR TURN'
    } else if(users[currentTurnUserId]) {
        return `${users[currentTurnUserId].username.toUpperCase()}'S TURN`
    }

    return '';
}
const MiniMenu = (props) => {

    
    return (
        <div className='minimenu'>
            <div className='mini-turn-indicator'>
                {getName(props.currentTurnUserId, props.userId, props.users)}          
            </div>
            <div className='mini-card-count'>
                <div className=''>{props.currentCardIdx + 1} of {props.numCards}</div>
                <FaChessKnight />
            </div>
        </div>
    )
}

export default MiniMenu;
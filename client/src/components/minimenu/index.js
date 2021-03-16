import React from 'react'
import {FaChessKnight} from 'react-icons/fa'
import './minimenu.scss'

const MiniMenu = (props) => {
    return (
        <div className='minimenu'>
            <div className='mini-turn-indicator'>
                
                {props.currentTurnUserId == props.userId ? 'YOUR' : `${props.users[props.currentTurnUserId].username.toUpperCase()}'S`} TURN
                            
            </div>
            <div className='mini-card-count'>
                <div className=''>{props.currentCardIdx + 1} of {props.numCards}</div>
                <FaChessKnight />
            </div>
        </div>
    )
}

export default MiniMenu;
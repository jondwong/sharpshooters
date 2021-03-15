import React from 'react'
import {FaDelicious} from 'react-icons/fa'
import './minimenu.scss'

const MiniMenu = (props) => {
    return (
        <div className='minimenu'>
            <div className='card-count'>
                <div className=''>{props.currentCardIdx + 1}/{props.numCards}</div>
                <FaDelicious />
            </div>
        </div>
    )
}

export default MiniMenu;
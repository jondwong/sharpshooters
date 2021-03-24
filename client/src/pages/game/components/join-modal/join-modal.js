import React, {useState} from "react"
import {
    JoinModalContainer,
    JoinModalView,
    JoinModalInput,
} from './join-modal-styles'

const JoinModal = ({ 
    onJoinGameClicked
}) => {
    const [name, setName] = useState("");

    return (
        <JoinModalContainer>
            <JoinModalView>
                <JoinModalInput className='input' placeholder='Enter your name...' value={name} onChange={e => setName(e.target.value)}/>
                <button className='button' onClick={() => onJoinGameClicked(name)}>Join</button>            
            </JoinModalView>
        </JoinModalContainer>
        
    )
}
export default JoinModal;
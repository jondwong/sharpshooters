import styled from 'styled-components'

export const JoinModalContainer = styled.div`
    position:fixed;
    top: 0; 
    left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(0,0,0,.5);
`

export const JoinModalView = styled.div`
    padding:30px;
    width:400px;
    margin-top:200px;
    background-color: #282c34;
    margin-left:-200px; 
    left:50%;
    position:relative;
    display: flex;
    box-shadow: 1px 0px 5px #273c64;
`

export const JoinModalInput = styled.input`
    background-color: #333b4b;
    border:1px solid #1c2536;
    margin-right: 10px;
    flex-grow: 1;
    color: #e2e8f1;
    margin-right:10px;
`
import styled from 'styled-components';

export const SplashPageLayout = styled.div`
    height: 100vh;
    width:100vm;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #282c34;

    .input::placeholder {
        color: #e2e8f1;
        font-weight: thin;
    }
`

export const SplashPageContent = styled.div`
    width:80%;
    min-width:600px;
    max-width:900px;

    input {
        background-color: #333b4b;
        border: 1px solid #2b2d31;
        color: #e2e8f1;
    }

    @media (max-width: 600px) {
        min-width:200px;
    }
`

export const SplashPageLogo = styled.div`
    font-size:calc(20px + 5vmin);
    padding:150px 0px 100px 0px;
    margin-top: -100px;
    color: #495772;
    font-weight: 700;
`

export const SplashPageControlRegion = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    margin-top:10px;

    div:not(:first-child) {
      margin-left:10px;  
    }
    
    @media (max-width: 600px) {
        display:flex;
        flex-direction: column;

        div:not(:first-child) {
            margin-left:0px;  
        }
    }
  }
`

export const SplashPageCreateGameSection = styled.div`
    @media (max-width:600px) {
        width:100%;

        .button {
            width:100%;
        }
    }
`

export const SplashPageJoinGameSection = styled.div`
    display:flex;
    flex-grow: 1;
    margin-left: 10px;

    .input {
        background-color: #333b4b;
        border: 1px solid #2b2d31;
        color: #e2e8f1;
        flex-grow: 1;
    }

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        width:100%;

        .button {
            margin-left:0px;
            margin-top:10px;
        }
    }
`

 

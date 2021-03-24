import styled from 'styled-components'

export const StyledGameCard = styled.div`

    min-width:600px;
    padding:20px;

    @media (max-width:600px) {
        width:100%;
        min-width:unset;
        border: none;
        padding: 0px 10px 0px 10px;
        display: flex;
        justify-content: space-between;
        min-height:400px;
        border-top:1px solid #333b4b;
        border-bottom:1px solid #333b4b;
        padding-top:15px;
        padding-bottom:10px;
    }
`
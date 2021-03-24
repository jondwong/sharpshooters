import styled from 'styled-components';
import {StyledVStack} from '../vstack';
import {StyledHStack} from '../hstack';

const Spacer = styled.div`
     ${StyledVStack} & {
        margin-top: ${props => props.size || 10}px;
     }

     ${StyledHStack} & {
        margin-left: ${props => props.size || 10}px;
     }
`

export default Spacer;
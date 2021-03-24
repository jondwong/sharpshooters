import styled from 'styled-components';
import {StyledVStack} from '../vstack';
import {StyledHStack} from '../hstack';

const Divider = styled.div`
    margin: 5px;
    border-bottom: ${props=>props.vertical ? 'none' : '1px solid #333b4b' };
    border-left: ${props=>!props.vertical ? 'none' : '1px solid #333b4b' };
`

export default Divider;
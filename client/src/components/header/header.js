import {withRouter} from 'react-router-dom';
import  {
    StyledHeader,
    StyledHeaderLogo,
    StyledHeaderLogoText,
    StyledHeaderGameId
} from './header-styles'

const Header = (props) => {
    return (
        <StyledHeader>
            <StyledHeaderLogo
                onClick={()=>{props.history.push('/'); }}>
                <StyledHeaderLogoText>sharpshooters.</StyledHeaderLogoText>
            </StyledHeaderLogo>
            <StyledHeaderGameId>{props.gameId || ''}</StyledHeaderGameId>
        </StyledHeader>
    )
}

export default withRouter(Header);
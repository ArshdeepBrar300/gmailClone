import React from 'react'
import { Menu as MenuIcon, Search, Tune, HelpOutlineOutlined, SettingsOutlined, AppsOutlined, AccountCircleOutlined, Logout as lg} from '@mui/icons-material'
import { AppBar, Toolbar, styled, InputBase, Box } from '@mui/material'
import { gmailLogo } from '../constants/constant'
import { API_URLS } from '../services/api.urls'
import useApi from '../hooks/useApi'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { redirect, useNavigate } from 'react-router-dom'

const StyledAppBar = styled(AppBar)({
    background: '#F5F5F5',
    boxShadow: 'none'
})

const SearchWrapper = styled(Box)({
    background: '#EAF1FB',
    marginLeft: 80,
    borderRadius: 8,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: 'flex',
    padding: '0 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > div': {
        width: '100%',
        padding: '0 10px',

    }
})

const Logout=styled(lg)({
    cursor:'pointer'
})
const OptionsWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    '& > svg': {
        marginLeft: '20px'
    }

})

function Header({ toggleDrawer }) {
    const logoutServices = useApi(API_URLS.logout);
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleLogout = async() => {
        // Assuming you have a route for logging out, you can redirect to that route
        console.log('logout')
         await logoutServices.call()
         let response= logoutServices.response;
         console.log(response);
       
          
            dispatch(logout());
            console.log('navigating');
        
            navigate('/login');
            
         
        // history.push("/logout");
    };

    return (
        <StyledAppBar position='static'>
            <Toolbar>
                <MenuIcon color='action' onClick={toggleDrawer} />
                <img src={gmailLogo} alt="gmail logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color='action' />
                    <InputBase placeholder='Search mail' />
                    <Tune color='action' />
                </SearchWrapper>
                <OptionsWrapper>
                    <HelpOutlineOutlined color='action' />
                    <SettingsOutlined color='action' />
                    <AppsOutlined color='action' />
                    <Logout color='action' onClick={handleLogout} />
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header
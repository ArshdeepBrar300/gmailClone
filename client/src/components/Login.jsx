import { Box, styled, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Logo from '../assets/logo.png'
import BtnLogo from '../assets/btn.png'
import useApi from '../hooks/useApi'
import { login as authLogin } from '../store/authSlice'
import { API_URLS } from '../services/api.urls'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Loginbtn = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    margin: '30px auto',

    borderRadius: '10px',
    boxShadow: 2

})

const TextWrapper = styled(Typography)({
    fontSize: 18,
    color: 'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})
const IconWrapper = styled(Box)({
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
        width: '40px',
        height: '40px'
    }

})
const LogoWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '130px'
})




function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const LoginService = useApi(API_URLS.loginSuccess)

    const GetUser = async () => {
        try {
         
            const response = await axios.get("https://itchy-sombrero-seal.cyclic.app/login/success", { withCredentials: true })


            //  LoginService.call({ withCredentials: true })

       console.log('Getting User Info')
       console.log(response);
            if (response != null) {
                console.log(response.data);
                let userData = response.data.user
                
                dispatch(authLogin({ userData }));
            
                navigate("/emails/inbox")
            }

        } catch (error) {

        }

    }
    const loginWithGoogle = () => {
        window.open(`/auth/google`, '_self')

    }


    useEffect(() => {
        GetUser()
       
    }, [])

    return (
        <div>

            <LogoWrapper>
                <img src={Logo} alt='signin' />
            </LogoWrapper>
            <Loginbtn sx={{ boxShadow: 3 }} onClick={loginWithGoogle}>
                <IconWrapper><img src={BtnLogo} /></IconWrapper>
                <TextWrapper> Sign In with Google</TextWrapper>

            </Loginbtn>
        </div>
    )
}

export default Login
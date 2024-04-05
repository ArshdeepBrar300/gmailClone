import { AccountCircle, ArrowBack, Delete } from '@mui/icons-material'
import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { API_URLS } from '../services/api.urls'
import useApi from '../hooks/useApi'
import { useLocation, useOutletContext } from 'react-router-dom'
function ViewEmail() {
    const { openDrawer } = useOutletContext()

    const { state } = useLocation();
    const deleteEmailService = useApi(API_URLS.moveEmailsToBin)

    const email = state.email

    const SubjectWrapper = styled(Typography)({
        fontSize: 22,
        margin: '10px 0 20px 75px',
        display: 'flex'
    })
    const IconWrapper = styled(Box)({
        padding: 15

    })

    const Indicator = styled(Box)({
        fontSize: 12,
        backgroundColor: '#ddd',
        color: '#222',
        padding: '2px 4px',
        marginLeft: 6,
        borderRadius: 4,
        alignSelf: 'center'

    })

    const Container = styled(Box)({
        marginLeft: 15,

        width: '100%',
        '& > div': {
            display: 'flex',
            '& > p > span': {
                fontSize: 12,
                color: '#5e5e5e'
            }
        }
    })



    const Date = styled(Box)({
        margin: '10px 50px 0 auto',
        fontSize: 12,
        color: '#5e5e5e'

    })

    const Image = styled(AccountCircle)({
        borderRadius: '50%',
        width: 40,
        height: 40,
        margin: '5px 10px 0 10px',
        color: '#cccccc'
    })

    const deleteEmail = (id) => {
        console.log(deleteEmailService);
        deleteEmailService.call([id]);
        window.history.back();
    }
    return (
        <Box style={openDrawer ? { marginLeft: 250 } : { width: '100%' }}>
            <IconWrapper>
                <ArrowBack onClick={() => window.history.back()} color='action' fontSize='small' />
                <Delete style={{ marginLeft: 30 }} color='action' fontSize='small' onClick={() => deleteEmail(email._id)} />
            </IconWrapper>
            <SubjectWrapper>
                {email.subject}
                <Indicator component='span'>
                    Inbox
                </Indicator >
            </SubjectWrapper>
            <Box style={{ display: 'flex' }}>
                <Image />
                <Container >
                    <Box>
                        <Typography style={{ marginTop: 10 }}>{email.name}
                            <Box component='span'>&nbsp;&lt;{email.to}&gt;</Box>
                        </Typography>
                        <Date>
                            {(new window.Date(email.date)).getDate()}&nbsp;
                            {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}&nbsp;
                            {(new window.Date(email.date)).getFullYear()}
                        </Date>
                    </Box>
                    <Typography style={{ marginTop: 20 }}>
                        {email.body}
                    </Typography>
                </Container>
            </Box>

        </Box>
    )
}

export default ViewEmail
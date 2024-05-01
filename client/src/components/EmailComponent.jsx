
import { StarBorder, Star } from '@mui/icons-material'
import { Box, Checkbox, Typography, styled } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from "../routes/routes"
import useApi from '../hooks/useApi'
import { API_URLS } from '../services/api.urls'


const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > div': {
        display: 'flex',
        width: '100%',
        '& > p': {
            fontSize: 14
        }
    }

})

const Indicator = styled(Typography)({
    fontSize: '12px !important',
    background: '#ddd',
    color: '#222',
    padding: '0 4px',
    borderRadius: 4,
    marginRight: 6
})

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5f6368'

})

function EmailComponent({ email, selectedEmails, setRefreshScreen, setSelectedEmails
}) {
    const navigate = useNavigate();
    const toggleStarredService = useApi(API_URLS.toggleStarredEmail);
    const toggleStarredEmails = () => {
        toggleStarredService.call({ id: email._id, value: !email.starred })
        setRefreshScreen(prev => !prev)
    }
    const onValueChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prev => prev.filter(id => email._id != id))
        }
        else {
            setSelectedEmails(prev => [...prev, email._id])
        }
    }


    return (
        <Wrapper>
            <Checkbox size='small' checked={selectedEmails.includes(email._id)} onChange={() => onValueChange()} />
            {
                email.starred ? <Star fontSize='small' style={{ marginRight: 10, color: '#fff200' }} onClick={() => toggleStarredEmails()} /> :
                    <StarBorder fontSize='small' style={{ marginRight: 10 }} onClick={() => toggleStarredEmails()} />
            }

            <Box onClick={() => navigate(routes.view.path, { state: { email: email } })}>

                <Typography style={{ width: 200, overflow: 'hidden' }}>
                    {
                        email.name
                    }
                </Typography>
                <Indicator>Inbox</Indicator>
                <Typography>{email.subject}
                    {email.body && '-'}{email.body.substr(0,25)}</Typography>
                <Date>{(new window.Date(email.date)).getDate()}{(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}</Date>
            </Box>

        </Wrapper>
    )
}

export default EmailComponent
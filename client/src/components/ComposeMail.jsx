import styled from '@emotion/styled'
import { Close, DeleteOutlined, Send } from '@mui/icons-material'
import { Box, Button, Dialog, InputBase, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useApi from '../hooks/useApi'
import { API_URLS } from '../services/api.urls'
import { useSelector } from 'react-redux'

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',

}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: "space-between",
    padding: '10px 15px',
    background: '#f2f6fc',
    '& > p': {
        fontSize: 14,
        fontWeight: 500
    }

})

const RecipientWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div': {
        fontSize: 14,
        borderBottom: '1px solid #f5f5f5',
        marginTop: 10
    }
})

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    textAlign: 'center'

})

const SendButton = styled(Button)({
    background: '#0b57d0',
    color: '#ffff',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: 18,
    width: 100
})

const MessageBody = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'

})
function ComposeMail({ openDialog, setOpenDialog }) {
    const [data, setData] = useState({})
    const userData=useSelector(state => state.auth.userData)
    const saveDraftService = useApi(API_URLS.saveDraftEmails)
    const sentEmailService = useApi(API_URLS.saveSentEmail)
    const config = {
        Host: "smtp.elasticemail.com",
        Username: process.env.REACT_APP_USERNAME,
        Password: process.env.REACT_APP_PASSWORD,
        Port: 2525,

    }
    const closeComposeMail = (e) => {
        console.log('user data: ');
        console.log(userData);
        e.preventDefault();
        const payload = {
            to: data.to,
            from: userData.email,
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Arshdeep',
            starred: false,
            type: 'drafts'
        }
        saveDraftService.call(payload)
        if (!saveDraftService.error) {
            setOpenDialog(false)
            setData({})
        }
        else {
            console.log(saveDraftService.error);
        }
        setOpenDialog(false)

    }
    const onValueChanged = (e) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value

        }));
    }
    const sendMail = () => {
        if (window.Email) {
            window.Email.send({
                ...config,
                To: data.to,
                From: userData.email,
                Subject: data.subject,
                Body: data.body
            }).then(
                message => alert(message)
            );
        }

        const payload = {
            to: data.to,
            from: userData.email,
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Arshdeep',
            starred: false,
            type: 'sent'
        }
        sentEmailService.call(payload)
        if (!sentEmailService.error) {
            setOpenDialog(false)
            setData({})
        }
        else {
            console.log(sentEmailService.error);
        }
    }
    return (
        <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
            <Header>
                <Typography >New Message</Typography>
                <Close fontSize='small' onClick={closeComposeMail} />
            </Header>
            <RecipientWrapper>
                <InputBase placeholder='Recipients' name='to' onChange={(e) => onValueChanged(e)} />
                <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChanged(e)} />

            </RecipientWrapper>
            <MessageBody>

                <TextField multiline rows={14} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} name='body' onChange={(e) => onValueChanged(e)} />
                <Footer>
                    <SendButton onClick={sendMail}>Send</SendButton>
                    <DeleteOutlined onClick={() => setOpenDialog(false)} />

                </Footer>

            </MessageBody>


        </Dialog>
    )
}

export default ComposeMail
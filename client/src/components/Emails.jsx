import React, { useEffect, useState } from 'react'
import { API_URLS } from '../services/api.urls'
import useApi from '../hooks/useApi'
import { useOutletContext, useParams } from 'react-router-dom'
import { Checkbox, List, Box } from '@mui/material'
import { DeleteOutline,Refresh } from '@mui/icons-material'
import EmailComponent from './EmailComponent'

import NoMails from './NoMails'
import { EMPTY_TABS } from '../constants/constant'
import Spinner from './Spinner'

function Emails() {
    const [selectedEmails, setSelectedEmails] = useState([])
    const [refreshScreen, setRefreshScreen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isChecked, setChecked] = useState(false);

    const { openDrawer } = useOutletContext()
    const { type } = useParams()

    const getEmailsServices = useApi(API_URLS.getEmailFromType)
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin)
    const deleteEmailService = useApi(API_URLS.deleteEmail)

    const fetchEmails=async()=>{
        await  getEmailsServices.call({}, type)
       setLoading(false)
    }
    useEffect(() => {
      setLoading(true)
        fetchEmails()

        
        
        
    }, [type, refreshScreen])


    const selectAllEmails = (e) => {
        setChecked(e.target.checked)
        if (e.target.checked) {
            const emails = getEmailsServices?.response?.map(email => (email._id))
            setSelectedEmails(emails)

        }
        else {
            setSelectedEmails([])

        }

    }

    const deleteSelectedEmails = () => {
        if (type === 'bin') {
            deleteEmailService.call(selectedEmails)
            reloadScreen()

        } else {
            moveEmailsToBinService.call(selectedEmails)
            reloadScreen()
        }
        setChecked(false)
       
        setSelectedEmails([])


    }
    const reloadScreen=(e)=>{
        setRefreshScreen(prev=>!prev)
    }
    // console.log(getEmailsServices.response.emails);
    return (
        <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100% - 250px)' } : { width: '100%' }}>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size='small' onChange={(e) => selectAllEmails(e)} checked={isChecked} />
                <DeleteOutline onClick={(e) => deleteSelectedEmails()} />
                <Refresh size='small' onClick={(e)=>reloadScreen()}/>
            </Box>
            <List>
                {
                    
                    getEmailsServices?.response && getEmailsServices.response.map((email) => {
                       
                        // if(email!=null)
                        return <EmailComponent email={email} key={email._id} selectedEmails={selectedEmails} setRefreshScreen={setRefreshScreen} setSelectedEmails={setSelectedEmails} />
                        //  return null;
                    }

                    )
                }

            </List>
            {
                getEmailsServices?.response?.length == 0 && <NoMails message={EMPTY_TABS[type]} />
            }
            {
                loading && <Spinner/>
            }



        </Box>
    )
}

export default Emails
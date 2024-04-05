import React, { useState } from 'react'
import API_GMAIL from '../services/api'
function useApi(urlObject) {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const call = async (payload = '', type = '') => {
        try {
            setResponse(null)
            setError('')
            setLoading(true)
            let res = await API_GMAIL(urlObject, payload, type)
         
            if (res.data.emails) {
             
                setResponse(res.data.emails);
            }
            else {
                
                setResponse(res.data)
           
            }


        } catch (error) {
            console.log(urlObject);

            setError(error.message)
            console.log('Error calling api to gmail', error.message);
        }
        finally {
            setLoading(false)

        }
    }
    return { call, response, error, loading }
}

export default useApi
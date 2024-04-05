import axios from 'axios';
import { useSelector } from 'react-redux'
const API_URL='https://gmailserver-j0ib.onrender.com'
const API_GMAIL=async(urlObject,payload,type)=>{
    const authData
     = useSelector(state => state.auth.userData)
    console.log(authData);
    if(urlObject.method=='POST')
    {return await axios.post(`${API_URL}/${urlObject.endpoint}/${type}`,{
        data:payload,
        headers:{
            'session':{
                'passport':{
                    'user': authData
                }
            }
        }
    })}
    else{
        return await axios.get(`${API_URL}/${urlObject.endpoint}/${type}`,{
            headers:{
            'session':{
                'passport':{
                    'user': authData
                }
            }
        }
        })
    }
}

export default API_GMAIL
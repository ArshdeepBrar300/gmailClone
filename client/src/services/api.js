import axios from 'axios';
import { useSelector } from 'react-redux'
const API_URL='https://gmailserver-j0ib.onrender.com'
const API_GMAIL=async(urlObject,payload,type)=>{
    const authData
     = useSelector(state => state.auth.userData)
    console.log(payload);
    if(urlObject.method=='POST')
    {return await axios.post(`${API_URL}/${urlObject.endpoint}/${type}`,{
        data:payload,
        session:{
            passport:{
                user: authData
            }
        }
    })}
    else{
        return await axios.get(`${API_URL}/${urlObject.endpoint}/${type}`,{
            session:{
                passport:{
                    user: authData
                }
            }
        })
    }
}

export default API_GMAIL
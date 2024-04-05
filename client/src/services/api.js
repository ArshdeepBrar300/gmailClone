import axios from 'axios';

const API_URL='https://gmailserver-j0ib.onrender.com'
const API_GMAIL=async(urlObject,payload,type)=>{
    console.log(payload);
    return await fetch(`${API_URL}/${urlObject.endpoint}/${type}`,{
        method: urlObject.method,
        body:payload
    })

}

export default API_GMAIL
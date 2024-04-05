import axios from 'axios';

const API_URL='https://gmailserver-j0ib.onrender.com'
const API_GMAIL=async(urlObject,payload,type)=>{
    console.log(payload);
    if(urlObject.method=='POST')
    {return await axios.post(`${API_URL}/${urlObject.endpoint}/${type}`,{
        data:payload
    })}
    else{
        return await axios.get(`${API_URL}/${urlObject.endpoint}/${type}`)
    }
}

export default API_GMAIL
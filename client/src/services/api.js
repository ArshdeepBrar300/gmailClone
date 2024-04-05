import axios from 'axios';

const API_URL='https://gmailserver-j0ib.onrender.com'
const API_GMAIL=async(urlObject,payload,type)=>{
    console.log(payload);
    return await axios({
        method: urlObject.method,
        url:`${API_URL}/${urlObject.endpoint}/${type}`,
        data:payload
    })

}

export default API_GMAIL
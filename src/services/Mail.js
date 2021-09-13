import axios from "axios"
import config from '../../config/config.js'
export default {
    async sendMail(data){
        let res = await axios.post(`${config.api_url}/api/contact/send`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
    }
}
import axios from "axios"
import config from '../../config/config.js'
export default {
    async paymentOrder(data){
        let res = await axios.post(`${config.api_url}/api/stripe/payment`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
}
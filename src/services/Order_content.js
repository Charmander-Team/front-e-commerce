import axios from "axios"
import config from '../../config/config.js'
export default {
    async createOrderContent(data){
        let res = await axios.post(`${config.api_url}/api/order_content`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
}
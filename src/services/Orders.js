import axios from "axios"
import config from '../../config/config.js'
export default {
    async createOrder(data){
        let res = await axios.post(`${config.api_url}/api/order`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
    
    async loadOrderByUser(data){
        let res = await axios.get(`${config.api_url}/api/order/user/${data}`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      }
}
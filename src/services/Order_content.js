import axios from "axios"
import config from '../../config/config.js'
export default {
    async createOrderContent(data){
        let res = await axios.post(`${config.api_url}/api/order_content`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

      async loadOrderContentByOrder(data){
        let res = await axios.get(`${config.api_url}/api/order_content/order/${data}`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

      async updateOrderContent(id,data){
        let res = await axios.put(`${config.api_url}/api/order_content/${id}`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
      
      async deleteOrderContent(id){
        let res = await axios.delete(`${config.api_url}/api/order_content/${id}`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
}
import axios from "axios"
import config from '../../config/config.js'
export default {

      async createUser(data){
        let res = await axios.post(`${config.api_url}/api/user`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

      async checkUser(data){
        let res = await axios.post(`${config.api_url}/api/user/check`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      }, 

      async checkUserToken(data){
        let res = await axios.post(`${config.api_url}/api/user/check/token`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

      async updateUser(id,data){
        let res = await axios.put(`${config.api_url}/api/user/${id}`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

  }

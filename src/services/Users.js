import axios from "axios"
import apiPort from '../../config/api_port.js'
export default {

      async createUser(data){
        let res = await axios.post(`http://localhost:${apiPort}/api/user`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

      async checkUser(data){
        let res = await axios.post(`http://localhost:${apiPort}/api/user/check`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      }, 

      async checkUserToken(data){
        let res = await axios.post(`http://localhost:${apiPort}/api/user/check/token`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

      async updateUser(id,data){
        let res = await axios.put(`http://localhost:${apiPort}/api/user/${id}`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

  }
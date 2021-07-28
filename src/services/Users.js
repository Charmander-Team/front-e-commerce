import axios from "axios"
import apiPort from '../../config/api_port.js'
export default {

      async createUser(data){
        let res = await axios.post(`http://localhost:${apiPort}/api/user`,data).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },

  }
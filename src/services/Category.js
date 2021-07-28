import axios from "axios"
import apiPort from '../../config/api_port.js'
export default {

      async loadCategoryNouveaute(){
        let res = await axios.get(`http://localhost:${apiPort}/api/category`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
      
      async loadCartesByCategory(id){
        let res = await axios.get(`http://localhost:${apiPort}/api/product/category/${id}`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      }

  }
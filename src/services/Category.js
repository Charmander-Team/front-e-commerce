import axios from "axios"
import config from '../../config/config.js'
export default {

      async loadCategoryNouveaute(){
        let res = await axios.get(`${config.api_url}/api/category`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
      },
      
      async loadCartesByCategory(id){
        let res = await axios.get(`${config.api_url}/api/product/category/${id}`).then((response) => {
            console.log("loadallcartes",response.data)
            return response.data

        }).catch(error => console.log(error))
        return res
      }

  }

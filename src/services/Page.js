import axios from "axios"
import config from '../../config/config.js'
export default {

    async loadAllPage(){
        let res = await axios.get(`${config.api_url}/api/page`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
    },
    async loadPageById(id){
        let res = await axios.get(`${config.api_url}/api/page/${id}`).then((response) => {

            return response.data

        }).catch(error => console.log(error))
        return res
    },
}
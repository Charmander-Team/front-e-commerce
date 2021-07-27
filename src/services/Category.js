import axios from "axios"
import apiPort from '../../config/api_port.js'
export default {

      async loadCategoryNouveaute(){
        let res = await axios.get(`http://localhost:${apiPort}/api/product`).then((response) => {

            let card = {
                card_id: response.data.id,
                img: response.data.image,
                name: response.data.name,
                ref: response.data.ref,
                type: response.data.energy_type,
                price: response.data.price,
                bid: response.data.bid,
                date: response.data.createdAt,
                description: response.data.description
            }

            return card

        }).catch(error => console.log(error))
        return res
      }

  }
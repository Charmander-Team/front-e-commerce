import axios from "axios"
import apiPort from '../../config/api_port.js'
export default {
    async loadAllcards(){
       let res = await axios.get(`http://localhost:${apiPort}/api/product`).then((response) => {
        //   console.log(response.data)

          let cards = [
            {
                title_list: "Nouveautés",
                list: []
            },
            {
                title_list: "Cartes Pokémon",
                list: []
            },
            {
                title_list: "Cartes dresseurs",
                list: []
            }
        ];
    
        let [
            {list: news_cards_list},
            {list: pokemon_cards_list},
            {list: trainer_cards_list}
            ] = cards;
      

            response.data.forEach((card_db) => {
                const current_ts = Date.now() / 1000;
                const field_date_ts = new Date(card_db.createdAt).getTime() / 1000; //console.log(field_date_timestamp);
                const one_month_ts = 60 * 60 * 24 * 30;
                let card = {
                    card_id: card_db.id,
                    img: card_db.image,
                    name: card_db.name,
                    ref: card_db.ref,
                    type: card_db.energy_type,
                    price: card_db.price,
                    bid: card_db.bid,
                    date: card_db.createdAt,
                    stock: card_db.stock
                };
                if (current_ts - field_date_ts <= one_month_ts && news_cards_list.length < 6) {
                    
                    news_cards_list.push(card);
                }

                if(card_db.category_id === 1 && pokemon_cards_list.length < 6 ) {
                    pokemon_cards_list.push(card);
                }
                
                if(card_db.category_id === 2 && trainer_cards_list.length < 6 ) {
                    trainer_cards_list.push(card);
                }
            });
            // console.log("cards",cards)
          return cards
        }).catch(error => console.log(error))

        return res
      },

      async loadCardById(id){
        let res = await axios.get(`http://localhost:${apiPort}/api/product/${id}`).then((response) => {

            let card = {
                card_id: response.data.id,
                img: response.data.image,
                name: response.data.name,
                ref: response.data.ref,
                type: response.data.energy_type,
                price: response.data.price,
                bid: response.data.bid,
                date: response.data.createdAt,
                description: response.data.description,
                stock: response.data.stock
            }

            return card

        }).catch(error => console.log(error))
        return res
      },

      async loadNouveautes(){
        let res = await axios.get(`http://localhost:${apiPort}/api/product`).then((response) => {
            let news_cards_list = []
            response.data.forEach((card_db) => {
                const current_ts = Date.now() / 1000;
                const field_date_ts = new Date(card_db.createdAt).getTime() / 1000; //console.log(field_date_timestamp);
                const one_month_ts = 60 * 60 * 24 * 30;
                let card = {
                    card_id: card_db.id,
                    img: card_db.image,
                    name: card_db.name,
                    ref: card_db.ref,
                    type: card_db.energy_type,
                    price: card_db.price,
                    bid: card_db.bid,
                    date: card_db.createdAt,
                    stock: card_db.stock
                };
                if (current_ts - field_date_ts <= one_month_ts && news_cards_list.length < 30) {
                    
                    news_cards_list.push(card)
                }
            })
            return news_cards_list
        }).catch(error => console.log(error))
        return res

      }
  }
import axios from "axios"
import apiPort from '../../config/api_port.js'
export default {
    async loadAllcards(){
       let res = await axios.get(`http://localhost:${apiPort}/api/product`).then((response) => {
          console.log(response.data)

          let cards = [
            {
                title_list: "Nouveautés",
                list: []
            },
            // {
            //     title_list: "Cartes Pokemon",
            //     list: []
            // },
            // {
            //     title_list: "Cartes dresseur",
            //     list: []
            // }
        ];
    
        let [
            {list: news_cards_list},
            // {list: pokemon_cards_list},
            // {list: trainer_cards_list}
            ] = cards;
      

            response.data.forEach((card_db) => {
                // console.log("cards",card_db.createdAt)
                const current_ts = Date.now() / 1000;
                // const { createdAt: field_date } = card_db; //console.log(current);
                const field_date_ts = new Date(card_db.createdAt).getTime() / 1000; //console.log(field_date_timestamp);
                // const field_date_ts = field_date.getTime() / 1000; //console.log(field_date_timestamp);
                const one_month_ts = 60 * 60 * 24 * 30;
                if (current_ts - field_date_ts <= one_month_ts) {
                    let card = {
                        card_id: card_db.id,
                        img: card_db.image,
                        name: card_db.name,
                        ref: card_db.ref,
                        type: card_db.energy_type,
                        price: card_db.price,
                        bid: card_db.bid,
                        date: card_db.date
                    };
                    news_cards_list.push(card);
                }
            });
            news_cards_list.length = 6; //console.log(news_cards_list.length);
            console.log("cards",cards)
          return cards
        }).catch(error => console.log(error))

        return res
      },
  }
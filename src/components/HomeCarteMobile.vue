<template>
    <v-container>
        <v-row v-for="(item, index) in cartes" :key="index">
            <v-divider class="mx-2"></v-divider>
            <v-col cols="12" lg="12" md="12">
                <div class="text-h6">{{ item.title_list }} :</div>
            </v-col>
            <v-layout
                class="mx-auto"
                max-width="300"
            >
                <v-slide-group
                v-model="model"
                class="pa-0 mb-3"
                active-class="success"
                show-arrows
                
                prev-icon="mdi-chevron-left"
                next-icon="mdi-chevron-right"
                >
                <v-slide-item
                    v-for="(carteCard, caracteristique) in item.list"
                    :key="caracteristique"
                >
                    <v-col
                    cols="auto"
        
                >
                    <div>
                    <v-img
                        width="100%"
                        height="auto"
                        max-width="250"
                        :src="carteCard.img"
                    ></v-img>
                    <v-card max-width="250" class="mt-3 pa-2">
                        <v-card-title class="px-0 py-0 text-lg-body-3 text-md-body-1">
                        {{ capitalizeFirstLetter(carteCard.name) }}
                        </v-card-title>
                        <v-card-text class="px-0 py-0 text-lg-custom">
                        <div class="grey--text">Ref: {{ carteCard.ref }}</div>
                        <div class="grey--text">Type: {{ carteCard.type }}</div>
                        <v-row align="center" class="mx-0">
                            <div class="grey--text">
                            Niveau:
                            </div>
                            <v-rating
                            :value="carteCard.niveau"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                            ></v-rating>
                        </v-row>
                        </v-card-text>
                        <v-divider class="ma-1"></v-divider>
                        <v-card-text class="px-0 py-0">
                        <div class="grey--text mb-1">
                            Prix: {{ carteCard.price }} ???
                        </div>
                        <v-btn small color="deep-purple" dark v-if="carteCard.bid===0">
                          <!-- Acheter -->
                          Panier <sup>+</sup>
                        </v-btn>
                        <v-btn small color="deep-purple" dark v-if="carteCard.bid===1">
                          Ench??rir
                        </v-btn>
                        <v-btn small color="deep-purple" class="ml-2" dark>
                          <router-link style="text-decoration:none;color:#ffffff;" :to="{ name: 'VoirCarte', params: { cardId: carteCard.card_id }}">Voir</router-link>
                        </v-btn>
                        </v-card-text>
                    </v-card>
                    </div>
                </v-col>                    
                </v-slide-item>
                </v-slide-group>
            </v-layout>
        </v-row>
    </v-container>
</template>
<script>
import Products from '@/services/Products.js';
export default {
    name:"HomeCarteMobile",
    data: () => ({
      model: null,
      cartes: [
      {
        categorie: "Nouveaut??s",
        liste: [
          {
            img: "salameche.png",
            nom: "Salam??che",
            ref: "SCPM01",
            type: "Feu",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: true,
            enchere: false,
          },
          {
            img: "pikachu.png",
            nom: "Pikachu",
            ref: "SCPM02",
            type: "??lectrique",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: false,
            enchere: true,
          },
          {
            img: "bulbizarre.png",
            nom: "Bulbizarre",
            ref: "SCPM03",
            type: "Plante",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: false,
            enchere: true,
          },
          {
            img: "grodoudou.png",
            nom: "Grodoudou",
            ref: "SCPM04",
            type: "Psy",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: true,
            enchere: false,
          },
          {
            img: "draco.png",
            nom: "Draco",
            ref: "SCPM05",
            type: "Dragon",
            niveau: 1,
            prix: "20",
            devise: "???",
            achat: true,
            enchere: false,
          },
          {
            img: "zorua.png",
            nom: "Zorua",
            ref: "SCPM06",
            type: "Obscurit??",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: false,
            enchere: true,
          },
        ],
      },
      {
        categorie: "Exclusivit??s",
        liste: [
          {
            img: "zorua.png",
            nom: "Zorua",
            ref: "SCPM06",
            type: "Obscurit??",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: false,
            enchere: true,
          },
          {
            img: "draco.png",
            nom: "Draco",
            ref: "SCPM05",
            type: "Dragon",
            niveau: 1,
            prix: "20",
            devise: "???",
            achat: true,
            enchere: false,
          },
          {
            img: "grodoudou.png",
            nom: "Grodoudou",
            ref: "SCPM04",
            type: "Psy",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: true,
            enchere: false,
          },
          {
            img: "salameche.png",
            nom: "Salam??che",
            ref: "SCPM01",
            type: "Feu",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: true,
            enchere: false,
          },
          {
            img: "bulbizarre.png",
            nom: "Bulbizarre",
            ref: "SCPM03",
            type: "Plante",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: false,
            enchere: true,
          },
          {
            img: "pikachu.png",
            nom: "Pikachu",
            ref: "SCPM02",
            type: "??lectrique",
            niveau: 2,
            prix: "20",
            devise: "???",
            achat: false,
            enchere: true,
          },
        ],
      },
    ],
    }),

    methods:{
    async getEventDataProduct() {
      Products.loadAllcards()
      .then(
        (event => {
          console.log("event home carte",event)
          this.$set(this, "cartes", event);
        }).bind(this)
      );
    },
    
    loadAllCarte(){
      this.$axios.get(`http://localhost:${this.$apiPort}/api/product`).then((response) => {
        console.log(response.data)
        this.cartes=response.data
      }).catch(error => console.log(error))
    },
    capitalizeFirstLetter(string) {
      let capitalize = string.charAt(0).toUpperCase() + string.slice(1);
      return capitalize.replace('-', ' ')
      }
    },
    async created(){
      await this.getEventDataProduct()
      // await this.loadAllCarte()
    }

}
</script>
<style lang="scss">
.v-slide-group__next, .v-slide-group__prev{
    min-width: 2px !important;
}
</style>
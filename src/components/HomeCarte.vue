<template>
  <v-container>
    <v-row v-for="(item, index) in cartes" :key="index">
      <v-divider class="mx-2"></v-divider>
      <v-col cols="12" lg="12" md="12">
        <div class="text-h6">{{ item.title_list }} :</div>
      </v-col>
      <v-col
        cols="auto"
        lg="2"
        md="4"
        sm="4"
        v-for="(carteCard, caracteristique) in item.list"
        :key="caracteristique"
      >
        <div>
          <v-img
            width="100%"
            height="auto"
            max-width="150"
            :src="carteCard.img"
          ></v-img>
          <v-card max-width="150" class="mt-3 pa-2">
            <v-card-title class="px-0 py-0 text-lg-body-3 text-md-body-1">
              {{ capitalizeFirstLetter(carteCard.name) }}
            </v-card-title>
            <v-card-text class="px-0 py-0 text-lg-custom">
              <div class="grey--text">Ref: {{ carteCard.ref }}</div>
              <div class="grey--text">Type: {{ carteCard.type }}</div>
              <v-row align="center" class="mx-0">
                <div class="grey--text">
                  Etat:
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
                Prix: {{ carteCard.price }} €
              </div>
              <v-btn small color="deep-purple" dark v-if="carteCard.bid===0">
                <!-- Acheter -->
                Panier <sup>+</sup>
              </v-btn>
              <v-btn small color="deep-purple" dark v-if="carteCard.bid===1">
                Enchèrir
              </v-btn>
              <v-btn small color="deep-purple" class="mt-2" dark>
                <router-link style="text-decoration:none;color:#ffffff;" to="/VoirCarte">Voir</router-link>
              </v-btn>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "HomeCarte",
  data: () => ({
    cartes: [
      {
        categorie: "Nouveautés",
        liste: [
          {
            img: "salameche.png",
            nom: "Salamèche",
            ref: "SCPM01",
            type: "Feu",
            niveau: 2,
            prix: "20",
            devise: "€",
            achat: true,
            enchere: false,
          },
          {
            img: "pikachu.png",
            nom: "Pikachu",
            ref: "SCPM02",
            type: "Électrique",
            niveau: 2,
            prix: "20",
            devise: "€",
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
            devise: "€",
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
            devise: "€",
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
            devise: "€",
            achat: true,
            enchere: false,
          },
          {
            img: "zorua.png",
            nom: "Zorua",
            ref: "SCPM06",
            type: "Obscurité",
            niveau: 2,
            prix: "20",
            devise: "€",
            achat: false,
            enchere: true,
          },
        ],
      },
      {
        categorie: "Exclusivités",
        liste: [
          {
            img: "zorua.png",
            nom: "Zorua",
            ref: "SCPM06",
            type: "Obscurité",
            niveau: 2,
            prix: "20",
            devise: "€",
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
            devise: "€",
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
            devise: "€",
            achat: true,
            enchere: false,
          },
          {
            img: "salameche.png",
            nom: "Salamèche",
            ref: "SCPM01",
            type: "Feu",
            niveau: 2,
            prix: "20",
            devise: "€",
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
            devise: "€",
            achat: false,
            enchere: true,
          },
          {
            img: "pikachu.png",
            nom: "Pikachu",
            ref: "SCPM02",
            type: "Électrique",
            niveau: 2,
            prix: "20",
            devise: "€",
            achat: false,
            enchere: true,
          },
        ],
      },
    ],
  }),
  methods:{
    loadAllCarte(){
      this.$axios.get("http://localhost:3006/products").then((response) => {
        console.log(response.data)
        this.cartes=response.data
      }).catch(error => console.log(error))
    },
    capitalizeFirstLetter(string) {
      let capitalize = string.charAt(0).toUpperCase() + string.slice(1);
      return capitalize.replace('-', ' ')
    }
  },
  async mounted(){
    await this.loadAllCarte()
  }
};

</script>
<style lang="scss">
  .text-lg-custom{
    font-size: 0.75rem !important;
    line-height:1rem !important;
  }
</style>



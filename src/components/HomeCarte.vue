<template>
  <v-container>
    <v-row v-for="(item, index) in cartes" :key="index">
      <v-divider class="mx-2"></v-divider>
      <v-col cols="12" lg="12" md="12">
        <div class="text-h6">{{ item.categorie }} :</div>
      </v-col>
      <v-col
        cols="auto"
        lg="2"
        md="4"
        sm="4"
        v-for="(carteCard, caracteristique) in item.liste"
        :key="caracteristique"
      >
        <div>
          <v-img
            width="100%"
            height="auto"
            max-width="150"
            :src="require('../assets/' + carteCard.img)"
          ></v-img>
          <v-card max-width="150" class="mt-3 pa-2">
            <v-card-title class="px-2 py-0 text-lg-body-3 text-md-body-1">
              {{ carteCard.nom }}
            </v-card-title>
            <v-card-text class="px-2 py-0">
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
            <v-card-text class="px-2 py-0">
              <div class="grey--text mb-1">
                Prix: {{ carteCard.prix }}{{ carteCard.devise }}
              </div>
              <v-btn small color="deep-purple" dark v-if="carteCard.achat">
                Acheter
              </v-btn>
              <v-btn small color="deep-purple" dark v-if="carteCard.enchere">
                Enchèrir
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
};
</script>

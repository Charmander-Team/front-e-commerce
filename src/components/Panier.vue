<template>
  <div>

        <v-tab @click="$store.state.Panier.sheet = !$store.state.Panier.sheet">
          <v-img src="../assets/panier_icon.png" width="58" height="auto">
            <v-badge
          color="black"
          :content="$store.state.Panier.nbProduit"
        ></v-badge>
          </v-img>
          <!-- PANIER -->
      </v-tab>
    <v-bottom-sheet  v-model="$store.state.Panier.sheet">
      <v-sheet
        class="text-center"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="$store.state.Panier.sheet = !$store.state.Panier.sheet"
        >
          fermer
        </v-btn>
        <div class="table-overflow py-3" :style="$store.state.Users.connexion?'margin-bottom:104px':'margin-bottom:144px'">
          <p>Dans votre Pokéball</p>
          <v-data-table
            :headers="headers"
            :options="{}"
            item-key="id"
            :items="$store.state.Panier.contenu"
            :items-per-page="5"
            :sort-desc="true"
          >
            <template v-slot:[`item.img`]="{ item }">
              <img :src="item.img" width="30" height="auto" alt="" @mouseover="zoomImg" @mouseout="deZoomImg">
            </template>
          </v-data-table>
        </div>
      </v-sheet>
      <v-footer absolute class="pa-4">
          <div class="text-center mx-auto">
            Total : {{totalPanier()}} €<br>
            <v-btn v-if="$store.state.Users.connexion" class="mt-3" color="success">Valider panier</v-btn>
            <div v-if="!$store.state.Users.connexion">
                <p>Pour valider votre panier:</p> 
                <v-btn class="mt-3" color="success" @click="connecterPanier()">Connectez vous</v-btn>
                ou
                <v-btn class="mt-3" color="success" @click="creerCompte()">Créez un compte</v-btn>
            </div>
          </div>
      </v-footer>
    </v-bottom-sheet>
  </div>
</template>
<script>
  export default {
    name:"Panier",
    data: () => ({
      headers:[
        {
            text: 'Nom',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Carte', value: 'img' },
          { text: 'Prix (€)', value: 'price' },
          { text: 'Quantité', value: 'quantite' },
          { text: 'Montant (€)', value: 'montant' },
      ],
      zoom:false,
    }),
    methods:{
      // renduPanier(){
      //   return this.$store.state.Users.connexion ? this.$store.state.Panier.contenu : JSON.parse(localStorage.getItem('panier'))
      // },
      creerCompte(){
        this.$store.state.Panier.sheet = false
        this.$vuetify.goTo('#inscriptionForm', {duration: 500, easing: 'easeInOutCubic'})
      },
      connecterPanier(){
        this.$store.state.Panier.sheet = false
        this.$store.state.Users.sheet = true

      },
      zoomImg(event){
        let imgClick = event.target
        imgClick.style.width = "150px"
      },
      deZoomImg(event){
        let imgClick = event.target
        imgClick.style.width = "30px"
      },
      totalPanier(){
        let total = 0
        this.$store.state.Panier.contenu.forEach(element => {
          total += element.montant
        })
        return total
      }
    }
  }
</script>
<style lang="scss">
  .panier{
    border-radius:15px 0 0 15px;
  }

  .v-responsive__content{
    position:relative;
  }

  .v-badge__badge{
    position:absolute !important;
    left: 9px !important;
    top:-13px !important;
  }

  .v-bottom-sheet
  {
    overflow:auto !important;
  }
</style>
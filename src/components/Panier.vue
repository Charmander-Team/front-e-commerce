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
    <v-bottom-sheet scrollable v-model="$store.state.Panier.sheet">
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
        <div class="py-3">
          <p>Dans votre Pokéball</p>
          <v-data-table
            :headers="headers"
            :items="$store.state.Panier.contenu"
            :items-per-page="5"
            :sort-desc="true"
          >
            <template v-slot:[`item.img`]="{ item }">
              <img :src="item.img" width="30" height="auto" alt="" @mouseover="zoomImg" @mouseout="deZoomImg">
            </template>
          </v-data-table>
        </div>
        <div style="padding:20px;">
          Total : {{totalPanier()}} €<br>
          <v-btn v-if="$store.state.Users.connexion" class="mt-3" color="success">Valider panier</v-btn>
          <div v-if="!$store.state.Users.connexion">
              <p>Pour valider votre panier:</p> 
              <v-btn class="mt-3" color="success" >Connectez vous</v-btn>
              ou
              <v-btn class="mt-3" color="success">Créez un compte</v-btn>
          </div>
        </div>
      </v-sheet>
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
</style>
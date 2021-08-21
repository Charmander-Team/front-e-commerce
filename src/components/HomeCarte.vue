<template>
  <v-container>
    <v-row v-for="(item, index) in cartes" :key="index">
      <v-divider class="mx-2"></v-divider>
      <v-col cols="12" lg="12" md="12">
        <div class="text-h6">{{ item.title_list }} :</div>
      </v-col>
      
      <v-layout
          class="mx-auto"
          max-width="250"
      >
      <v-slide-group
        v-model="model"
        class="pa-0 mb-5"
        active-class="success"
        show-arrows
        
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        >
      <v-slide-item
        cols="auto"
        
        v-for="(carteCard, caracteristique) in item.list"
        :key="caracteristique"
      >
      <v-col cols="auto">
        <div>
          <v-img
            width="100%"
            height="auto"
            max-width="250"
            :src="carteCard.img"
          ></v-img>
          <v-card width="250" class="mt-3 pa-2">
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
              <div class="black--text mb-1">
                Prix: {{ carteCard.price }} €
              </div>
              <v-btn @click="dialog = true, stock = carteCard.stock, product = {id:carteCard.card_id, img:carteCard.img, ref:carteCard.ref, price:carteCard.price, name:carteCard.name, quantite:null, montant:null }" small color="deep-purple" dark v-if="carteCard.stock>0">
                Panier <sup>+</sup>
              </v-btn>      
     
              <v-btn small color="deep-purple" dark v-if="carteCard.bid===1">
                Enchèrir
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

    <v-dialog
      v-model="dialog"
      overlay-color="grey"
      max-width="600px"
      @click:outside="nbAjout = 0"
    >
      <v-card>
        <v-form 
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-card-title>
          <span class="text-h5">Ajouter Au panier</span>
        </v-card-title>
        <v-card-text>
          <small>En stock: {{stock}}</small>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="nbAjout"
                  :items="quantite()"
                  label="Choisir une Quantité*"
                  :rules="nbProduitRule"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*Ce champ est obligatoire</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            dark
            @click="dialog = false"
          >
            Fermer
          </v-btn>
          <v-btn
            color="blue"
            dark
            @click="ajouterPanier()"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

  </v-container>
</template>
<script>
import Products from '@/services/Products.js';
export default {
  name: "HomeCarte",
  data: () => ({
    product:null,
    nbProduitRule: [
        v => !!v || 'Veuillez choisir une quantité',
      ],
    valid:false,
    stock:null,
    dialog: false,
    model: null,
    nbAjout:0,
    cartes: [
      
    ],

    event: {}
  }),
  methods:{
ajouterPanier(){
  if(this.$refs.form.validate()){
  this.dialog = false
  this.$store.state.Panier.nbProduit = parseInt(this.$store.state.Panier.nbProduit) + parseInt(this.nbAjout)
  this.$store.state.Panier.sheet =true
  localStorage.setItem('nbProduitPanier',this.$store.state.Panier.nbProduit)
  console.log("contenu",this.$store.state.Panier.contenu)

  let ArrayContenuId = []
  this.$store.state.Panier.contenu.forEach(element=>{
    ArrayContenuId.push(element.id)
  })


if(JSON.stringify(this.$store.state.Panier.contenu)!="[]"){
  this.$store.state.Panier.contenu.forEach((element,index)=>{
    console.log("element id",this.$store.state.Panier.contenu[index].id)
    console.log("product id",this.product.id)
    if(this.product.id === this.$store.state.Panier.contenu[index].id){
        this.$store.state.Panier.contenu[index].quantite = this.$store.state.Panier.contenu[index].quantite + this.nbAjout

        this.$store.state.Panier.contenu[index].montant = parseInt(this.$store.state.Panier.contenu[index].quantite) * parseInt(this.$store.state.Panier.contenu[index].price)
        console.log("montant",this.$store.state.Panier.contenu[index].montant)
        this.nbAjout = 0 
    } 
  })
  if(!ArrayContenuId.includes(this.product.id)) 
     {
      this.product.quantite = this.nbAjout
      this.product.montant = parseInt(this.product.quantite) * parseInt(this.product.price)
      this.product.user = this.$store.state.Users.id
      console.log("montant",this.product.montant)
      this.nbAjout = 0 

      //Détail de l'ajout
      this.$store.state.Panier.contenu.push(this.product)
      localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))

    }
} else if(JSON.stringify(this.$store.state.Panier.contenu)==="[]")
     {
      this.product.quantite = this.nbAjout
      this.product.montant = parseInt(this.product.quantite) * parseInt(this.product.price)
      this.product.user = this.$store.state.Users.id
      console.log("montant",this.product.montant)
      this.nbAjout = 0 

      //Détail de l'ajout
      this.$store.state.Panier.contenu.push(this.product)
      localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))

}

  }
},
quantite(){
  let itemStock = []
  for(let i=1 ; i <= this.stock ; i++){
    itemStock.push(i)
  }
  return itemStock
},

async getEventDataProduct() {
      Products.loadAllcards()
      .then(
        (event => {
          console.log("event home carte",event)
          this.$set(this, "cartes", event);
        }).bind(this)
      );
    },

    capitalizeFirstLetter(string) {
      let capitalize = string.charAt(0).toUpperCase() + string.slice(1);
      return capitalize.replace('-', ' ')
    }
  },
  async mounted(){
    await this.getEventDataProduct()
  }
};

</script>
<style lang="scss">
  .text-lg-custom{
    font-size: 0.75rem !important;
    line-height:1rem !important;
  }

  .v-slide-group__prev,.v-slide-group__next{
    background-color: rgba(128, 128, 128,0.2);
    width: 2px !important;
  }
  
  .v-slide-group__prev:hover,.v-slide-group__next:hover{
    background-color: rgba(128, 128, 128,0.6);
  }
</style>



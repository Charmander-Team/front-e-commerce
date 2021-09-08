<template>
    <v-main>
    <v-container>
        <v-row justify="center">
            <v-col id="header" cols="12" lg="12" md="12" xs="10"> 
               <div class="justify-start">
                   <router-link to="/">
                        <v-img max-width="200" height="auto" src="../assets/logo-pokeshop.svg"></v-img>
                   </router-link>               </div>
            </v-col>
            <v-col cols="12" lg="12" md="12">
               <v-card class="mb-lg-5 mb-md-5" elevation="20" color="rgba(204, 204, 204, 0.9)" rounded="xl">
                   <v-row>
                       <v-col class="position-relative jutify-content-center" cols="2" lg="2" md="2">
                            <Menu/>
                       </v-col>
                       <v-col cols="10" lg="10">
                           <v-row>
                               <v-col cols="12" lg="12"> 
                                   <!-- Shop -->
                                   <v-layout class="jutify-content-end pr-4" min-height="auto">
                                        <Panier/>
                                        <Connexion/>
                                   </v-layout>
                               </v-col>
                               <!-- Détail carte -->
                               <v-col cols="12" lg="12">
                                    <v-row>
                                        <v-col lg="4">
                                            <v-img :src="detailCard.img" max-width="245" height="auto" class="ma-4"></v-img>
                                        </v-col>
                                        <v-col lg="8">
                                            <v-card class="mt-4 mr-6" max-width="100%" min-height="342" color="#ffffff" elevation="2" rounded="lg">
                                                <v-card-title class="jutify-content-center">{{detailCard.name}}</v-card-title>
                                                <v-card-text>
                                                     <div class="mb-2">Ref: {{detailCard.ref}}</div>
                                                     <div class="d-flex mb-2">
                                                        <div class="grey--text">
                                                          Etat:
                                                        </div>
                                                        <v-rating
                                                          :value="parseInt(detailCard.etat)"
                                                          color="amber"
                                                          dense
                                                          half-increments
                                                          readonly
                                                          size="14"
                                                        ></v-rating>
                                                      </div>
                                                     <div class="mb-2">Type: {{detailCard.type}}</div>
                                                     <div class="mb-2">Description:<br>{{detailCard.description}}</div>
                                                     <div  class="mb-2 jutify-content-center">Prix: {{detailCard.price}}€</div>
                                                     <div class="mt-6 jutify-content-center">
                                                        <v-btn x-large color="deep-purple" v-if="detailCard.stock>0" @click="dialog = true, stock = detailCard.stock, product = {id:detailCard.card_id, img:detailCard.img, ref:detailCard.ref, price:detailCard.price, name:detailCard.name, quantite:null, montant:null, idContentOrder:null }" dark>
                                                            Ajouter au panier
                                                        </v-btn>
                                                        <v-btn x-large color="red" v-if="detailCard.stock<=0"  dark>
                                                            épuisé
                                                        </v-btn>
                                                     </div>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                               </v-col>
                           </v-row>
                       </v-col>
                   </v-row>
               </v-card>
            </v-col>
            <CreerCompte/>
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
        <!-- <ScrollDown/> -->
    </v-container>
     <Footer/>
    </v-main>
</template>
<script>
import Menu from '../components/Menu'
import Connexion from '../components/Connexion'
import Panier from '../components/Panier'
import Footer from '../components/Footer'
import CreerCompte from '../components/CreerCompte'
import Products from '@/services/Products.js';
import Script from '@/mixins/script.js'

// import ScrollDown from '../components/ScrollDown'
export default {
    components:{
      Menu,
      Connexion,
      Panier,
      Footer,
      CreerCompte,
    //   ScrollDown,
      },
      mixins:[Script],
    data(){
      return {
          nbProduitRule: [
                v => !!v || 'Veuillez choisir une quantité',
            ],
          valid:false,
          nbAjout:0,
          dialog:false,
          stock:null,
          detailCard:{
            // img: "www.pokemon.fr/img/pikachu.png",
            // name: "Pikachu",
            // ref: "sm76",
            // type: "Électrique",
            // etat: 2,
            // price: "20",
            // bid: true,
            // card_id:1,
          }
      }  
    },
    methods:{

    

    async getEventDataProductID() {
      Products.loadCardById(this.$route.params.cardId)
      .then(
        (event => {
          console.log("event home carte id",event)
          this.$set(this, "detailCard", event);
        }).bind(this)
      );
    },
    toTop() {
      this.$vuetify.goTo(0)
    }

     },
     async mounted(){
       this.toTop()
       await this.getEventDataProductID()
     }
    }
</script>
<style lang="scss">
    
    .contenu{
        background-color:#cccccc;
        min-height:800px;
    }

    .jutify-content-center{
        display:flex;
        justify-content:center;
    }

    .jutify-content-end{
        display:flex;
        justify-content:flex-end;
    }

    .position-relative {
        position:relative;
        box-sizing:border-box;
    }
</style>
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
                                                     <div class="mb-2">Etat: </div>
                                                     <div class="mb-2">Type: {{detailCard.type}}</div>
                                                     <div class="mb-2">Description:<br>Plus la puissance électrique de Pikachu est élevée, plus les poches de ses joues sont extensibles.</div>
                                                     <div  class="mb-2 jutify-content-center">Prix: {{detailCard.price}}€</div>
                                                     <div class="mt-6 jutify-content-center">
                                                        <v-btn x-large color="deep-purple" dark>
                                                            Ajouter au panier
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
        </v-row>
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
// import ScrollDown from '../components/ScrollDown'
export default {
    components:{
      Menu,
      Connexion,
      Panier,
      Footer,
    //   ScrollDown,
      },
    data(){
      return {
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
        loadCardID(){
        this.$axios.get(`http://localhost:${this.$apiPort}/products/id/${this.$route.params.cardId}`).then((response) => {
            console.log(response.data)
            this.detailCard=response.data
        }).catch(error => console.log(error))
        },
     },
     async mounted(){
       await this.loadCardID()
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
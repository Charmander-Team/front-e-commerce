<template>
    <v-main>
    <v-container>
        <v-row justify="center">
            <v-col id="header" cols="12" lg="12" md="12" xs="10"> 
               <div class="justify-start">
                   <v-img max-width="200" height="auto" src="../assets/logo-pokeshop.svg"></v-img>
               </div>
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
                               <v-col cols="12" lg="12" md="12"> 
                                   <!-- Carrousel -->
                                   <v-card rounded="xl" class="mr-4">
                                       <v-img src="../assets/banner-pokemon.png"></v-img>
                                   </v-card>
                               </v-col>
                               <v-col cols="12" lg="12"> 
                                   <!-- Nouveauté -->
                                   <v-layout class="mr-lg-4" color="#000000">
                                       <HomeCarte class="hidden-md-and-down"/>
                                       <HomeCarteMobile class="hidden-md-and-up"/>
                                   </v-layout>
                               </v-col>
                           </v-row>
                       </v-col>
                   </v-row>
               </v-card>
            </v-col>
            <v-col cols="10" lg="10" md="10">
               <v-row>
                   <v-col cols="12" lg="8" md="8" xs="12">
                      <div class="grey--text pa-4">
                            <h3 class="grey--text text--darken-2">Inscrivez-vous sur notre boutique et profitez d'une expérience unique</h3><br>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat
                      </div>  
                   </v-col>
                   <v-col cols="12" lg="4" md="4" xs="12" class="jutify-content-center">
                        <InscriptionForm/>
                   </v-col>
               </v-row>
            </v-col>
        </v-row>
        <ScrollDown/>
    </v-container>
     <Footer/>
    </v-main>
</template>
<script>
import Menu from '../components/Menu'
import Connexion from '../components/Connexion'
import Panier from '../components/Panier'
import HomeCarte from '../components/HomeCarte'
import InscriptionForm from '../components/InscriptionForm'
import Footer from '../components/Footer'
import ScrollDown from '../components/ScrollDown'
import HomeCarteMobile from '../components/HomeCarteMobile'
export default {
    components:{
      Menu,
      Connexion,
      Panier,
      HomeCarte,
      InscriptionForm,
      Footer,
      ScrollDown,
      HomeCarteMobile,
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
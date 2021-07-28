<template>
    <v-main>
    <v-container>
        <v-row justify="center">
            <v-col id="header" cols="12" lg="12" md="12" xs="10"> 
               <div class="justify-start">
                   <router-link to="/">
                        <v-img max-width="200" height="auto" src="../assets/logo-pokeshop.svg"></v-img>
                   </router-link>
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
                               <v-col cols="12" lg="12"> 
                                   <!-- Nouveauté -->
                                   <v-layout class="mr-lg-4" color="#000000">
                                       <NouveautesCartes/>
                                   </v-layout>
                               </v-col>
                           </v-row>
                       </v-col>
                   </v-row>
               </v-card>
            </v-col>
            <CreerCompte/>
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
import NouveautesCartes from '../components/NouveautesCartes'
import CreerCompte from '../components/CreerCompte'
import Footer from '../components/Footer'
import ScrollDown from '../components/ScrollDown'
export default {
    components:{
      Menu,
      Connexion,
      Panier,
      NouveautesCartes,
      CreerCompte,
      Footer,
      ScrollDown,
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
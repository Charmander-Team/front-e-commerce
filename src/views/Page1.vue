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
                               <v-col cols="12" lg="12" md="12"> 
                                   <v-card rounded="xl" class="mx-6" :color="content.page_color">
                                        <v-card-title :style="{color:content.text_color}" class="text-decoration-underline justify-center">{{content.title}}</v-card-title>
                                        <v-card-text>
                                            <div class="d-flex">
                                                <img :src="content.image" height="300" class="mr-3 mb-3" alt="">
                                                <span :style="{color:content.text_color}">{{content.content}}</span>
                                                <!-- <span :style="{color:content.text_color}" v-html="content.content"></span> -->
                                            </div>
                                        </v-card-text>
                                   </v-card>
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
import CreerCompte from '../components/CreerCompte'
import Footer from '../components/Footer'
import ScrollDown from '../components/ScrollDown'

import Page from '@/services/Page.js'

export default {
    components:{
      Menu,
      Connexion,
      Panier,
      CreerCompte,
      Footer,
      ScrollDown,
      },
      data:()=>{
          return {
              content:{},
          }
      },
      methods:{
        loadContentPage(){
            Page.loadPageById(this.$route.params.id).then((event)=>{
                if(event){
                    this.$set(this, "content", event)
                }
            })
        }
      },
      watch: {
        '$route.params.id':function () {
            this.loadContentPage()
        },
      },
      mounted(){
          this.loadContentPage()
      }
    }
</script>
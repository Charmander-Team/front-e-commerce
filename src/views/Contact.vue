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
                                   <v-card rounded="xl" class="mx-6" color="#ffffff">
                                        <v-card-title class="text-decoration-underline justify-center">Formulaire de contact</v-card-title>
                                        <v-card-text>
                                            <v-form
                                                ref="form"
                                                v-model="valid"
                                                lazy-validation
                                            >
                                                <v-text-field
                                                v-model="nom"
                                                :rules="nomRules"
                                                label="Nom*"
                                                required
                                                ></v-text-field>

                                                <!-- <v-text-field
                                                v-model="prenom"
                                                :rules="prenomRules"
                                                label="Prenom*"
                                                required
                                                ></v-text-field> -->

                                                <v-text-field
                                                v-model="email"
                                                :rules="emailRules"
                                                label="E-mail*"
                                                required
                                                ></v-text-field>

                                                <v-select v-model="objet" required :rules="objetRules" :items="objetOptions" item-text="text" item-value="value" label="Objet*">
                                                </v-select>

                                                <v-textarea v-model="message" required :rules="messageRules" auto-grow label="Message*">

                                                </v-textarea>

                                                <v-btn
                                                :disabled="!valid"
                                                color="success"
                                                class="mr-4"
                                                @click="envoyerMail"
                                                block
                                                >
                                                envoyer
                                                </v-btn>
                                            </v-form>   
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
     <v-dialog v-model="dialog" width="400">
            <v-card color="#ffffff">
                <v-card-title class="justify-center">
                    {{messageDialog}}
                </v-card-title>
            </v-card>
        </v-dialog>
    </v-main>
</template>
<script>

import Menu from '../components/Menu'
import Connexion from '../components/Connexion'
import Panier from '../components/Panier'
import CreerCompte from '../components/CreerCompte'
import Footer from '../components/Footer'
import ScrollDown from '../components/ScrollDown'

import Mail from '@/services/Mail.js'

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
              messageDialog:"",
              dialog:false,
              objetRules:[v => !!v || `L'objet est obligatoire`],
              messageRules:[v => !!v || `Le message est obligatoire`],
              objetOptions:[
                  {text:"Réclamation",value:"Réclamation"},
                  {text:"Recrutement",value:"Recrutement"},
                  {text:"Autre",value:"Autre"},
              ],
              valid:true,
              message:"",
              objet:"",
              nom:"",
            //   prenom:"",
              email:"",
              nomRules:[v => !!v || 'Le nom est obligatoire'],
            //   prenomRules:[v => !!v || 'Le prenom est obligatoire'],
              emailRules: [
                    v => !!v || 'E-mail obligatoire',
                    v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
                ],
          }
      },
      methods:{
          envoyerMail(){
              if(this.$refs.form.validate()){
                  let data = {
                      user_name:this.nom,
                      user_mail:this.email,
                      user_subject:this.objet,
                      user_message:this.message,
                  }
                  Mail.sendMail(data).then((event)=>{
                      console.log("sendMail",event)
                      if(event=="success"){
                          this.$refs.form.reset()
                          this.dialog = true 
                          this.messageDialog = "Votre message a bien été envoyé"
                          setTimeout(()=>{ this.dialog = false 
                          this.messageDialog = ""
                          }, 3000)
                        }
                    }).catch((error)=>{
                        console.log("error contact",error)
                        this.dialog = true 
                        this.messageDialog = "Une erreur est survenue"
                        setTimeout(()=>{ 
                          this.dialog = false 
                          this.messageDialog = ""
                          }, 3000)
                    })
              }
          }
      }
    }
</script>
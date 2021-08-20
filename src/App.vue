<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
import User from "@/services/Users.js"
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    user:null,
  }),

  methods:{
    checkToken () {
        let checkTimestamp = null
        let timestampNow = null
        if(localStorage.getItem('token')){
          checkTimestamp = localStorage.getItem('token').split(':')
          timestampNow = Math.round(new Date().getTime() / 1000)
        }
        // check tout les 4 heures = 14400 secondes
        if(localStorage.getItem('token') && timestampNow - checkTimestamp[0]<= 14400){
          User.checkUserToken({
            token: localStorage.getItem('token')
          })
          .then(
            (event => {
              console.log("event user check token",event)
              this.$set(this, "user", event)
              if(event!==undefined){
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image

                localStorage.setItem('token', event.token)

              }
            }).bind(this)
          );        
        }else{
          localStorage.removeItem('token')
        }
      },
  },

  mounted(){
    this.checkToken()
    if(localStorage.getItem('nbProduitPanier')){
    this.$store.state.Panier.nbProduit = parseInt(localStorage.getItem('nbProduitPanier')) 
    // if(JSON.parse(localStorage.getItem('panier'))[0].user===null){
          this.$store.state.Panier.contenu = JSON.parse(localStorage.getItem('panier'))
    // }else 
    //   if(JSON.parse(localStorage.getItem('panier'))[0].user===this.$store.state.Users.id && this.$store.state.Users.connexion){
    //     this.$store.state.Panier.contenu = []
    //   }
    }
  }

};
</script>
<style lang="scss">

  #app{
    background-image:url('assets/bg-jaune.svg');
    background-repeat:no-repeat;
    background-position:top center;
    background-size:100vw auto;
  }
</style>

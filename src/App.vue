<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
import User from "@/services/Users.js"
import Orders from "@/services/Orders.js"
import Order_content from "@/services/Order_content.js"
import Products from "@/services/Products.js"
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

                this.$store.state.Panier.contenu = []
                this.$store.state.Panier.nbProduit = 0

                Orders.loadOrderByUser(event.id).then((data=>{
                      data.forEach(element=>{
                        if(element.paid===false){
                          Order_content.loadOrderContentByOrder(element.id).then(content=>{
                            if(content.length>0){
                              content.forEach(value=>{
                                let product = {}
                                this.$store.state.Panier.nbProduit = parseInt(this.$store.state.Panier.nbProduit) + value.quantity
                                Products.loadCardById(value.product_id).then(data=>{
                                  product.id=data.card_id
                                  product.img=data.img
                                  product.ref=data.ref
                                  product.price=data.price
                                  product.name=data.name
                                  product.quantite=value.quantity
                                  product.montant=data.price * value.quantity
                                  product.idContentOrder=value.id
                                  this.$store.state.Panier.contenu.push(product)
                                })
                              })
                              console.log("content",content)
                            }
                          })
                        }
                      })
                }))

              }
            }).bind(this)
          );        
        }else{
          localStorage.removeItem('token')
          // localStorage.removeItem('nbProduitPanier')
          // localStorage.removeItem('panier')
        }
      },
  },

  mounted(){
    this.checkToken()
    if(localStorage.getItem('nbProduitPanier')){
    this.$store.state.Panier.nbProduit = parseInt(localStorage.getItem('nbProduitPanier')) 
    // if(JSON.parse(localStorage.getItem('panier'))[0].user===null){
      if(!this.$store.state.Users.connexion){
          this.$store.state.Panier.contenu = JSON.parse(localStorage.getItem('panier'))
      }
    }

    // if(this.$store.state.Users.connexion){
    //   Orders.loadOrderByUser(this.$store.state.Users.id).then((data=>{
    //         data.forEach(element=>{
    //           if(!element.paid){
    //             Order_content.loadOrderContentByOrder(element.id).then(content=>{
    //               this.$store.state.Panier.contenu = content
    //               console.log("content",content)
    //             })
    //           }
    //         })
    //   }))

    // }
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

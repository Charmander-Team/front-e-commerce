<template>
  <v-form 
    v-if="!$store.state.Users.connexion"
    ref="form"
    v-model="valid"
    lazy-validation>
    <v-container>
      <v-row>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="motDePasse"
            :rules="nameRules"
            type="password"
            label="Mot de passe"
            required
          ></v-text-field>
        </v-col>

        

        <v-col
          cols="12"
          md="4"
        >
            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            align-center
            >
            Connexion
            </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Users from '@/services/Users'
import Orders from '@/services/Orders'
import Order_content from '@/services/Order_content'
import Products from '@/services/Products'
export default {
    name:"ConnexionForm",
    data: () => ({
      valid: false,
      motDePasse: '',
      //lastname: '',
      nameRules: [
        v => !!v || 'Mot de passe obligatoire',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+/.test(v) || 'E-mail invalid',
      ],
      user:null,
      order_id:null
    }),
    methods: {

      /*
      checkUserCommande(){
       Orders.loadOrderByUser(this.$store.state.Users.id).then((data=>{
          console.log("checkUserCommande",data)
            data.forEach(element=>{
              if(element.paid === false){
                this.order_id=element.id
                console.log("paid",element.paid)
                   
              }
            })
          }))
      },
      */

      validate () {
        
        if(this.$refs.form.validate()){
          Users.checkUser({
            mail: this.email,
            mdp: this.motDePasse,
          })
          .then(
            (async event => {
              console.log("event user check",event)
              this.$set(this, "user", event)
              if(event!==undefined){
                this.$refs.form.resetValidation()
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image

                localStorage.setItem('token', event.token)

                this.motDePasse = ""

                await Orders.loadOrderByUser(event.id).then((data=>{
                  console.log("orderByUser",data)
                      data.forEach(element=>{
                        if(element.paid === false){
                          this.order_id=element.id
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
                                  this.$store.state.Panier.contenu.push(product)
                                })
                              })
                              console.log("content",content)
                            }
                          })
                        }
                      })
                }))

                // console.log("check",this.checkUserCommande())
console.log("order id",this.order_id)
                if(localStorage.getItem('nbProduitPanier') && this.order_id===null){
                          Orders.createOrder({
                          user_id: this.$store.state.Users.id,
                          paid: false
                        }).then(data=>{
                          this.$store.state.Panier.contenu.forEach(element => {
                                Order_content.createOrderContent(
                            {
                              order_id: data.id,
                              product_id: element.id,
                              quantity: element.quantite,
                            }
                            )
                          })
                        })
                  localStorage.removeItem('panier')
                  localStorage.removeItem('nbProduitPanier')     
                } else 
                if(localStorage.getItem('nbProduitPanier') && this.order_id!=null) {
                  this.$store.state.Panier.contenu.forEach(element => {
                                Order_content.createOrderContent(
                            {
                              order_id: this.order_id,
                              product_id: element.id,
                              quantity: element.quantite,
                            }
                            )
                  })
                  localStorage.removeItem('panier')
                  localStorage.removeItem('nbProduitPanier')
                }
              }
            }).bind(this)
          );        
        }
      },

    },
}
</script>
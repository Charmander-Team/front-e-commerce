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
      order_id:null,
      arrayContentOrder:[]
    }),
    methods: {

      pushContenu(){
        this.$store.state.Panier.contenu = []
        this.$store.state.Panier.nbProduit = "0"
        this.arrayContentOrder.forEach(value=>{
              let product = {}
              this.$store.state.Panier.nbProduit = parseInt(this.$store.state.Panier.nbProduit) + value.quantity
              // this.$store.state.Panier.nbProduit += parseInt(value.quantity)
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
          console.log("Push in contenu")
      },

      validate () {
        
        if(this.$refs.form.validate()){
          Users.checkUser({
            mail: this.email,
            mdp: this.motDePasse,
          })
          .then(
           ( async event => {
            // (async event => {
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

                await Orders.loadOrderByUser(event.id).then(async data=>{
                  console.log("orderByUser",data)
                      // data.forEach(element=>{
                        for(let i = 0; i<data.length;i++){
                        if(data[i].paid === false){
                          this.order_id=data[i].id
                      await Order_content.loadOrderContentByOrder(data[i].id).then(content=>{
                            if(content.length>0){
                              // content.forEach(value=>{
                              //   let product = {}
                              //   this.$store.state.Panier.nbProduit = parseInt(this.$store.state.Panier.nbProduit) + value.quantity
                              //   Products.loadCardById(value.product_id).then(data=>{
                              //     product.id=data.card_id
                              //     product.img=data.img
                              //     product.ref=data.ref
                              //     product.price=data.price
                              //     product.name=data.name
                              //     product.quantite=value.quantity
                              //     product.montant=data.price * value.quantity
                              //     this.$store.state.Panier.contenu.push(product)
                              //   })
                              // })
                              this.arrayContentOrder = content
                              console.log("content",content)
                            }
                          })
                        }
                        }
                      // })
                })

                // let panier = []
                // this.$store.state.Panier.contenu.forEach(element => {
                //   this.arrayContentOrder.forEach(val=>{
                //     let product = {}
                //       if(val.product_id === element.id ) {
                //           product.id = val.product_id
                //           product.quantite = val.quantity + element.quantite
                //           panier.push(product)
                //       }else{
                //         product.id = val.product_id
                //         product.quantite = val.quantity
                //         panier.push(product)
                //       }
                //   })
                // })
                // console.log("panier reconstiue",panier)
                

console.log("order id",this.order_id)
console.log("array content",this.arrayContentOrder)
console.log("panier content",this.$store.state.Panier.contenu)
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

                
                // this.$store.state.Panier.contenu.forEach(element => {
                //   this.arrayContentOrder.forEach(val=>{
                  let panierUpdate = []
                  let panierCreate = []
                  this.$store.state.Panier.contenu.forEach(element => {
                  let valueUpdate = null
                  // if(this.arrayContentOrder!=null){
                    valueUpdate =  this.arrayContentOrder.find(val=>val.product_id === element.id)

                  // }  
                  // let valueCreate = {}
                  console.log("valueUpdate",valueUpdate)
                  if(valueUpdate){
                      valueUpdate.quantity = valueUpdate.quantity + element.quantite
                      panierUpdate.push(valueUpdate)
                  } else {
                      let val = {}
                      val.product_id = element.id
                      val.quantity = element.quantite
                      panierCreate.push(val)
                  }
                  // else {
                  //   valueCreate.id = element.id
                  //   valueCreate.quantite = element.quantite
                  //   panierCreate.push(valueCreate)
                  // }

                  
                  // })
                  // this.$store.state.Panier.contenu.forEach(element => {
                  
                  
                  // let valueUpdate =  this.arrayContentOrder.find(val=>val.product_id === element.id)
                  // let valueCreate = {}
                  // console.log("valueUpdate",valueUpdate)
                  // if(valueUpdate!=undefined){
                  //     valueUpdate.quantity = valueUpdate.quantity + element.quantite
                  //     panierUpdate.push(valueUpdate)
                  // } else {
                  //   valueCreate.id = element.id
                  //   valueCreate.quantite = element.quantite
                  //   panierCreate.push(valueCreate)
                  // }

                  // if(this.arrayContentOrder!=null){


                  // let valueCreate =  this.arrayContentOrder.find(val=>val.product_id != element.id)
                  // console.log("valueCreate",valueCreate)
                  // if(!valueCreate){
                  //     let val = {}
                  //     val.product_id = element.id
                  //     val.quantity = element.quantite
                  //     panierCreate.push(val)
                  // }


                  // }


                  
                  })
                  console.log("panierUpdate reconstruit",panierUpdate)
                  console.log("panierCreate reconstruit",panierCreate)


                  
                        panierUpdate.forEach(val=>{
                            Order_content.updateOrderContent(
                            val.id,
                            {
                            quantity:val.quantity
                            }
                          )
                        })
                        
                      
                       panierCreate.forEach(val=>{ 
                        Order_content.createOrderContent(
                            {
                              order_id: this.order_id,
                              product_id: val.product_id,
                              quantity: val.quantity,
                            }
                            )
                      })


                      // if(val.product_id === element.id ) {
                          
                      //     let newQuantite = val.quantity + element.quantite

                      //     Order_content.updateOrderContent(
                      //       val.id,
                      //       {
                      //       quantity:newQuantite
                      //       }
                      //     )
                      // }else{
                        
                      //   Order_content.createOrderContent(
                      //       {
                      //         order_id: this.order_id,
                      //         product_id: element.id,
                      //         quantity: element.quantite,
                      //       }
                      //       )
                      // }



                //   })
                // })
                
                  localStorage.removeItem('panier')
                  localStorage.removeItem('nbProduitPanier')

                }
                return true
              }
            }).bind(this)
            // })
          )
          .then((val)=>{
              console.log("valeur push contenu",val)
              if(val){
                this.pushContenu()
              }
            })        
        }
      },

    },
}
</script>=
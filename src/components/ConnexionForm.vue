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
import Script from "@/mixins/script.js"

export default {
    name:"ConnexionForm",
    mixins:[Script],
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
      arrayContentOrder:[],
      retour :{user:false,ini:false,implementUpdate:false,implementCreate:false},// ne pas conserver
      panierUpdate:[],
      panierCreate:[]
    }),
    methods: {

      // async loadAllOrder(){
      //       await Orders.loadOrderByUser(this.$store.state.Users.id).then(data=>{
      //         console.log("order by user",data)
      //         data.forEach(element => {
      //           if(element.paid===true){this.$store.state.Panier.orderPaidTrue.push(element)}
      //           })
      //         })
      // },

      // pushContenuOrderPaid(){
      //   if(this.$store.state.Panier.orderPaidTrue.length>0){
      //         this.$store.state.Panier.orderPaidTrue.forEach((element,index)=>{
      //             Order_content.loadOrderContentByOrder(element.id).then(content=>{
                    

      //           let contenu = []
      //           let montant = 0
      //           content.forEach(value=>{
      //                 let product = {}             
      //                 Products.loadCardById(value.product_id).then(data=>{
      //                   // console.log("data load card",data)
      //                   product.id=data.card_id
      //                   product.img=data.img
      //                   product.ref=data.ref
      //                   product.price=data.price
      //                   product.name=data.name
      //                   product.quantite=value.quantity
      //                   product.montant=data.price * value.quantity
      //                   product.idContentOrder=value.id
      //                   contenu.push(product)

      //                   montant += (data.price) * (value.quantity)
      //                   console.log("montant",montant)
      //                   this.$store.state.Panier.totalOrderPaid[index] = montant
      //                 })
      //             })
      //             console.log("contenu paid order",contenu)
      //             this.$store.state.Panier.contenuOrderPaid[index]=contenu
      //             // return contenu
      //           })
      //         })
      //   }
      // },

      async updatePanier(array){
          for(let i = 0; i<array.length;i++){
                await  Order_content.updateOrderContent(
                  array[i].id,
                  {
                  quantity:array[i].quantity
                  }
                )
                .then(r=>{
                  console.log("update then",r)
                  if(r){this.retour.implementUpdate = true}
                  })
              }
      },

      // async updatePanier(array){
      //     array.forEach(val=>{
      //             Order_content.updateOrderContent(
      //             val.id,
      //             {
      //             quantity:val.quantity
      //             }
      //           )
      //           .then(r=>{
      //             console.log("update then",r)
      //             if(r){this.retour.implementUpdate = true}
      //             })
      //         })
      // },

      async createPanier(array){
          for(let i = 0; i<array.length;i++){ 
           await Order_content.createOrderContent(
                  {
                    order_id: this.order_id,
                    product_id: array[i].product_id,
                    quantity: array[i].quantity,
                  }
                  )
                  .then(r=>{
                    console.log("create then",r)
                    if(r){this.retour.implementCreate = true}
                    })
              }
      }
      // async createPanier(array){
      //     array.forEach(val=>{ 
      //                     Order_content.createOrderContent(
      //                           {
      //                             order_id: this.order_id,
      //                             product_id: val.product_id,
      //                             quantity: val.quantity,
      //                           }
      //                           )
      //                           .then(r=>{
      //                             console.log("create then",r)
      //                             if(r){this.retour.implementCreate = true}
      //                             })
      //                       })
      // }
      ,
      async pushContenu(){

        await Order_content.loadOrderContentByOrder(this.order_id).then(content=>{
            console.log("content push contenu",content)   

        this.$store.state.Panier.contenu = []
        this.$store.state.Panier.nbProduit = "0"
        
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
          //  ( 
           async event => {
              // let retour = {user:false,ini:false,implement:false} 
              console.log("event user check",event)
              this.$set(this, "user", event)
              if(event!==undefined){
                this.retour.user = true

                this.$refs.form.resetValidation()
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image
                
                this.$store.state.Users.admin= event.admin

                localStorage.setItem('token', event.token)

                this.motDePasse = ""

                await Orders.loadOrderByUser(event.id).then(async data=>{
                  console.log("orderByUser",data)
                      // data.forEach(element=>{
                        for(let i = 0; i<data.length;i++){
                        if(data[i].paid === false){
                          this.$store.state.Panier.order_id = data[i].id
                          this.order_id=data[i].id
                      await Order_content.loadOrderContentByOrder(data[i].id).then(content=>{
                            if(content.length>0){
                              
                              this.arrayContentOrder = content
                              console.log("content",content)
                            }
                          })
                        }
                        }
                })
              

                    console.log("order id",this.order_id)
                    console.log("array content",this.arrayContentOrder)
                    console.log("panier content",this.$store.state.Panier.contenu)
                if(localStorage.getItem('nbProduitPanier') && this.order_id===null){
                          Orders.createOrder({
                          user_id: this.$store.state.Users.id,
                          paid: false
                        }).then(data=>{
                          this.$store.state.Panier.order_id = data.id
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
                  this.retour.ini = true
                } else 
                if(localStorage.getItem('nbProduitPanier') && this.order_id!=null) {

                  this.panierUpdate = []
                  this.panierCreate = []
                  // let panierUpdate = []
                  // let panierCreate = []
                  this.$store.state.Panier.contenu.forEach(element => {
                  let valueUpdate = null
                  
                    valueUpdate =  this.arrayContentOrder.find(val=>val.product_id === element.id)

                  
                  console.log("valueUpdate",valueUpdate)
                  if(valueUpdate){
                      valueUpdate.quantity = valueUpdate.quantity + element.quantite
                      this.panierUpdate.push(valueUpdate)
                  } else {
                      let val = {}
                      val.product_id = element.id
                      val.quantity = element.quantite
                      this.panierCreate.push(val)
                  }
                  
                  })
                  console.log("panierUpdate reconstruit",this.panierUpdate)
                  console.log("panierCreate reconstruit",this.panierCreate)
                    
                  

                      // Promise.resolve(
                  
                        // panierUpdate.forEach(async val=>{
                        //    await Order_content.updateOrderContent(
                        //     val.id,
                        //     {
                        //     quantity:val.quantity
                        //     }
                        //   )
                        //   .then(r=>{
                        //     console.log("update then",r)
                        //     if(r){this.retour.implementUpdate = true}
                        //     })
                        // })
                        
                        // ).then(()=>{
                          
                          //  panierCreate.forEach(async val=>{ 
                          //  await Order_content.createOrderContent(
                          //       {
                          //         order_id: this.order_id,
                          //         product_id: val.product_id,
                          //         quantity: val.quantity,
                          //       }
                          //       )
                          //       .then(r=>{
                          //         console.log("create then",r)
                          //         if(r){this.retour.implementCreate = true}
                          //         })
                          //   })


                        // }).then(()=>{
                          
                        //   this.pushContenu()
                        // })
                        
                    // await this.updatePanier(this.panierUpdate)
                    // await this.createPanier(this.panierCreate)
                
                  localStorage.removeItem('panier')
                  localStorage.removeItem('nbProduitPanier')
                // return true
                }
                console.log("valeur push contenu",this.retour)
                // return this.retour
                // return true
                
              // await this.updatePanier(this.panierUpdate)
              // await this.createPanier(this.panierCreate)

              // Load les commande validé

              //       loadAllOrder(){
            //   // if(this.$store.state.Users.connexion){
            //  Orders.loadOrderByUser(this.$store.state.Users.id).then(data=>{
            //   console.log("order by user",data)
            //   data.forEach(element => {
            //     if(element.paid===true){this.$store.state.Panier.orderPaidTrue.push(element)}
            //     })
            //   })

            //   //   }
            //   // },

              //Charge toute les commandes payé
              await this.loadAllOrder()
              //Charge toute le contenu des commandes payé
              await this.pushContenuOrderPaid()

              }
            }
            // ).bind(this)
          )
          .then(async()=>{
          // .then(async (val)=>{
              // console.log("valeur push contenu",val)
              // if((val.user && val.implementUpdate ) ||(val.user && val.implementCreate ) || (val.user && val.ini) || val.user){
              // if(val){
                console.log("push")
                await this.updatePanier(this.panierUpdate)
                await this.createPanier(this.panierCreate)
                // await this.pushContenu()
              // }
            }) 
          .then(async()=>{
                await this.pushContenu()
            })     
        }
      },

    },
}
</script>=
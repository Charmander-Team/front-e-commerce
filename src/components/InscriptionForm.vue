<template>
    <v-card rounded="xl"  width="300" class="pa-5">
        <h2 class="pa-0 text-center font-weight-medium">CRÉER UN COMPTE</h2>
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="prenom"
      :rules="prenomRules"
      label="Prénom*"
      required
    ></v-text-field>

     <v-text-field
      v-model="nom"
      :rules="nomRules"
      label="Nom*"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail*"
      required
    ></v-text-field>

    <v-text-field
      v-model="mdp"
      :rules="mdpRules"
      :type="show ? 'text' : 'password'"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      label="Mot de passe*"
      @click:append="show = !show"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Les champs indiquant * sont obligatoire']"
      label="Je confirme avoir lu et accepté
      les conditions d'utilisation."
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      block
    >
      s'inscrire
    </v-btn>
  </v-form>
    </v-card>
</template>
<script>
  import Users from '@/services/Users'
import Orders from '@/services/Orders'
import Order_content from '@/services/Order_content'
// import Products from '@/services/Products'
  export default {
    name:"InscriptionForm",
    data: () => ({
      user:null,
      order_id:null,
      arrayContentOrder:[],
      show: false,
      valid: true,
      nom: '',
      prenom: '',
      mdp: '',
      nomRules: [
        v => !!v || 'Nom obligatoire',
      ],
      prenomRules: [
        v => !!v || 'Prénom obligatoire',
      ],
      mdpRules: [
        v => !!v || 'Mot de passe obligatoire',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
    // pushContenu(){
    //     this.$store.state.Panier.contenu = []
    //     this.$store.state.Panier.nbProduit = "0"
    //     this.arrayContentOrder.forEach(value=>{
    //           let product = {}
    //           this.$store.state.Panier.nbProduit = parseInt(this.$store.state.Panier.nbProduit) + value.quantity
    //           Products.loadCardById(value.product_id).then(data=>{
    //             product.id=data.card_id
    //             product.img=data.img
    //             product.ref=data.ref
    //             product.price=data.price
    //             product.name=data.name
    //             product.quantite=value.quantity
    //             product.montant=data.price * value.quantity
    //             product.idContentOrder=value.id
    //             this.$store.state.Panier.contenu.push(product)
    //           })
    //       })
    //       console.log("Push in contenu")
    //   },

     validate () {
        // this.$refs.form.validate()
        if(this.$refs.form.validate()){
          Users.createUser({
            lastname: this.nom,
            firstname: this.prenom,
            mail: this.email,
            password: this.mdp,
            admin: false,
            image: ""
          })
          .then(
            (async event => {
              console.log("event user",event)
              this.$set(this, "user", event)
              if(event!==undefined){
                this.resetValidation()
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image

                localStorage.setItem('token', event.token)

                // await Orders.loadOrderByUser(event.id).then(async data=>{
                //   console.log("orderByUser",data)
                //       for(let i = 0; i<data.length;i++){
                //         if(data[i].paid === false){
                //           this.order_id=data[i].id
                //       await Order_content.loadOrderContentByOrder(data[i].id).then(content=>{
                //             if(content.length>0){
                              
                //               this.arrayContentOrder = content
                //               console.log("content",content)
                //             }
                //           })
                //         }
                //         }
                // })
              

                    console.log("order id",this.order_id)
                    console.log("array content",this.arrayContentOrder)
                    console.log("panier content",this.$store.state.Panier.contenu)


                // if(localStorage.getItem('nbProduitPanier')){
                          Orders.createOrder({
                          user_id: event.id,
                          paid: false
                        }).then(data=>{

                          this.$store.state.Panier.order_id =data.id

                          if(localStorage.getItem('nbProduitPanier')){

                          this.$store.state.Panier.contenu.forEach(element => {
                                Order_content.createOrderContent(
                            {
                              order_id: data.id,
                              product_id: element.id,
                              quantity: element.quantite,
                            }
                            )
                          })
                            localStorage.removeItem('panier')
                            localStorage.removeItem('nbProduitPanier')     
                          } 
                        })
                //   localStorage.removeItem('panier')
                //   localStorage.removeItem('nbProduitPanier')     
                // } 
                // else 
                // if(localStorage.getItem('nbProduitPanier') && this.order_id!=null) {

                //   let panierUpdate = []
                //   let panierCreate = []
                //   this.$store.state.Panier.contenu.forEach(element => {
                //   let valueUpdate = null
                  
                //     valueUpdate =  this.arrayContentOrder.find(val=>val.product_id === element.id)

                  
                //   console.log("valueUpdate",valueUpdate)
                //   if(valueUpdate){
                //       valueUpdate.quantity = valueUpdate.quantity + element.quantite
                //       panierUpdate.push(valueUpdate)
                //   } else {
                //       let val = {}
                //       val.product_id = element.id
                //       val.quantity = element.quantite
                //       panierCreate.push(val)
                //   }
                  
                //   })
                //   console.log("panierUpdate reconstruit",panierUpdate)
                //   console.log("panierCreate reconstruit",panierCreate)


                  
                //         panierUpdate.forEach(val=>{
                //             Order_content.updateOrderContent(
                //             val.id,
                //             {
                //             quantity:val.quantity
                //             }
                //           )
                //         })
                        
                      
                //        panierCreate.forEach(val=>{ 
                //         Order_content.createOrderContent(
                //             {
                //               order_id: this.order_id,
                //               product_id: val.product_id,
                //               quantity: val.quantity,
                //             }
                //             )
                //       })
                
                //   localStorage.removeItem('panier')
                //   localStorage.removeItem('nbProduitPanier')

                // }
                return true


              }
            }).bind(this)
          )
          // .then((val)=>{
          //     console.log("valeur push contenu",val)
          //     if(val){
          //       this.pushContenu()
          //     }
          //   })       
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
<style lang="scss">
    .text-align-center{
        text-align:center;
    }
</style>
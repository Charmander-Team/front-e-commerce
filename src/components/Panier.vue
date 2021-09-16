<template>
  <div>
      <v-tab @click="$store.state.Panier.sheet = !$store.state.Panier.sheet">
        <v-img src="../assets/panier_icon.png" width="58" height="auto">
          <v-badge
        color="black"
        :content="$store.state.Panier.nbProduit"
      ></v-badge>
        </v-img>
        <!-- PANIER -->
    </v-tab>
    <v-bottom-sheet  v-model="$store.state.Panier.sheet">
      <!-- <div>
        <StripeElementCard
          ref="elementRef"
          @token="tokenCreated"
          :pk="stripe_public_key"
          ></StripeElementCard>
        <button @click="submit">Generate token</button>
      </div> -->


       <!-- <div>
          <stripe-checkout
            ref="checkoutRef"
            mode="payment"
            pk="pk_test_51JPSpCKoSMACykFS1MwWYut67FZ8Tl2jQOgZPBrzfdDFQsYwRyM8oGcP0HEYQjPvDFcyjSCvsR1v1AitLgIUW6J300VnV4vlbm"
            :line-items="lineItems"
            :success-url="successURL"
            :cancel-url="cancelURL"
            @loading="v => loading = v"
          />
          <button @click="submit">Pay now!</button>
        </div> -->
      <v-sheet
        class="text-center"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="$store.state.Panier.sheet = !$store.state.Panier.sheet"
        >
          fermer
        </v-btn>
        <div class="table-overflow py-3" :style="$store.state.Users.connexion?'margin-bottom:104px':'margin-bottom:144px'">
          <p>Dans votre Pokéball</p>
          <v-data-table
            :headers="headers"
            :options="{}"
            item-key="idContentOrder"
            :items="$store.state.Panier.contenu"
            :items-per-page="5"
            :sort-desc="true"
          >
            <template v-slot:[`item.img`]="{ item }">
              <img :src="item.img" width="30" height="auto" alt="" @mouseover="zoomImg" @mouseout="deZoomImg">
            </template>
            
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            
              </template>
          <template v-slot:top>
            <v-dialog
              v-model="dialogEdit"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Modifier ma commande</span>
                </v-card-title>
                <v-card-text>
                  <span>En stock: {{stock}}</span>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-select
                          v-model="editedQuantite"
                          :items="itemStock"
                          label="Choisir une Quantité*"
                          :rules="nbProduitRule"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue"
                      dark
                      @click="dialogEdit = false"
                    >
                      Fermer
                    </v-btn>
                    <v-btn
                      v-if="editedQuantite!=quantite"
                      color="blue"
                      dark
                      @click="modifierPanier()"
                    >
                      Modifier
                    </v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">Voulez-vous vraiment supprimer cet article ?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Oui</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </template>

          </v-data-table>
        </div>
      </v-sheet>
      <v-footer absolute class="pa-4">
          <div class="text-center mx-auto">
            Total : {{totalPanier()}} €<br>
            <!-- <v-btn v-if="$store.state.Users.connexion" :disabled="$store.state.Panier.contenu.length>0?false:true" class="mt-3" color="success" @click="validerPanier()" >Valider panier</v-btn> -->
            <v-btn v-if="$store.state.Users.connexion" :disabled="$store.state.Panier.contenu.length>0?false:true" class="mt-3" color="success" @click="dialogStripe=true" >Valider panier</v-btn>
            <div v-if="!$store.state.Users.connexion">
                <p>Pour valider votre panier:</p> 
                <v-btn class="mt-3" color="success" @click="connecterPanier()">Connectez vous</v-btn>
                ou
                <v-btn class="mt-3" color="success" @click="creerCompte()">Créez un compte</v-btn>
            </div>
          </div>
      </v-footer>
    </v-bottom-sheet>
    <v-dialog
      v-model="dialogStripe"
      width="500"
    >
     <v-card color="#cccccc">
        <v-card-title class="text-h5 white lighten-2 justify-center">
          Finalisez votre commande
        </v-card-title>
        <v-card-text>
            <div>
              <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field height="25" background-color="#ffffff" v-model="name" readonly :label="`Identité: ${$store.state.Users.firstname} ${$store.state.Users.lastname}`"></v-text-field>
                  <v-text-field height="25" background-color="#ffffff" v-model="mail" readonly :label="`Mail: ${$store.state.Users.mail}`" :value="$store.state.Users.mail"></v-text-field>
                  <v-text-field height="25" background-color="#ffffff" v-model="phone" required :rules="[v => !!v || 'Veuillez saisir un numéro de téléphone']" label="Téléphone"></v-text-field>
                  <v-text-field height="25" background-color="#ffffff" v-model="address" required :rules="[v => !!v || 'Veuillez renseigner une adresse valide']" label="Adresse de livraison"></v-text-field>
                  <v-text-field height="25" background-color="#ffffff" v-model="zip" required :rules="[v => !!v || 'Veuillez renseigner un code postal']" label="Code postal de livraison"></v-text-field>
                  <v-text-field height="25" background-color="#ffffff" v-model="country" :rules="[v => !!v || 'Veuillez renseigner un pays']" required label="Pays de livraison"></v-text-field>
                  <v-text-field height="25" background-color="#ffffff" v-model="amount" readonly :label="`Montant à payer: ${totalPanier()} €`"></v-text-field>
                  <StripeElementCard
                    ref="elementRef"
                    @token="tokenCreated"
                    :pk="stripe_public_key"
                    ></StripeElementCard>
                  <v-btn :disabled="!valid" @click="submit">Payer</v-btn>
                  <v-img src="@/assets/Stripe_Logo.svg" class="my-1" height="auto" width="10%" alt="logo-stripe"></v-img>
              </v-form>
            </div>
        </v-card-text>
     </v-card>
    </v-dialog>
    <v-dialog v-model="dialogConfirmPayment" width="400">
            <v-card color="#ffffff">
                <v-card-title class="justify-center">
                    {{dialogConfirmPaymentMessage}}
                </v-card-title>
            </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import { StripeElementCard } from '@vue-stripe/vue-stripe';
  import config from '../../config/config.js';
  // import { StripeCheckout } from '@vue-stripe/vue-stripe';

  import Products from '@/services/Products'
  import Order_content from '@/services/Order_content'
  import Orders from '@/services/Orders'
  import Stripe from '@/services/Stripe'
  export default {
    name:"Panier",
    components: {
    StripeElementCard,
    // StripeCheckout
  },
    data: () => ({
      dialogConfirmPayment:false,
      dialogConfirmPaymentMessage:"",
      valid:true,
      name:"",
      mail:"",
      phone:"",
      address:"",
      zip:"",
      country:"", 
      amount:"",
      description:"",

      dialogStripe:false,
      stripe_public_key:config.stripe_public_key,
      token:null,

      stock:null,
      itemStock:[],
      // id:null,
      // quantiteModifie:null,
      quantite:null,
      dialogEdit:false,
      dialogDelete:false,
      nbProduitRule: [
        v => !!v || 'Veuillez Modifier votre quantité',
      ],
      headers:[
        {
            text: 'Nom',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Carte', value: 'img' },
          { text: 'Prix (€)', value: 'price' },
          { text: 'Quantité', value: 'quantite' },
          { text: 'Montant (€)', value: 'montant' },
          { text: 'Actions', value: 'actions', sortable: false }
      ],
      zoom:false,
      editedQuantite:null,
      editedIndex:null,
      idContentOrder:null
    }),
    
    methods:{
    // stripePayment(){
    //   Stripe.paymentOrder({}).then((data)=>{console.log("stripe data",data)})
    // },

    // submit() {
    //   // You will be redirected to Stripe's secure checkout page
    //   this.$refs.checkoutRef.redirectToCheckout();
    // },
    submit () {
      // this will trigger the process
      console.log("validate",this.$refs.form.validate())
      if(this.$refs.form.validate()){
        this.$refs.elementRef.submit()
      }
    },
    tokenCreated (token) {
      console.log(token);
      let value = {
        stripeToken:token.id,
        name:`${this.$store.state.Users.firstname} ${this.$store.state.Users.lastname}`,
        mail:`${this.$store.state.Users.mail}`,
        phone:this.phone,
        address:this.address,
        zip:this.zip,
        country:this.country, 
        amount:this.totalPanier()*100,
        description:"Pokeshop carte pokémon"
      }
      // let value = {
      //   stripeToken:token.id,
      //   name:"Kris",
      //   mail:"demo@kris.fr",
      //   phone:"0100000000",
      //   address:"2 place pokémon",
      //   zip:"75011",
      //   country:"France", 
      //   amount:"60000",
      //   description:"pikachu argenté"
      // }
      Stripe.paymentOrder(value).then((data)=>{
        console.log("stripe data",data)
        if(data=="Success"){
          this.validerPanier()
          this.$refs.form.reset()
          this.$refs.elementRef.clear()
        }else{
          this.$refs.elementRef.clear()
          this.dialogStripe = false
          this.dialogConfirmPayment = true
          this.dialogConfirmPaymentMessage = "Un problème est survenu"
        }
      })

      // handle the token
      // send it to your server
    },
      validerPanier(){
        if(this.$store.state.Panier.contenu.length>0){
          
          for(let i=0; i<this.$store.state.Panier.contenu.length;i++){
            Products.loadCardById(this.$store.state.Panier.contenu[i].id).then(data=>{
              let newStock =data.stock - this.$store.state.Panier.contenu[i].quantite
              return newStock
            }).then(val=>{
              console.log("new stock",val)
              Products.updateCard(this.$store.state.Panier.contenu[i].id,{stock:val})
            })
          }
        
          Orders.updateOrder(this.$store.state.Panier.order_id,{paid:true,status:"Validée"}).then(data=>{
                console.log("valide panier data",data)
                this.$store.state.Panier.contenu = []
                this.$store.state.Panier.nbProduit = "0"
                  //créer un nouveau panier
                  Orders.createOrder({
                    user_id: this.$store.state.Users.id,
                    paid: false
                  }).then(data=>{
                    console.log("créer panier data",data)
                    this.$store.state.Panier.order_id = data.id

                    this.dialogStripe = false
                    this.dialogConfirmPayment = true
                    this.dialogConfirmPaymentMessage = "Votre commande a bien été validée"
                    setTimeout(()=>{ 
                          this.$router.go(0)
                          }, 3000)
                  })
              })
        }
      },
      
      modifierPanier(){
        this.$store.state.Panier.contenu[this.editedIndex].quantite = this.editedQuantite
        this.$store.state.Panier.contenu[this.editedIndex].montant = this.editedQuantite * this.$store.state.Panier.contenu[this.editedIndex].price
        

        this.$store.state.Panier.nbProduit = 0
        this.$store.state.Panier.contenu.forEach(element=>{
        this.$store.state.Panier.nbProduit += parseInt(element.quantite) 
        })

        if(!this.$store.state.Users.connexion){
        localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))
        localStorage.setItem('nbProduitPanier',this.$store.state.Panier.nbProduit)
        }

        if(this.$store.state.Users.connexion){
          let data = {quantity:this.editedQuantite}
          console.log("id",this.idContentOrder)
          Order_content.updateOrderContent(this.idContentOrder,data)
        }

        this.dialogEdit = false
      },
      editItem (item) {
        this.editedIndex = this.$store.state.Panier.contenu.indexOf(item)
        this.idContentOrder = item.idContentOrder
        // this.id=item.id

        this.quantite = item.quantite
        this.editedQuantite = item.quantite
        this.itemStock =[]
        Products.loadCardById(item.id).then(data=>{
                this.stock = data.stock
                for(let i=1 ; i <= data.stock ; i++){
                  this.itemStock.push(i)
                }
              })

        console.log("item",item)
        this.dialogEdit = true
      },

      deleteItem (item) {
        this.editedIndex = this.$store.state.Panier.contenu.indexOf(item)
        this.idContentOrder = item.idContentOrder
        console.log("id content order delete",item.idContentOrder)
        this.dialogDelete = true
      },
      deleteItemConfirm(){
          this.$store.state.Panier.contenu.splice(this.editedIndex, 1)
          
          this.$store.state.Panier.nbProduit = 0
          this.$store.state.Panier.contenu.forEach(element=>{
          this.$store.state.Panier.nbProduit += parseInt(element.quantite) 
          })
          this.$store.state.Panier.nbProduit =this.$store.state.Panier.nbProduit.toString()
          if(!this.$store.state.Users.connexion){
          localStorage.setItem('nbProduitPanier',this.$store.state.Panier.nbProduit.toString())
          localStorage.setItem('panier',JSON.stringify(this.$store.state.Panier.contenu))
          }
          if(this.$store.state.Users.connexion){
              console.log("delete id content order",this.idContentOrder)
              Order_content.deleteOrderContent(this.idContentOrder)
          }
          this.dialogDelete = false
      },
      closeDelete(){
        this.dialogDelete = false
      },
      creerCompte(){
        this.$store.state.Panier.sheet = false
        this.$vuetify.goTo('#inscriptionForm', {duration: 500, easing: 'easeInOutCubic'})
      },
      connecterPanier(){
        this.$store.state.Panier.sheet = false
        this.$store.state.Users.sheet = true

      },
      zoomImg(event){
        let imgClick = event.target
        imgClick.style.width = "150px"
      },
      deZoomImg(event){
        let imgClick = event.target
        imgClick.style.width = "30px"
      },
      totalPanier(){
        let total = 0
        this.$store.state.Panier.contenu.forEach(element => {
          total += element.montant
        })
        return total
      }
    }
  }
</script>
<style lang="scss">
  .panier{
    border-radius:15px 0 0 15px;
  }

  .v-responsive__content{
    position:relative;
  }

  .v-badge__badge{
    position:absolute !important;
    left: 9px !important;
    top:-13px !important;
  }

  .v-bottom-sheet
  {
    overflow:auto !important;
  }
</style>
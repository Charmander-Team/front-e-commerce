<template>

<v-container fluid class="pa-0">

    <v-tabs
      v-if="$store.state.Users.connexion"
      v-model="tab"
      align-with-title
      dark
      background-color="grey darken-3"
    >
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab
          
        >
          Compte
        </v-tab>
        <v-tab
          
        >
          Commandes
        </v-tab>
    </v-tabs>

    <v-tabs-items v-if="$store.state.Users.connexion" v-model="tab">
      <v-tab-item>
            <v-form 
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-img :src="$store.state.Users.image" width="15%" alt="image user"></v-img>
                    </v-col>
                </v-row>
                <v-row>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="firstname"
                      :label="`Prénom: ${$store.state.Users.firstname}`"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>
                  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="lastname"
                      :label="`Nom: ${$store.state.Users.lastname}`"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>
                  
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="email"
                      :label="`E-mail: ${$store.state.Users.mail}`"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="nouvelEmail"
                      label="Nouvel E-mail"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="motDePasseActuel"
                      :rules="nameRules"
                      type="password"
                      label="Mot de passe actuel"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="nouveauMotDePasse"
                      type="password"
                      label="Nouveau mot de passe"
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
                      @click="update"
                      align-center
                      >
                      Modifier
                      </v-btn>
                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >
                      <v-btn
                      :disabled="!$store.state.Users.connexion"
                      color="red"
                      dark
                      class="mr-4"
                      @click="logout"
                      align-center
                      >
                      Déconnexion
                      </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
      </v-tab-item>
      <v-tab-item>
          <v-expansion-panels focusable>
            <v-expansion-panel
              v-for="(item,i) in $store.state.Panier.orderPaidTrue"
              :key="i"
            >
              <v-expansion-panel-header><span>N°: {{item.id}}</span> <span>Le: {{isoDate(item.createdAt)}}</span>  <span>{{item.status}}</span></v-expansion-panel-header>
              <v-expansion-panel-content>
                    <v-data-table
                      :headers="headers"
                      :options="{}"
                      item-key="idContentOrder"
                      :items="$store.state.Panier.contenuOrderPaid[i]"
                      :items-per-page="5"
                      :sort-desc="true"
                    >
                    <template v-slot:[`item.img`]="{ item }">
                      <img :src="item.img" width="30" height="auto" alt="" @mouseover="zoomImg" @mouseout="deZoomImg">
                    </template>
                    </v-data-table>
                    <v-footer absolute>
                        <div class="text-center mx-auto">
                          Total : 
                          {{$store.state.Panier.totalOrderPaid[i]}} €
                        </div>
                    </v-footer>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import Users from '@/services/Users'
// import Order_content from '@/services/Order_content'
// import Products from '@/services/Products'

export default {
    name:"DetailConnexion",
    data: () => ({
      // orderPaidTrue:[],
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
      ],
      tab:null,
      user:null,
      valid: false,
      motDePasseActuel: '',
      nouveauMotDePasse: '',
      firstname:'',
      lastname: '',
      nameRules: [
        v => !!v || 'Mot de passe obligatoire',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+/.test(v) || 'E-mail invalid',
      ],
      nouvelEmail:'',
      nouvelEmailRules: [
        v => /.+@.+/.test(v) || 'E-mail invalid',
      ]
    }),
    methods: {

    //  loadAllOrder(){
    //     if(this.$store.state.Users.connexion){
    //        return Orders.loadOrderByUser(this.$store.state.Users.id).then(data=>{
    //           console.log("order by user",data)
    //           data.forEach(element => {
    //             if(element.paid===true){this.$store.state.Panier.orderPaidTrue.push(element)}
    //           })
    //           return this.$store.state.Panier.orderPaidTrue
    //         })
    //     }
    //   },


    // pushContenuOrderPaid(){

    //   //  return  
    //   this.$store.state.Panier.orderPaidTrue.forEach((element,index)=>{
    //       Order_content.loadOrderContentByOrder(element.id).then(content=>{
             

    //     let contenu = []
        
    //     content.forEach(value=>{
    //           let product = {}             
    //           Products.loadCardById(value.product_id).then(data=>{
    //             product.id=data.card_id
    //             product.img=data.img
    //             product.ref=data.ref
    //             product.price=data.price
    //             product.name=data.name
    //             product.quantite=data.quantity
    //             product.montant=data.price * data.quantity
    //             product.idContentOrder=value.id
    //             contenu.push(product)
    //           })
    //       })
    //       console.log("contenu paid order",contenu)
    //       this.$store.state.Panier.contenuOrderPaid[index]=contenu
    //       // return contenu
    //     })
    //   })
       
    //   },

      isoDate(date){
        let d= new Date(date)
        let day = d.getDate()
        let month = d.getMonth()+1
        let year = d.getFullYear()

        if(day<10){day = "0"+day}
        if(month<10){month = "0"+month}

        return day+"/"+month+"/"+year
      },
      zoomImg(event){
        let imgClick = event.target
        imgClick.style.width = "150px"
      },
      deZoomImg(event){
        let imgClick = event.target
        imgClick.style.width = "30px"
      },

      logout(){
        this.$store.state.Users.connexion = false
        this.$vuetify.goTo(0)
        this.$store.state.Users.id=null
        this.$store.state.Users.lastname= ""
        this.$store.state.Users.firstname= ""
        this.$store.state.Users.mail= ""
        this.$store.state.Users.image= ""
        localStorage.removeItem('token')
        localStorage.removeItem('panier')
        localStorage.removeItem('nbProduitPanier')
        this.$store.state.Panier.contenu = []
        this.$store.state.Panier.nbProduit = "0"
        this.$store.state.Panier.orderPaidTrue = []
        this.$store.state.Panier.contenuOrderPaid = []
        this.$store.state.Panier.totalOrderPaid = []
        this.$store.state.Users.admin = false
      },
      update(){
        if(this.$refs.form.validate()){
        Users.checkUser({
            mail: this.$store.state.Users.mail,
            mdp: this.motDePasseActuel,
          })
          .then(
            (val => {
              console.log("event user check update",val)
              this.$set(this, "user", val)
              if(val!==undefined){
                let data = {}
                if(this.nouveauMotDePasse!=="" && this.nouvelEmail===""){
                  data = {password:this.nouveauMotDePasse}
                }
                if(this.nouveauMotDePasse==="" && this.nouvelEmail!==""){
                  data = {mail:this.nouvelEmail}
                }
                if(this.nouveauMotDePasse!=="" && this.nouvelEmail!==""){
                  data = {mail:this.nouvelEmail,password:this.nouveauMotDePasse}
                }

                Users.updateUser(this.$store.state.Users.id,data).then(event=>{
                  console.log("event update",event)
                this.$refs.form.resetValidation()
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image

                localStorage.setItem('token', event.token)

                this.motDePasseActuel = ""
                this.nouveauMotDePasse = ""
                this.nouvelEmail=""
                })

              }
            }).bind(this)
          );
        }
      },
    },
}
</script>
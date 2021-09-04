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
            <v-btn v-if="$store.state.Users.connexion" class="mt-3" color="success">Valider panier</v-btn>
            <div v-if="!$store.state.Users.connexion">
                <p>Pour valider votre panier:</p> 
                <v-btn class="mt-3" color="success" @click="connecterPanier()">Connectez vous</v-btn>
                ou
                <v-btn class="mt-3" color="success" @click="creerCompte()">Créez un compte</v-btn>
            </div>
          </div>
      </v-footer>
    </v-bottom-sheet>
  </div>
</template>
<script>
  import Products from '@/services/Products'
  import Order_content from '@/services/Order_content'
  export default {
    name:"Panier",
    data: () => ({
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
<template>
    <v-container>
        <v-row>
              <v-col
                    cols="12" md="3" lg="3"
                    v-for="(item, index) in cartes" :key="index"
                >
                    <div>
                    <v-img
                        width="100%"
                        height="auto"
                        max-width="250"
                        :src="item.img"
                    ></v-img>
                    <v-card max-width="250" class="mt-3 pa-2">
                        <v-card-title class="px-0 py-0 text-lg-body-3 text-md-body-1">
                        {{ capitalizeFirstLetter(item.name) }}
                        </v-card-title>
                        <v-card-text class="px-0 py-0 text-lg-custom">
                        <div class="grey--text">Ref: {{ item.ref }}</div>
                        <div class="grey--text">Type: {{ item.type }}</div>
                        <v-row align="center" class="mx-0">
                            <div class="grey--text">
                            Niveau:
                            </div>
                            <v-rating
                            :value="parseInt(item.etat)"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                            ></v-rating>
                        </v-row>
                        </v-card-text>
                        <v-divider class="ma-1"></v-divider>
                        <v-card-text class="px-0 py-0">
                        <div class="grey--text mb-1">
                            Prix: {{ item.price }} €
                        </div>
                        <v-btn @click="dialog = true, stock = item.stock, product = {id:item.card_id, img:item.img, ref:item.ref, price:item.price, name:item.name, quantite:null, montant:null, idContentOrder:null }" small color="deep-purple" dark v-if="item.stock>0">
                          Panier <sup>+</sup>
                        </v-btn>
                        <v-btn  small color="red" dark v-if="item.stock<=0">
                          épuisé
                        </v-btn> 
                        <v-btn small color="deep-purple" class="ml-2" dark>
                          <router-link style="text-decoration:none;color:#ffffff;" :to="{ name: 'VoirCarte', params: { cardId: item.card_id }}">Voir</router-link>
                        </v-btn>
                        </v-card-text>
                    </v-card>
                    </div>
                </v-col>                    
        </v-row>

      <v-dialog
      v-model="dialog"
      overlay-color="grey"
      max-width="600px"
      @click:outside="nbAjout = 0"
    >
      <v-card>
        <v-form 
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-card-title>
          <span class="text-h5">Ajouter Au panier</span>
        </v-card-title>
        <v-card-text>
          <small>En stock: {{stock}}</small>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="nbAjout"
                  :items="quantite()"
                  label="Choisir une Quantité*"
                  :rules="nbProduitRule"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*Ce champ est obligatoire</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            dark
            @click="dialog = false"
          >
            Fermer
          </v-btn>
          <v-btn
            color="blue"
            dark
            @click="ajouterPanier()"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    </v-container>
</template>
<script>
import Products from '@/services/Products.js'
import Script from '@/mixins/script.js'

export default {
    name:"NouveautesCartes",
    mixins:[Script],
    data: () => ({
      nbProduitRule: [
        v => !!v || 'Veuillez choisir une quantité',
      ],
      nbAjout:0,
      valid:false,
      dialog:false,
      stock:null,
      product:null,
      model: null,
      cartes: [],
    }),

    methods:{
    async getEventDataProduct() {
      Products.loadNouveautes()
      .then(
        (event => {
          this.$set(this, "cartes", event);
        }).bind(this)
      );
    },
    capitalizeFirstLetter(string) {
      let capitalize = string.charAt(0).toUpperCase() + string.slice(1);
      return capitalize.replace('-', ' ')
      }
    },
    async created(){
      await this.getEventDataProduct()
    }

}
</script>
<style lang="scss">

</style>
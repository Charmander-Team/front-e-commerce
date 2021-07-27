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
                            :value="item.niveau"
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
                        <v-btn small color="deep-purple" dark>
                          <!-- Acheter -->
                          Panier <sup>+</sup>
                        </v-btn>
                        <v-btn small color="deep-purple" class="ml-2" dark>
                          <router-link style="text-decoration:none;color:#ffffff;" :to="{ name: 'VoirCarte', params: { cardId: item.card_id }}">Voir</router-link>
                        </v-btn>
                        </v-card-text>
                    </v-card>
                    </div>
                </v-col>                    
        </v-row>
    </v-container>
</template>
<script>
import Products from '@/services/Products.js';
export default {
    name:"NouveautesCartes",
    data: () => ({
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
.v-slide-group__next, .v-slide-group__prev{
    min-width: 2px !important;
}
</style>
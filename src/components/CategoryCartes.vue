<template>
    <v-container>
        <v-row>
              <v-col
                    cols="12" md="3" lg="3"
                    v-for="(item, index) in category" :key="index"
                >
                    <div>
                    <router-link :to="{ name: 'VoirCategory', params: { categoryId: item.id }}">
                    <v-img
                        width="100%"
                        height="auto"
                        max-width="250"
                        :src="item.image"
                    ></v-img>
                    </router-link>
                    <router-link style="text-decoration:none" :to="{ name: 'VoirCategory', params: { categoryId: item.id }}">
                    <v-card max-width="250" class="mt-3 pa-2">
                        <v-card-title class="px-0 py-0 text-lg-body-3 text-md-body-1">
                        {{ capitalizeFirstLetter(item.name) }}
                        </v-card-title>
                    </v-card>
                    </router-link>
                    </div>
                </v-col>                    
        </v-row>
    </v-container>
</template>
<script>
import Category from '@/services/Category.js';
export default {
    name:"CategoryCartes",
    data: () => ({
      model: null,
      category: [],
    }),

    methods:{
    async getEventDataCategory() {
      Category.loadCategoryNouveaute()
      .then(
        (event => {
          this.$set(this, "category", event);
        }).bind(this)
      );
    },
    capitalizeFirstLetter(string) {
      let capitalize = string.charAt(0).toUpperCase() + string.slice(1);
      return capitalize.replace('-', ' ')
      }
    },
    async created(){
      await this.getEventDataCategory()
    }

}
</script>
<style lang="scss">

</style>
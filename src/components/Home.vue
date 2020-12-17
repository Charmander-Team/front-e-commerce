<template>
<div>
<v-container>
<v-row>
 <v-col>  
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Sacha </v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  > 
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      width="100%"
      height="100%"
      src="../assets/salameche.png"
    ></v-img>

    <v-card-title>Salamèche</v-card-title>

    <v-card-text>
        <v-row
        align="center"
        class="mx-0"
      >
      <div class="grey--text ml-4">
          Ref: SAL6776
      </div>
      </v-row>
      <v-row
        align="center"
        class="mx-0"
      >
        <div class="grey--text ml-4">
          Niveau
        </div>
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

      </v-row>
      <v-row
        align="center"
        class="mx-0"
      >
      <div class="grey--text ml-4">
          Type energie: Feu
      </div>
      </v-row>

    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>20€</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip @click="reserve">Acheter</v-chip>
      </v-chip-group>
    </v-card-text>

  </v-card>


   </v-card>
  </v-col>
</v-row>
</v-container>
</div>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Accueil', icon: 'mdi-home-city' },
          { title: 'Compte', icon: 'mdi-account' },
          { title: 'Utilisateur', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
        loading: false,
        selection: 1,
      }
    },
    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
<style lang="scss">
    
</style>
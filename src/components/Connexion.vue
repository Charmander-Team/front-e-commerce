<template>
  <div>
    <!-- <v-btn
      class="connexion mr-1 ml-1"
      color="deep-purple"
      tile
      dark
      @click="sheet = !sheet"
    >
    Connexion
    </v-btn> -->
    <v-tab @click="sheet = !sheet">
        <v-img src="../assets/connexion_icon.png" width="75" height="auto">
        </v-img>
        <!-- connexion -->
    </v-tab>
    

    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center"
        height="auto"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          fermer
        </v-btn>
        <div class="py-3">
          <ConnexionForm/>
          <DetailConnexion/> 
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import ConnexionForm from '../components/ConnexionForm'
import DetailConnexion from '../components/DetailConnexion'
  export default {
    name:"Connexion",
    components:{ConnexionForm,DetailConnexion},
    data: () => ({
      sheet: false,
    }),
  }
</script>
<style lang="scss">
  .connexion{
    border-radius:0 15px 15px 0;
  }
</style>
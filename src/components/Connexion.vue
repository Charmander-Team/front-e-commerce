<template>
  <div>
    <div class="d-flex">
        <v-tab @click="$store.state.Users.sheet = !$store.state.Users.sheet">
          <v-img src="../assets/connexion_icon.png" width="75" height="auto"></v-img>
        </v-tab>
          <v-img v-if="$store.state.Users.admin"  @click="backOfficeRedirect()" style="cursor:pointer" class="ml-5" src="../assets/pokemon-center.png" width="75" height="auto">
        </v-img>
    </div>

    <v-bottom-sheet v-model="$store.state.Users.sheet">
      <v-sheet
        class="text-center"
        height="auto"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="$store.state.Users.sheet = !$store.state.Users.sheet"
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
    methods:{
      backOfficeRedirect(){
        window.location ='https://admin.pokeshop.tk/#/?t='+localStorage.getItem('token')
      }
    }
  }
</script>
<style lang="scss">
  .connexion{
    border-radius:0 15px 15px 0;
  }
</style>
<template>
    <v-col v-if="!$store.state.Users.connexion" cols="10" lg="10" md="10">
        <v-row>
            <v-col cols="12" lg="8" md="8" xs="12">
                <div class="grey--text pa-4">
                    <h3 class="grey--text text--darken-2">Inscrivez-vous sur notre boutique et profitez d'une expérience unique</h3><br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat
                </div>  
            </v-col>
            <v-col cols="12" lg="4" md="4" xs="12" class="jutify-content-center">
                <InscriptionForm/>
            </v-col>
        </v-row>
    </v-col>
</template>
<script>
import InscriptionForm from '../components/InscriptionForm'
export default {
   name:"CreerCompte",
   components:{InscriptionForm}, 
   data: () => ({}),
}
</script>
<style lang="scss">
    .jutify-content-center{
        display:flex;
        justify-content:center;
    }
</style>
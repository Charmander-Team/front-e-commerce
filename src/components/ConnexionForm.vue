<template>
  <v-form 
    v-if="!$store.state.Users.connexion"
    ref="form"
    v-model="valid"
    lazy-validation>
    <v-container>
      <v-row>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="motDePasse"
            :rules="nameRules"
            type="password"
            label="Mot de passe"
            required
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
            @click="validate"
            align-center
            >
            Connexion
            </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Users from '@/services/Users'
export default {
    name:"ConnexionForm",
    data: () => ({
      valid: false,
      motDePasse: '',
      //lastname: '',
      nameRules: [
        v => !!v || 'Mot de passe obligatoire',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+/.test(v) || 'E-mail invalid',
      ],
      user:null
    }),
    methods: {

      validate () {
        
        if(this.$refs.form.validate()){
          Users.checkUser({
            mail: this.email,
            mdp: this.motDePasse,
          })
          .then(
            (event => {
              console.log("event user check",event)
              this.$set(this, "user", event)
              if(event!==undefined){
                this.$refs.form.resetValidation()
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image

                this.motDePasse = ""
              }
            }).bind(this)
          );        
        }
      },

    },
}
</script>
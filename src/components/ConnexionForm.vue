<template>
  <v-form 
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
            Valider
            </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
<script>
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
    }),
    methods: {
      validate () {
        // this.$refs.form.validate()
        this.$axios.get(`http://localhost:${this.$apiPort}/api/client/mdp/${this.motDePasse}/mail/${this.email}`).then((response) => {
        console.log(response.data)
        }).catch(error => console.log(error))
        //this.$refs.form.valid()
      },
    },
}
</script>
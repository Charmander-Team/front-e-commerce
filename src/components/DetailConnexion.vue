<template>
  <v-form 
    v-if="$store.state.Users.connexion"
    ref="form"
    v-model="valid"
    lazy-validation>
    <v-container>
      <v-row>
          <v-col cols="12">
              <v-img :src="$store.state.Users.image" alt="image user"></v-img>
          </v-col>
      </v-row>
      <v-row>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :label="`Prénom: ${$store.state.Users.firstname}`"
            required
            readonly
          ></v-text-field>
        </v-col>
        
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :label="`Nom: ${$store.state.Users.lastname}`"
            required
            readonly
          ></v-text-field>
        </v-col>
        
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :label="`Mail: ${$store.state.Users.mail}`"
            required
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Nouvel E-mail"
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
            label="Mot de passe actuel"
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
            label="Nouveau mot de passe"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="12"
        >
            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            align-center
            >
            modifier
            </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
<script>
export default {
    name:"DetailConnexion",
    data: () => ({
      valid: false,
      motDePasse: '',
      firstname:'',
      lastname: '',
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
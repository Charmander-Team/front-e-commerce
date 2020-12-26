<template>
    <v-card rounded="xl"  width="300" class="pa-5">
        <h2 class="pa-0 text-center font-weight-medium">CRÉER UN COMPTE</h2>
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="prenom"
      :rules="prenomRules"
      label="Prénom*"
      required
    ></v-text-field>

     <v-text-field
      v-model="nom"
      :rules="nomRules"
      label="Nom*"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail*"
      required
    ></v-text-field>

    <v-text-field
      v-model="mdp"
      :rules="mdpRules"
      :type="show ? 'text' : 'password'"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      label="Mot de passe*"
      @click:append="show = !show"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Les champs indiquant * sont obligatoire']"
      label="vous confirmez avoir lu et accepté
      les conditions d'utilisation."
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      block
    >
      s'inscrire
    </v-btn>
  </v-form>
    </v-card>
</template>
<script>
  export default {
    name:"InscriptionForm",
    data: () => ({
      show: false,
      valid: true,
      nom: '',
      prenom: '',
      mdp: '',
      nomRules: [
        v => !!v || 'Nom obligatoire',
      ],
      prenomRules: [
        v => !!v || 'Prénom obligatoire',
      ],
      mdpRules: [
        v => !!v || 'Mot de passe obligatoire',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+\..+/.test(v) || 'E-mail doit être valide',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
<style lang="scss">
    .text-align-center{
        text-align:center;
    }
</style>
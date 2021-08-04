<template>
  <v-form 
    v-if="$store.state.Users.connexion"
    ref="form"
    v-model="valid"
    lazy-validation>
    <v-container>
      <v-row>
          <v-col cols="12">
              <v-img :src="$store.state.Users.image" width="15%" alt="image user"></v-img>
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
            :label="`E-mail: ${$store.state.Users.mail}`"
            required
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="nouvelEmail"
            :rules="nouvelEmailRules"
            label="Nouvel E-mail"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="motDePasseActuel"
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
            v-model="nouveauMotDePasse"
            :rules="nameRules"
            type="password"
            label="Nouveau mot de passe"
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
            @click="update"
            align-center
            >
            Modifier
            </v-btn>
        </v-col>


        <v-col
          cols="12"
          md="4"
        >
            <v-btn
            :disabled="!$store.state.Users.connexion"
            color="red"
            dark
            class="mr-4"
            @click="logout"
            align-center
            >
            Déconnexion
            </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Users from '@/services/Users'
export default {
    name:"DetailConnexion",
    data: () => ({
      user:null,
      valid: false,
      motDePasseActuel: '',
      nouveauMotDePasse: '',
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
      nouvelEmail:'',
      nouvelEmailRules: [
        v => !!v || 'E-mail obligatoire',
        v => /.+@.+/.test(v) || 'E-mail invalid',
      ]
    }),
    methods: {
      logout(){
        this.$store.state.Users.connexion = false
        this.$vuetify.goTo(0)
        this.$store.state.Users.id=null
        this.$store.state.Users.lastname= ""
        this.$store.state.Users.firstname= ""
        this.$store.state.Users.mail= ""
        this.$store.state.Users.image= ""
        localStorage.removeItem('token')
      },
      update(){
        Users.checkUser({
            mail: this.$store.state.Users.mail,
            mdp: this.motDePasseActuel,
          })
          .then(
            (val => {
              console.log("event user check update",val)
              this.$set(this, "user", val)
              if(val!==undefined){
                let data = {}
                if(this.nouveauMotDePasse!=="" && this.nouvelEmail===""){
                  data = {password:this.nouveauMotDePasse}
                }
                if(this.nouveauMotDePasse==="" && this.nouvelEmail!==""){
                  data = {mail:this.nouvelEmail}
                }
                if(this.nouveauMotDePasse!=="" && this.nouvelEmail!==""){
                  data = {mail:this.nouvelEmail,password:this.nouveauMotDePasse}
                }

                Users.updateUser(this.$store.state.Users.id,data).then(event=>{
                  console.log("event update",event)
                this.$refs.form.resetValidation()
                this.$store.state.Users.connexion = true
                this.$vuetify.goTo(0)
                this.$store.state.Users.id= event.id
                this.$store.state.Users.lastname= event.lastname
                this.$store.state.Users.firstname= event.firstname
                this.$store.state.Users.mail= event.mail
                this.$store.state.Users.image= event.image

                localStorage.setItem('token', event.token)

                this.motDePasseActuel = ""
                this.nouveauMotDePasse = ""
                })

              }
            }).bind(this)
          );
      },
    },
}
</script>
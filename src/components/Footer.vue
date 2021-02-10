<template>
  <v-footer
    dark
    padless
    class="black lighten-1 white--text text-center"
  >
      <v-container>
        <v-row justify="center">
            <v-col cols="12" lg="2" md ="2">
              <div class="footer-titre d-blobk">Réseaux:</div>
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="d-inline mx-2 white--text"
                icon
              >
                <v-icon class="d-inline">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-col>
            <v-col class="text-left" cols="12" lg="5" md ="5">
              <ul class="d-lg-inline-block d-xs-block vertical-align-top ml-lg-6 ml-xs-0" v-for="(item,index) in footer" :key="index">
                <li class="footer-titre d-block">
                  {{item.titre}}
                </li>
                <li class="d-block" v-for="(item2,index2) in item.liste" :key="index2">
                    {{item2}}
                </li>
              </ul>
            </v-col>
            <v-col class="text-left" cols="12" lg="5" md="5">
              <ul>
                <li class="footer-titre d-block">
                  INSCRIPTION
                </li>
                <li class="d-block">
                  Abonnez-vous à notre newsletter pour être le premier informé des nouvelles offres et promotions.
                </li>
                <li class="d-block form-inscription-mail">
                  <input type="text" placeholder="Adresse Email" class="">
                  <input type="submit" value="INSCRIPTION" class="">
                </li>
              </ul>
            </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="pa-0">
          <v-row>
            <v-col class="white indigo--text d-flex justify-end pa-4" col="12" lg="12" md="12">
                <img src="../assets/logo-master-card.svg" alt="" class="pa-2">
                <img src="../assets/logo-visa.svg" alt="" class="pa-2">
            </v-col>
          </v-row>
      </v-container>
  </v-footer>
</template>
<script>
export default {
    name: 'Footer',
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        //'mdi-linkedin',
        'mdi-instagram',
      ],
      footer:[
        {titre:"Accueil",liste:["A propos","Contact","Mentions légales"]},
        {titre:"Politique",liste:["CGV","CGI","Retour"]},
        {titre:"Categories",liste:["Cartes rares","Cartes Energie","Cartes Dresseur","Cartes Pokemon"]},
      ]
    }),
  }
</script>
<style lang="scss">
  .vertical-align-top{
    vertical-align: top;
  }

  .footer-titre{
    font-size:17px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top:10px;
    margin-bottom:10px;
  }

  .form-inscription-mail {
    margin:15px 0;
    input[type="text"]{
      padding:5px;
      color:#8d8a8a;
      border:2px solid #ffffff;
      background-color: #ffffff;
    }

    input[type="submit"]{
      padding:5px;
      border:2px solid #ffffff;
    }

    input[type="text"]:focus,input[type="submit"]:focus{
      outline:0;
    }
  }
</style>
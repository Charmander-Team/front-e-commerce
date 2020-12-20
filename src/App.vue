<template>
  <v-app>
    <v-main>
      <!-- <v-app-bar app>
        LOGO
      </v-app-bar> -->
      <Home/>
      <Footer/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Footer from './components/Footer';
export default {
  name: 'App',

  components: {
    Home,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">

  #app{
    background-image:url('assets/bg.svg');
    background-repeat:no-repeat;
    background-position:top center;
    background-size:100vw auto;
  }
</style>

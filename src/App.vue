<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
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

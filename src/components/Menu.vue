<template>
<div>
<!-- <div class="menu d-none d-sm-block"> -->
<div class="menu hidden-md-and-down">
    <v-btn height="45" v-for="(item,index) in items" :key="index" block dark tile color="deep-purple">
       {{item.title}}
    </v-btn>
</div>
<div class="hidden-md-and-up">
  <v-layout
    wrap
    style="height: 200px;"
  >
    <v-container>
      <v-layout justify-center>
        
          <v-icon color="deep-purple" @click.stop="drawer = !drawer" x-large>mdi-menu</v-icon>
        
      </v-layout>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="deep-purple"
    >
      <v-btn height="45" v-for="(item,index) in items" :key="index" block dark tile color="deep-purple">
       {{item.title}}
      </v-btn>
    </v-navigation-drawer>
  </v-layout>
</div>
</div>
</template>
<script>

export default {
  name: "Menu",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "Nouveautés", icon: "mdi-account" },
        { title: "Enchères", icon: "mdi-account-group-outline" },
        { title: "Catégories", icon: "mdi-account-group-outline" },
        { title: "Règles", icon: "mdi-account-group-outline" },
        { title: "A propos", icon: "mdi-account-group-outline" },
        { title: "Contact", icon: "mdi-account-group-outline" },
      ],
      mini: true,
      drawer: null,
    };
  },
};
</script>
<style lang="scss">
  .menu{
    // position:absolute;
    // z-index:100;
    .v-btn:first-child{
      border-radius: 15px 15px 0 0;
    }
    .v-btn:last-child{
      border-radius: 0 0 15px 15px;
    }
  }

</style>

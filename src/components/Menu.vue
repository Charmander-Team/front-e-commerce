<template>
<div class="menu d-none d-sm-block">
    <v-btn height="45" v-for="(item,index) in items" :key="index" block dark tile color="deep-purple">
       {{item.title}}
    </v-btn>
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
    };
  },
};
</script>
<style lang="scss">
  .menu{
    position:absolute;
    z-index:100;
    .v-btn:first-child{
      border-radius: 15px 15px 0 0;
    }
    .v-btn:last-child{
      border-radius: 0 0 15px 15px;
    }
  }

</style>

<template>
<div id="containerCard" class="position-relative">
<!-- Menu dekstop -->
<div id="menu" class="hidden-md-and-down" v-scroll="onScroll">
    <v-btn height="45" v-for="(item,index) in items" :key="index" block  tile small dark color="deep-purple">
       {{item.title}}
    </v-btn>
</div>
<!-- Menu mobile -->
<div class="hidden-md-and-up">
  <v-layout
    wrap
    style="height: 200px;"
  >
    <v-container>
      <v-layout justify-center>
        
          <v-icon color="deep-purple" @click.stop="drawer = !drawer" large>mdi-menu</v-icon>
        
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
      fab: false,
    };
  },
  methods: {
    onScroll () {
      // if (typeof window === 'undefined') return
      // const top = window.pageYOffset ||   e.target.scrollTop || 0
      // this.fab = top > 20
     console.log(document.getElementById("containerCard").offsetHeight)
     console.log(document.getElementById("header").offsetHeight)
     let heightMenu = document.getElementById("containerCard").offsetHeight - (document.getElementById("header").offsetHeight * 2) - 35
     if(heightMenu >=window.pageYOffset){
              document.getElementById("menu").style.top=window.pageYOffset+"px"
      }      
     // console.log(window.pageYOffset)

    },
    scroll () {
      this.$vuetify.goTo(0)
    }
  },
};
</script>
<style lang="scss">
  #containerCard{
    height: 100%;
  }

  .position-relative{
    position:relative;
  }

  #menu{
    // position:fixed;
     position: relative;
     //left:20px;
     //top:20px;
    z-index:100;
    .v-btn:first-child{
      border-radius: 15px 15px 0 0;
    }
    .v-btn:last-child{
      border-radius: 0 0 15px 15px;
    }
  }

</style>

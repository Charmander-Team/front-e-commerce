<template>
<div id="containerCard" class="position-relative">
<!-- Menu dekstop -->
<div id="menu" class="hidden-md-and-down" v-scroll="onScroll">
    <v-btn height="45" v-for="(item,index) in items" :key="index" block  tile small light color="white">
       <router-link :to="item.path" style="text-decoration:none;color:#000000">
         {{item.title}}
       </router-link>
    </v-btn>

    <v-btn height="45" block  tile small light color="white">
       <router-link to="/Regles" style="text-decoration:none;color:#000000">
         Règles
       </router-link>
    </v-btn>
    <v-btn height="45" block  tile small light color="white">
       <router-link to="/A-propos" style="text-decoration:none;color:#000000">
         A propos
       </router-link>
    </v-btn>
    <v-btn height="45" block  tile small light color="white">
       <router-link to="/Contact" style="text-decoration:none;color:#000000">
         Contact
       </router-link>
    </v-btn>
</div>
<!-- Menu mobile -->
<div id="menuMobile" class="hidden-md-and-up" v-scroll="onScroll">
  <v-layout
    wrap
  >
    <v-container>
      <v-layout justify-center>
        
          <v-icon color="#ffffff" @click.stop="drawer = !drawer" large>mdi-menu</v-icon>
        
      </v-layout>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="#ffffff"
    >
      <v-btn height="45" v-for="(item,index) in items" :key="index" block light tile color="#ffffff">
       {{item.title}}
      </v-btn>

      <v-btn height="45" block  tile light color="white">
       <router-link to="/Regles" style="text-decoration:none;color:#000000">
         Règles
       </router-link>
    </v-btn>
    <v-btn height="45" block  tile light color="white">
       <router-link to="/A-propos" style="text-decoration:none;color:#000000">
         A propos
       </router-link>
    </v-btn>
    <v-btn height="45" block  tile light color="white">
       <router-link to="/Contact" style="text-decoration:none;color:#000000">
         Contact
       </router-link>
    </v-btn>
    </v-navigation-drawer>
  </v-layout>
</div>
</div>
</template>
<script>
import Page from '@/services/Page.js'
export default {
  name: "Menu",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city", path:"/" },
        { title: "Nouveautés", icon: "mdi-account",path:"/Nouveautes" },
        // { title: "Enchères", icon: "mdi-account-group-outline",path:"/encheres" },
        { title: "Catégories", icon: "mdi-account-group-outline",path:"/Categories"},


        // { title: "Règles", icon: "mdi-account-group-outline",path:"/Regles"},
        // { title: "A propos", icon: "mdi-account-group-outline",path:"/A-propos"},
        // { title: "Contact", icon: "mdi-account-group-outline",path:"/Contact" },
      ],
      mini: true,
      drawer: null,
      fab: false,
    };
  },
  created(){
    this.addItemPage()
  },
  methods: {
    addItemPage(){
        Page.loadAllPage().then((event)=>{
          console.log("page",event)
          if(event.length>0){
              event.forEach(element => {
                  let item = {}
                  item.title = element.navbar_title
                  item.icon = ""
                  item.path = `/page/${element.display}/${element.id}`
                  this.items.push(item)
              })
          }
        })
    }
    ,
    onScroll () {
      // if (typeof window === 'undefined') return
      // const top = window.pageYOffset ||   e.target.scrollTop || 0
      // this.fab = top > 20
     
     //console.log(document.getElementById("containerCard").offsetHeight)
     //console.log(document.getElementById("header").offsetHeight)
     let heightMenu = document.getElementById("containerCard").offsetHeight - (document.getElementById("header").offsetHeight * 2) - 35
     if(heightMenu >=window.pageYOffset){
              document.getElementById("menu").style.top=window.pageYOffset+"px"
              document.getElementById("menuMobile").style.top=window.pageYOffset+"px"

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

   #menuMobile{
     position: relative;
   }

</style>

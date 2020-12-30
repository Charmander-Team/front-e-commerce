<template>
    <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="deep-purple"
            @click="toTop"
          >
            <!-- <v-icon>mdi-arrow-up-bold</v-icon> -->
            <v-icon>mdi-chevron-up</v-icon>
   </v-btn>
</template>
<script>
export default {
    name:"ScrollDown",
    data: () => ({
        fab: false
    }),
    methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 300
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
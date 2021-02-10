<template>
  <div>
    <!-- <v-btn
    class="panier"
      color="deep-purple"
      dark
      tile
      @click="sheet = !sheet"
    >
    Panier
    </v-btn> -->
        <v-tab @click="sheet = !sheet">
          <v-img src="../assets/panier_icon.png" width="58" height="auto">
            <v-badge
          color="black"
          content="8"
        ></v-badge>
          </v-img>
          <!-- PANIER -->
      </v-tab>
    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          fermer
        </v-btn>
        <div class="py-3">
          Panier
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
  export default {
    name:"Panier",
    data: () => ({
      sheet: false,
    }),
  }
</script>
<style lang="scss">
  .panier{
    border-radius:15px 0 0 15px;
  }

  .v-responsive__content{
    position:relative;
  }

  .v-badge__badge{
    position:absolute !important;
    left: 9px !important;
    top:-13px !important;
  }
</style>
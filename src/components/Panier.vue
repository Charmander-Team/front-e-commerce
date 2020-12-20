<template>
  <div>
    <v-btn
    class="panier"
      color="deep-purple"
      dark
      tile
      @click="sheet = !sheet"
    >
    Panier
    </v-btn>
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
</style>
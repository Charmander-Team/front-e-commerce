export default {
    state: {
        nbProduit:"0",
        sheet:false,
    },
    getters:{
       getNbProduit(state){
           return state.nbProduit
       },
       getSheet(state){
           return state.sheet
       }
    }
  }
  
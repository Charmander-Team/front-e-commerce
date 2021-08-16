export default {
    state: {
        nbProduit:"0",
        sheet:false,
        contenu:[]
    },
    getters:{
       getNbProduit(state){
           return state.nbProduit
       },
       getSheet(state){
           return state.sheet
       },
       getContenu(state){
           return state.contenu
       }
    }
  }
  
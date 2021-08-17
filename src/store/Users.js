export default {
  state: {
      connexion:false,
      id:null,
      lastname:"",
      firstname:"",
      email:"",
      image:"",
      sheet:false,
  },
  getters:{
     getConnexion(state){
         return state.connexion
     },
     getLastname(state){
         return state.lastname
     },
     getFirstname(state){
         return state.firstname
     },
     getEmail(state){
         return state.email
     },
     getImage(state){
         return state.image
     },
     getId(state){
         return state.id
     },
     getSheetUser(state){
         return state.sheet
     },
  }
}

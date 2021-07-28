export default {
  state: {
      connexion:false,
      lastname:"",
      firstname:"",
      email:"",
      image:""
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
  }
}

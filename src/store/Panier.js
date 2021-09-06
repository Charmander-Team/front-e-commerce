export default {
    state: {
        nbProduit:"0",
        sheet:false,
        contenu:[],
        order_id:null,
        orderPaidTrue:[],
        contenuOrderPaid:[],
        totalOrderPaid:[]
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
       },
       getOrderId(state){
           return state.order_id
       },
       getOrderPaidTrue(state){
           return state.orderPaidTrue
       },
       getContenuOrderPaid(state){
           return state.contenuOrderPaid
       },
       getTotalOrderPaid(state){
           return state.totalOrderPaid
       }
    }
  }
  
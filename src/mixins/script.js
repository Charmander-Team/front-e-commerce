import Orders from '@/services/Orders'
import Order_content from '@/services/Order_content'
import Products from '@/services/Products'

export default {
    methods:{
    async loadAllOrder(){
            await Orders.loadOrderByUser(this.$store.state.Users.id).then(data=>{
              console.log("order by user",data)
              data.forEach(element => {
                if(element.paid===true){this.$store.state.Panier.orderPaidTrue.push(element)}
                })
              })
      },

      pushContenuOrderPaid(){
        if(this.$store.state.Panier.orderPaidTrue.length>0){
              this.$store.state.Panier.orderPaidTrue.forEach((element,index)=>{
                  Order_content.loadOrderContentByOrder(element.id).then(content=>{
                    

                let contenu = []
                let montant = 0
                content.forEach(value=>{
                      let product = {}             
                      Products.loadCardById(value.product_id).then(data=>{
                        // console.log("data load card",data)
                        product.id=data.card_id
                        product.img=data.img
                        product.ref=data.ref
                        product.price=data.price
                        product.name=data.name
                        product.quantite=value.quantity
                        product.montant=data.price * value.quantity
                        product.idContentOrder=value.id
                        contenu.push(product)

                        montant += (data.price) * (value.quantity)
                        console.log("montant",montant)
                        this.$store.state.Panier.totalOrderPaid[index] = montant
                      })
                  })
                  console.log("contenu paid order",contenu)
                  this.$store.state.Panier.contenuOrderPaid[index]=contenu
                  // return contenu
                })
              })
        }
      },
    }
}
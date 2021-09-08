import Orders from '@/services/Orders'
import Order_content from '@/services/Order_content'
import Products from '@/services/Products'

export default {
    methods:{
      quantite(){
          let itemStock = []
          for(let i=1 ; i <= this.stock ; i++){
              itemStock.push(i)
          }
          return itemStock
      },
      ajouterPanier(){
        if(this.$refs.form.validate()){
        this.dialog = false
        this.$store.state.Panier.nbProduit = parseInt(this.$store.state.Panier.nbProduit) + parseInt(this.nbAjout)
        this.$store.state.Panier.sheet =true
      
        if(!this.$store.state.Users.connexion){
        localStorage.setItem('nbProduitPanier',this.$store.state.Panier.nbProduit)
        }
      
        console.log("contenu",this.$store.state.Panier.contenu)
      
        let ArrayContenuId = []
        this.$store.state.Panier.contenu.forEach(element=>{
          ArrayContenuId.push(element.id)
        })
      
      
      if(JSON.stringify(this.$store.state.Panier.contenu)!="[]"){
        this.$store.state.Panier.contenu.forEach((element,index)=>{
          console.log("element id",this.$store.state.Panier.contenu[index].id)
          console.log("product id",this.product.id)
          if(this.product.id === this.$store.state.Panier.contenu[index].id){
            console.log("Update une carte au panier")
              this.$store.state.Panier.contenu[index].quantite = this.$store.state.Panier.contenu[index].quantite + this.nbAjout
      
              this.$store.state.Panier.contenu[index].montant = parseInt(this.$store.state.Panier.contenu[index].quantite) * parseInt(this.$store.state.Panier.contenu[index].price)
              console.log("montant",this.$store.state.Panier.contenu[index].montant)
              this.nbAjout = 0 
              // localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))
              
              if(this.$store.state.Users.connexion){
                  Order_content.updateOrderContent(
                            this.$store.state.Panier.contenu[index].idContentOrder,
                            {
                            quantity:this.$store.state.Panier.contenu[index].quantite
                            }
                  )
              }else {
                  localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))
              }
          } 
        })
        if(!ArrayContenuId.includes(this.product.id)) 
           {
             console.log("Ajoute une carte au panier")
            this.product.quantite = this.nbAjout
            this.product.montant = parseInt(this.product.quantite) * parseInt(this.product.price)
            this.product.user = this.$store.state.Users.id
            console.log("montant",this.product.montant)
            this.nbAjout = 0 
      
            
            // localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))
      
            if(this.$store.state.Users.connexion){
                this.product.idContentOrder = this.$store.state.Panier.order_id
                Order_content.createOrderContent(
                            {
                              order_id: this.$store.state.Panier.order_id,
                              product_id: this.product.id,
                              quantity: this.product.quantite,
                            }
                            ).then(data=>{
                              console.log("create order content ajout carte",data)
                              this.product.idContentOrder = data.id
                              //Détail de l'ajout
                              this.$store.state.Panier.contenu.push(this.product)
                      })
            } else {
                //Détail de l'ajout
                this.$store.state.Panier.contenu.push(this.product)
                localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))
            }
      
          }
      } else if(JSON.stringify(this.$store.state.Panier.contenu)==="[]")
           {
            console.log("Ajoute une carte au panier quand contenu vide")
            this.product.quantite = this.nbAjout
            this.product.montant = parseInt(this.product.quantite) * parseInt(this.product.price)
            this.product.user = this.$store.state.Users.id
            console.log("montant",this.product.montant)
            this.nbAjout = 0 
      
            //Détail de l'ajout
            // this.$store.state.Panier.contenu.push(this.product)
      
            if(this.$store.state.Users.connexion){
              //  this.product.idContentOrder = this.$store.state.Panier.order_id
                Order_content.createOrderContent(
                            {
                              order_id: this.$store.state.Panier.order_id,
                              product_id: this.product.id,
                              quantity: this.product.quantite,
                            }
                            ).then(data=>{
                              console.log("create order content ajout carte",data)
                              this.product.idContentOrder = data.id
                              //Détail de l'ajout
                              this.$store.state.Panier.contenu.push(this.product)
                      })
            } else {
                //Détail de l'ajout
                this.$store.state.Panier.contenu.push(this.product)
                localStorage.setItem('panier', JSON.stringify(this.$store.state.Panier.contenu))
            }
      
      }
      
        }
      },
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
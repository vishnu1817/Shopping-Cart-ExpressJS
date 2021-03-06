const { response } = require('express');
var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const adminHelpers = require('../helpers/admin-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products) =>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products});
  })

  
});
router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')

})
router.post('/add-product',(req,res)=>{

  productHelpers.addProduct(req.body,(id)=>{
    let image = req.files.Image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.render("admin/add-product")

      }else{
        console.log(err);
      }
    })
    
  })

})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })

})

router.get('/edit-product/:id',async(req,res)=>{
  let product = await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  let id = req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/')
    if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
})
router.get('/orders',async(req,res)=>{
  let allOrders = await adminHelpers.getAllOrders()
  res.render("admin/all-orders",{allOrders,adminHeader:true})
  
 
})
router.get('/users',async(req,res)=>{
  let users = await adminHelpers.getAllUsers()
  res.render("admin/all-users",{users,adminHeader:true})
})
module.exports = router;

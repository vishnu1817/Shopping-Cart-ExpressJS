var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [
    {
      name:"IPHONE 11",
      category:"Mobile",
      description:"This is a good phone",
      image:'https://m.media-amazon.com/images/I/81a0mY01LLL._SL1500_.jpg'

    },
    {
      name:"One Plus 9R",
      category:"Mobile",
      description:"This is a good phone",
      image:'https://m.media-amazon.com/images/I/61PDbUd1VaL._SL1500_.jpg'

    },
    {
      name:"IPHONE 12",
      category:"Mobile",
      description:"This is a good phone",
      image:'https://m.media-amazon.com/images/I/71ZOtNdaZCL._SL1500_.jpg'

    },
    {
      name:"One Plus Nord 2",
      category:"Mobile",
      description:"This is a good phone",
      image:'https://m.media-amazon.com/images/I/61TnX0PmqES._SL1500_.jpg'

    }


  ]

  res.render('admin/view-products',{admin:true,products});
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
module.exports = router;

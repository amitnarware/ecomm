const express = require('express');
const Retailerproductsimages_Router = express.Router();

const {addDescription,updatedescription,viewdescription,addimage,updateimage,viewimageID}  = require("../../controllers/Retailer/Tb_retailer_product_images")

Retailerproductsimages_Router.post('/api/retailer/productdescription/adddescription',addDescription,(req, res) => {});
Retailerproductsimages_Router.put('/api/updatedescription/:pid',updatedescription);
Retailerproductsimages_Router.put('/api/viewdescription/:pid',viewdescription );
Retailerproductsimages_Router.put('/api/retailer/productimages/addnew', addimage) 
Retailerproductsimages_Router.put('/api/retailer/productimage/update/:Imageid',updateimage);
Retailerproductsimages_Router.get('/api/viewimages/:pid', viewimageID) 


module.exports = {Retailerproductsimages_Router}
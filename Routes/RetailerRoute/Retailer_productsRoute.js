const express = require('express');
const Retailerproducts_Router = express.Router();

const {addproduct ,getproductregno, putupdatediscount,putupdateprice,putupdateqty,getallproducts,getallreatiler} = require('../../controllers/Retailer/Tb_retailer_products');

Retailerproducts_Router.post('/api/retailers/product/addnew',addproduct,(req, res) => {});
Retailerproducts_Router.get('/api/retailers/productlist/:regno',getproductregno);
Retailerproducts_Router.put('/api/retailers/product/updateprice/:pid',putupdateprice );
Retailerproducts_Router.put('/api/retailers/product/updatediscount/:pid', putupdatediscount) 
Retailerproducts_Router.put('/api/retailers/product/updateqty/:pid',putupdateqty );
Retailerproducts_Router.get('/api/admin/product/allproducts', getallproducts) 
Retailerproducts_Router.get('/api/admin/retailer/total',getallreatiler ) 

module.exports = {Retailerproducts_Router}
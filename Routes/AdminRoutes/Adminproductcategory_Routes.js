const express = require('express');
const Admin_product_categoryRoute = express.Router();


const {postproduct_category,getproductnames,patchproductid,getcategoryname} = require('../../controllers/Admin/Tb_admin_productcategory');

Admin_product_categoryRoute.post('/api/admin/category/addcategory',postproduct_category,(req, res) => {});
Admin_product_categoryRoute.get('/api/admin/category/viewcategory',getproductnames);
Admin_product_categoryRoute.patch('/api/admin/category/updatecategory/:pcategoryid', patchproductid );
Admin_product_categoryRoute.get('/api/admin/category/findcategory/:categoryname',getcategoryname );

module.exports = {Admin_product_categoryRoute};

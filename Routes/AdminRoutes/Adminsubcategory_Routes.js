const express = require('express');
const Admin_sub_categoryRoute = express.Router();


const {addsubcategory,getsubcategory,updatesubcategory,findSubcategoryByName} = require('../../controllers/Admin/Tb_admin_subcategory');

Admin_sub_categoryRoute.post('/api/admin/subcategory/addsubcategory',addsubcategory,(req, res) => {});
Admin_sub_categoryRoute.get('/api/admin/subcategory/viewsubcategory',getsubcategory);
Admin_sub_categoryRoute.patch('/api/admin/subcategory/updatesubcategory/:subcategoryid',updatesubcategory);
Admin_sub_categoryRoute.get('/api/admin/subcategory/findsubcategory/:subcategoryname',findSubcategoryByName) 

module.exports = {Admin_sub_categoryRoute};
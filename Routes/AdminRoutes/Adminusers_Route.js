const express = require('express');
const Adminusers_Router = express.Router();


const {postusers,getusers,getusersname,putusers,putstatus} = require('../../controllers/Admin/Tb_Adminusers');

Adminusers_Router.post('/api/admin/userregister',postusers,(req, res) => {});
Adminusers_Router.get('/api/admin/userlist',getusers);
Adminusers_Router.get('/api/admin/userfind/:name', getusersname);
Adminusers_Router.put('/api/admin/userupdate/:uid',putusers) 
Adminusers_Router.put('/api/admin/statuschange/:uid',putstatus) 


  



module.exports = {Adminusers_Router};
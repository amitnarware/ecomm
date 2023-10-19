const express = require('express');
const AdminRoles_Route = express.Router();


const {postnewrole,patchRole,getroles,deleteroles} = require('../../controllers/Admin/TB_admin_roles');

AdminRoles_Route.post('/api/admin/roles/newrole',postnewrole,(req, res) => {});
AdminRoles_Route.patch('/api/admin/roles/updateroles/:roleid',patchRole);
AdminRoles_Route.get('/api/admin/roles/viewroles',getroles );
//AdminRoles_Route.delete('/api/admin/roles/delete',deleteroles );



module.exports = {AdminRoles_Route};
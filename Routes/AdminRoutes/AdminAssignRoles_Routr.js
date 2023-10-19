const express = require('express');
const AdminRoles_assign_Route = express.Router();


const {postroleassign,getroleid, putadminrole,revokeadminroles} = require('../../controllers/Admin/Tb_admin_assign_roles');

AdminRoles_assign_Route.post('/api/admin/roleassign/grant/role',postroleassign,(req, res) => {});
AdminRoles_assign_Route.get('/api/admin/rolesassign/checkrole/:uid',getroleid);
AdminRoles_assign_Route.put('/api/admin/rolesassign/changerole/:uid', putadminrole );
AdminRoles_assign_Route.delete('/api/admin/rolesassign/revokerole/:uid/:roleid',revokeadminroles );

module.exports = {AdminRoles_assign_Route};









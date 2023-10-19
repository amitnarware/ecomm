let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');

let postroleassign = function (req , res) {
    
        const { uid,role_id } = req.body; 
      
        // Insert the new role into the database
        connection.query('INSERT INTO admin_role_assign (uid,role_id) VALUES (?,?)', [uid,role_id ], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create a new role assign' });
          } else {
            res.status(201).json({ message: 'New role assign created successfully' });
          }
        });
      };
    
      let getroleid = function (req , res) {
        // app.get('/api/admin/roles/viewroles', (req, res) => {
        
           connection.query('SELECT role_id FROM admin_role_assign', (err, results) => {
             if (err) {
               console.error(err);
               res.status(500).json({ error: 'Failed to retrieve  assign roles' });
             } else {
               res.status(200).json(results);
             }
           });
         };


         //app.put('/api/admin/changerole/:uid',
         let putadminrole = function  (req, res)  {
            const { uid } = req.params;
            const {roleid } = req.body;
          
            
            const updateQuery = 'UPDATE admin_role_assign SET role_id = ? WHERE uid = ?';
          
            connection.query(updateQuery, [roleid, uid], (err, result) => {
              if (err) {
                console.error('Error updating admin user role: ' + err.message);
                res.status(500).json({ message: 'Error updating admin user role' });
              } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'User not found' });
              } else {
                res.status(200).json({ message: 'Role changed successfully' });
              }
              console.log(result)
            });
          };

           let revokeadminroles = function (req, res) {
          //app.delete('/api/admin/roleassign/revokerole/:uid/:roleid'
            const { uid, role_id } = req.params;
          
            // Delete the record from the database to revoke the role from the user
            const deleteQuery = 'DELETE FROM admin_roles_assign WHERE uid = ? AND role_id = ?';
          
            db.query(deleteQuery, [uid, role_id], (err, result) => {
              if (err) {
                console.error('Error revoking role from admin_role_assign: ' + err.message);
                res.status(500).json({ message: 'Error revoking role from user' });
              } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'User or role not found' });
              } else {
                res.status(200).json({ message: 'Role revoked successfully' });
              }
            });
          };


         module.exports = {postroleassign,getroleid, putadminrole,revokeadminroles }
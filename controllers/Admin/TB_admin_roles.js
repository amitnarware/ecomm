let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');


let postnewrole = function (req , res) {
//app.post('/api/admin/roles/newrole', (req, res) => {
    const { role_id,rolename } = req.body; // Assuming the role name is in the request body
  
    // Insert the new role into the database
    connection.query('INSERT INTO tbl_admin_roles (role_id,rolename) VALUES (?,?)', [role_id,rolename], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new role' });
      } else {
        res.status(201).json({ message: 'New role created successfully' });
      }
    });
  };

  let patchRole = function (req, res) {
    const { roleid } = req.params;
    const { rolename } = req.body;
  
    if (!roleid || !rolename) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }
  
    // Update the role in the database based on role_id
    connection.query(
      'UPDATE tbl_admin_roles SET rolename = ? WHERE role_id = ?',
      [rolename, roleid],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to update the role' });
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Role not found' });
          } else {
            res.status(200).json({ message: 'Role updated successfully' });
            console.log(result);
          }
        }
      }
    );
  };
  
  
  

  let getroles = function (req , res) {
 // app.get('/api/admin/roles/viewroles', (req, res) => {
    // Retrieve all roles from the database
    connection.query('SELECT role_id,rolename FROM tbl_admin_roles', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve roles' });
      } else {
        res.status(200).json(results);
      }
    });
  };

  module.exports = {postnewrole,patchRole,getroles}
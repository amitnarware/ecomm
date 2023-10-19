let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');

let postproduct_category = function (req , res) {
    //app.post('/api/admin/roles/newrole', (req, res) => {
        const { pcategoryid,categoryname } = req.body; // Assuming the role name is in the request body
      
        // Insert the new role into the database
        connection.query('INSERT INTO admin_product_category (pcategoryid,categoryname) VALUES (?,?)', [pcategoryid,categoryname], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create a new role' });
          } else {
            res.status(201).json({ message: 'New role created successfully' });
          }
        });
      };

      let getproductnames = function (req , res) {
        // app.get('/api/admin/roles/viewroles', (req, res) => {
           // Retrieve all roles from the database
           connection.query('SELECT pcategoryid,categoryname FROM admin_product_category', (err, results) => {
             if (err) {
               console.error(err);
               res.status(500).json({ error: 'Failed to retrieve roles' });
             } else {
               res.status(200).json(results);
             }
           });
         };

         let patchproductid = function (req, res) {
            const { pcategoryid } = req.params;
            const { categoryname } = req.body;
          
            if (!pcategoryid || !categoryname) {
              res.status(400).json({ error: 'Invalid input data' });
              return;
            }
          
            // Update the role in the database based on role_id
            connection.query(
              'UPDATE admin_product_category SET categoryname = ? WHERE pcategoryid = ?',
              [categoryname, pcategoryid],
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

        
         
          // 
          let getcategoryname = function (req, res)  {
            // Extract the categoryname parameter from the request.
            const categoryName = req.params.categoryname;
          
            // Perform a search in the categories array based on the categoryname.
            const categoryFound = categories.find(category => category.categoryname === categoryName);
          
            // Check if the category was found.
            if (categoryFound) {
              // Return the category details as JSON.
              res.json({ category: categoryFound });
            } else {
              // Return a 404 response if the category was not found.
              res.status(404).json({ error: 'Category not found' });
            }
          };

          module.exports = {postproduct_category,getproductnames,patchproductid,getcategoryname}
          
       
          
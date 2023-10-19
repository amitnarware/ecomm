let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');


let addproduct = function (req , res) {
 
        const { pid,pname,subcatid,price,discount,brandname,qty,addedon,lastupdate,photo,regno } = req.body; 

        // Insert the new role into the database
        connection.query('INSERT INTO retailer_products (pid,pname,subcatid,price,discount,brandname,qty,addedon,lastupdate,photo,regno) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [pid,pname,subcatid,price,discount,brandname,qty,addedon,lastupdate,photo,regno ], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create a new role' });
          } else {
            res.status(201).json({ message: 'New role created successfully' });
          }
        });
      };

      let getproductregno = function (req, res){
      
            const regno = req.params.regno;
            const sql = 'SELECT * FROM retailers_products WHERE regno = ?';
          
            connection.query(sql, [regno], (err, results) => {
              if (err) {
                console.error('Error finding user by regno:', err);
                res.status(500).json({ error: 'Unable to find productlist' });
              } else {
                if (results.length === 0) {
                  res.status(404).json({ message: 'productlist not found' });
                  
                } else {
                  console.log('productlist found successfully');
                  res.status(200).json(results);
                }
              }
            });
          };

         
          
          let putupdateprice= function  (req, res)  {
            const { pid } = req.params;
            const {price} = req.body;
          
            
            const updateQuery = 'UPDATE retailer_products SET price = ? WHERE pid = ?';
          
            connection.query(updateQuery, [pid,price], (err, result) => {
              if (err) {
                console.error('Error not update price: ' + err.message);
                res.status(500).json({ message: 'Error updating price' });
              } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'not update price' });
              } else {
                res.status(200).json({ message: 'update successfully' });
              }
              console.log(result)
            });
          };

            
          let putupdatediscount= function  (req, res)  {
            const { pid } = req.params;
            const {discount} = req.body;
          
            
            const updateQuery = 'UPDATE retailer_products SET discount = ? WHERE pid = ?';
          
            connection.query(updateQuery, [pid,price], (err, result) => {
              if (err) {
                console.error('Error not update discount per ' + err.message);
                res.status(500).json({ message: 'Error updating discount per' });
              } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'not update discount' });
              } else {
                res.status(200).json({ message: 'update successfully' });
              }
              console.log(result)
            });
          };

          let putupdateqty= function  (req, res)  {
            const { pid } = req.params;
            const {qty} = req.body;
          
            
            const updateQuery = 'UPDATE retailer_products SET qty = ? WHERE pid = ?';
          
            connection.query(updateQuery, [pid,qty], (err, result) => {
              if (err) {
                console.error('Error not update qty  ' + err.message);
                res.status(500).json({ message: 'Error updating qty' });
              } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'not update qty' });
              } else {
                res.status(200).json({ message: 'update successfully' });
              }
              console.log(result)
            });
          };


          let getallproducts = function (req, res) {
            const query = 'SELECT pid, Pname, Subcatid, Price, Discount, Brandname, Qty, Addedon, Lastupdate, Photo, Regno FROM retailer_products';

            db.query(query, (err, results) => {
              if (err) {
                console.error('Error querying the database: ' + err);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                res.json(results);
              }
            });
          };

          let getallreatiler = function (req, res) {
            // Define the SQL query to count the total number of retailers
            const retailerCountQuery = 'SELECT COUNT(*) AS Retailers FROM retailers_products';
          
            db.query(retailerCountQuery, (err, results) => {
              if (err) {
                console.error('Error querying the database: ' + err);
                res.status(500).json({ error: 'Internal Server Error' });
              } else {
                res.json(results[0]); // Assuming you want to return the count as a JSON object
              }
            });
          };
          
          module.exports = {addproduct ,getproductregno, putupdatediscount,putupdateprice,putupdateqty,getallproducts,getallreatiler}

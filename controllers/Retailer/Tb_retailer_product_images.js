let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');

let addDescription = function (req, res)  {
    // app.post('/api/retailer/productdescription/adddescription'
    const { Imageid, Image, description, color } = req.body;
    const Uploadedon = new Date(); // Set the current date
  
    const query = 'INSERT INTO retailer_product_images (Imageid, Image, Uploadedon, description, color) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [Imageid, Image, Uploadedon, description, color], (err, result) => {
      if (err) {
        console.error('Error inserting data: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Description added successfully' });
      }
    });
  };

  let updatedescription = function (req, res){
   // app.put('/api/updatedescription/:pid)'
    const { description, color } = req.body;
    const pid = req.params.pid;
  
    const query = 'UPDATE retailer_product_images SET description = ?, color = ? WHERE pid = ?';
    connection.query(query, [description, color, pid], (err, result) => {
      if (err) {
        console.error('Error updating data: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Description updated successfully' });
      }
    });
  };

 let viewdescription = function (req, res)  {

    //  app.get('/api/viewdescription/:pid',
    const pid = req.params.pid;
  
    const query = 'SELECT * FROM retailer_product_images WHERE pid = ?';
    connection.query(query, [pid], (err, result) => {
      if (err) {
        console.error('Error querying the database: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(result[0]);
      }
    });
  };
  
let addimage = function  (req, res)  {
    // app.post('/api/retailer/productimages/addnew'
    const { Imageid, Image, description, color } = req.body;
    const Uploadedon = new Date(); // Set the current date
  
    const query = 'INSERT INTO retailer_product_images (Imageid, Image, Uploadedon, description, color) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [Imageid, Image, Uploadedon, description, color], (err, result) => {
      if (err) {
        console.error('Error inserting data: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Product image added successfully' });
      }
    });
  };

   let updateimage = function (req, res) {
    //app.put('/api/retailer/productimage/update/:Imageid
    const { Image, description, color } = req.body;
    const Imageid = req.params.Imageid;
  
    const query = 'UPDATE retailer_product_images SET Image = ?, description = ?, color = ? WHERE Imageid = ?';
    connection.query(query, [Image, description, color, Imageid], (err, result) => {
      if (err) {
        console.error('Error updating data: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Product image updated successfully' });
      }
    });
  };

  let viewimageID = function (req, res)  {
    //  app.get('/api/viewimages/:pid',
    const pid = req.params.pid;
  
    const query = 'SELECT * FROM reatiler_product_images WHERE pid = ?';
    connection.query(query, [pid], (err, result) => {
      if (err) {
        console.error('Error querying the database: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(result);
      }
    });
  };
  

  module.exports = {addDescription,updatedescription,viewdescription,addimage,updateimage,viewimageID}
  
let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');




//  API routes
let postusers = function (req , res) {
//app.post('/api/admin/userregister', (req, res) => {
  const {
    uid,
    name,
    email,
    password,
    mobile,
    photo,
    aadhar,
    date_of_joining,
    qualification,
    date_of_birth,
    address,
    state,
    city,
    pin,
    status
  } = req.body;

  const sql = `INSERT INTO admin_users (uid,name, email, password, mobile, photo, aadhar, date_of_joining, qualification, date_of_birth, address, state, city, pin, status)
                VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    uid,
    name,
    email,
    password,
    mobile,
    photo,
    aadhar,
    date_of_joining,
    qualification,
    date_of_birth,
    address,
    state,
    city,
    pin,
    status
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'User registration failed' });
    } else {
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
};
let getusers = function(req, res){
//app.get('/api/admin/userlist', (req, res) => {
    const sql = 'SELECT * FROM admin_users';
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error retrieving user list:', err);
        res.status(500).json({ error: 'Unable to fetch user list' });
      } else {
        console.log('User list retrieved successfully');
        res.status(200).json(results);
      }
    });
  };
  
  // Route to find admin users by name
  let getusersname = function (req, res){
//app.get('/api/admin/userfind/:name', (req, res) => {
    const userName = req.params.name;
    const sql = 'SELECT * FROM admin_users WHERE name = ?';
  
    connection.query(sql, [userName], (err, results) => {
      if (err) {
        console.error('Error finding user by name:', err);
        res.status(500).json({ error: 'Unable to find user' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: 'User not found' });
          
        } else {
          console.log('User found successfully');
          res.status(200).json(results);
        }
      }
    });
  };

  // Route to update admin user by UID
  let putusers = function(req, res){
//app.put('/api/admin/userupdate/:uid', (req, res) => {
    const userId = req.params.uid;
    const {
      name,
      email,
      password,
      mobile,
      photo,
      aadhar,
      date_of_joining,
      qualification,
      date_of_birth,
      address,
      state,
      city,
      pin,
      status
    } = req.body;
  
    const sql = `
      UPDATE admin_users
      SET 
        name = ?,
        email = ?,
        password = ?,
        mobile = ?,
        photo = ?,
        aadhar = ?,
        date_of_joining = ?,
        qualification = ?,
        date_of_birth = ?,
        address = ?,
        state = ?,
        city = ?,
        pin = ?,
        status = ?
      WHERE uid = ?
    `;
  
    const values = [
      name,
      email,
      password,
      mobile,
      photo,
      aadhar,
      date_of_joining,
      qualification,
      date_of_birth,
      address,
      state,
      city,
      pin,
      status,
      userId
    ];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'User update failed' });
      } else {
        console.log('User updated successfully');
        res.status(200).json({ message: 'User updated successfully' });
      }
    });
  };

 let putstatus = function (req, res) {
  //  '/api/admin/statuschange/:uid
    const uid = req.params.uid;
    const newStatus = req.body.status; // Assuming you're sending the new status in the request body
  
    // Execute a SQL query to update the user's status
    const sql = `UPDATE admin_users SET status = ? WHERE uid = ?`;
  
    db.query(sql, [newStatus, uid], (err, result) => {
      if (err) {
        console.error('Error updating status: ' + err.message);
        res.status(500).send('Error updating status');
      } else {
        res.status(200).json({ message: 'Status updated successfully' });
      }
    });
  };

  
  
module.exports = {postusers,getusers,getusersname,putusers,putstatus}
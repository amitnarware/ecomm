let {connection} = require('../../models/dbconfig')
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
//app.use(bodyParser.json());

// subcategoryController.js


/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

const addsubcategory = function (req, res,) {
  const { pcategoryid, subcategoryid, sub_categoryname, addedon } = req.body;
  
  upload.single('photo')(req, res, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to upload the photo' });
    }

    const photoPath = req.file ? req.file.path : null;

    // Insert the new subcategory into the database
    connection.query(
      'INSERT INTO admin_sub_category (pcategoryid, subcategoryid, sub_categoryname, photo, addedon) VALUES (?,?,?,?,?)',
      [pcategoryid, subcategoryid, sub_categoryname, photoPath, addedon],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to create a new subcategory' });
        } else {
          res.status(201).json({ message: 'New subcategory created successfully' });
        }
      }
    );
  });
};  */


const app = express();


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg'); // Define how the uploaded files will be named
  },
});

const upload = multer({ storage: storage });

// Your route for adding a subcategory with file upload
const addsubcategory = (req, res) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to upload the photo' });
    }

    const { pcategoryid, sub_categoryname, addedon } = req.body;
    const photoPath = req.file ? req.file.path : null;

    // Check if subcategoryid is provided, generate one if not
    const subcategoryid = req.body.subcategoryid || generateUniqueSubcategoryId();

    // Insert the new subcategory into the database
    connection.query(
      'INSERT INTO admin_sub_category (pcategoryid, subcategoryid, sub_categoryname, photo, addedon) VALUES (?,?,?,?,?)',
      [pcategoryid, subcategoryid, sub_categoryname, photoPath, addedon],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to create a new subcategory' });
        } else {
          res.status(201).json({ message: 'New subcategory created successfully' });
        }
      }
    );
  });
};




  
  // Function to generate a unique subcategoryid (You may implement your own logic)
  function generateUniqueSubcategoryId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  



      let getsubcategory = function (req , res) {
        // app.get('/api/admin/roles/viewroles', (req, res) => {
           // Retrieve all roles from the database
           connection.query('SELECT pcategoryid, subcategoryid,sub_categoryname,photo,addedon FROM admin_sub_category', (err, results) => {
             if (err) {
               console.error(err);
               res.status(500).json({ error: 'Failed to retrieve roles' });
             } else {
               res.status(200).json(results);
             }
           });
         };
         let updatesubcategory =  (req, res) => {
            const subcatid = req.params.subcatid;
            const updatedSubcategory = req.body; // Assuming you send the updated subcategory data in the request body
          
            // Update the subcategory in the database
            db.query(
              'UPDATE subcategories SET ? WHERE subcategoryid = ?',
              [updatedSubcategory, subcatid],
              (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Error updating subcategory' });
                } else {
                  res.status(200).json({ message: 'Subcategory updated successfully' });
                }
              }
            );
          };

         let findSubcategoryByName = (subcatname) => {
            return new Promise((resolve, reject) => {
              // Implement the database query to find a subcategory by name
              connection.query(
                'SELECT pcategoryid, subcategoryid, sub_categoryname, photo, addedon FROM admin_sub_category WHERE sub_categoryname = ?',
                [subcatname],
                (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    // Check if a subcategory was found
                    if (results.length > 0) {
                      resolve(results[0]);
                    } else {
                      resolve(null); // Subcategory not found
                    }
                  }
                }
              );
            });
          };

          module.exports = {addsubcategory,getsubcategory,updatesubcategory,findSubcategoryByName}
          
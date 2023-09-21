let express = require('express');
let cors = require ('cors');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());
            //    SWAGGER REQUIRE
const swaggerui = require('swagger-ui-express')
const swaggerJSDoc =  require('swagger-jsdoc');

                   // API ROUTE
const {Adminusers_Router} = require('./Routes/Adminusers_Route');
app.use('/',Adminusers_Router)
               // SWAGGER API DOCUMENTATION
               const option = {
                definition: {
                    openapi: '3.0.0',
                    info: {
                        title: "API documentation by Amit",
                        version: "1.0.0"
                    },
                    servers: [
                        {
                            url:"http://localhost:3200"
                        }
                    ]
                },
                apis: ['./index.js']
            }
            
            const swaggerSpec = swaggerJSDoc(option)
            app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))
                 // SWAGGER API OF ALL TABLES

                 /**
 * @swagger
 *  components:
 *      schema:
 *         bazzar:
 *              type: object
 *              properties:
 *                        uid:
 *                          type: integer
 *                        name:
 *                          type: varchar
 *                        email:
 *                           type: varchar
 *                        password:
 *                          type: int
 *                        mobile:
 *                          type: varchar
 *                        photo:
 *                          type: varchar
 *                        aadhar:
 *                          type: varchar
 *               date_of_joining:
 *                          type: varchar
 *                 qualification:
 *                          type: varchar
 *                   aadhar:
 *                          type: varchar
 *                 date_of_birth:
 *                          type: int
 *                       address:
 *                          type: varchar
 *                         state:
 *                          type: varchar
 *                          city:
 *                          type: varchar
 *                           pin:
 *                          type: varchar
 *                        status:
 *                          type: varchar
 */
  
/**
 * @swagger
 * /api/admin/userlist:
 *  get:
 *      summary: Retrive information about admin_users from the database 
 *      description: This api is used to Retrive all the information about users. 
 *      responses:
 *          200:
 *              description: To test Get method
 */

/**
 * @swagger
 * /api/admin/userfind/:name:
 *  get:
 *      summary: Retrive information about admin_users with name from the database 
 *      description: This api is used to Retrive all the information about users. 
 *      responses:
 *          200:
 *              description: To test Get method
 */

/**
 * @swagger
 * /api/admin/userregister:
 *  post:
 *      summary: Used to update new admin_users registers in under admin information
 *      description: This api is used to insert data into mysql database (users table)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/admin'
 *      responses:
 *          200:
 *              description: Added successfully
 */

/**
 * @swagger
 * /api/admin/userupdate/{uid}:
 *  put:
 *      summary: For Fetch admin_users update information using uid information using ID
 *      description: This api is used to update data into mysql database (users table)
 *      parameters:
 *          - in: path
 *            name: uid
 *            required: true
 *            description: Numeric id is required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/admin'
 *      responses:
 *          200:
 *              description: updated successfully
 */
                      //  server
app.listen(3200, () => {
  console.log(`Server is running on port ${3200}`);
});


let express = require('express');
let cors = require ('cors');

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

// API ROUTE
const {Adminusers_Router} = require('./Routes/Adminusers_Route');
app.use('/',Adminusers_Router)

//  server
app.listen(3200, () => {
  console.log(`Server is running on port ${3200}`);
});


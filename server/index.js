//Packages
const express = require('express');
const cors = require('../node_modules/cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes'); 
const businessRoutes = require('./routes/business.routes');
const locationRoutes = require('./routes/location.routes');
const serviceRoutes = require('./routes/service.routes');
const consultantRoutes = require('./routes/consultant.routes');

const salesRoutes = require("./routes/salesOptimization.routes");

//Imports
require('../node_modules/dotenv').config();
const DbConnection = require('../server/config/dbConnection'); 
const Seeding = require('../server/utilities/seeding.data');

const app = express();
//Middle ware
app.use(cors({origin:process.env.LOCAL_HOST, Credential: true}));
app.use(cookieParser());
app.use(express.json());
//Routes
app.use(`${process.env.BASE_URL}/user`, userRoutes); 
app.use(`${process.env.BASE_URL}/business`, businessRoutes);
app.use(`${process.env.BASE_URL}/location`, locationRoutes);
app.use(`${process.env.BASE_URL}/service`, serviceRoutes);
app.use(`${process.env.BASE_URL}/consultant`, consultantRoutes);

// Route: /api/sales
app.use("/api/sales", salesRoutes);
 
  
app.listen(process.env.PORT_NUM, async () => {
     DbConnection(process.env.DATABASE_URL);
     console.log(`App is running on port ${process.env.PORT_NUM}`);
     if(!(
               await Seeding.User.countDocuments() > 0 && 
               await Seeding.Role.countDocuments() > 0 &&   
               await Seeding.Service.countDocuments() > 0 &&   
               await Seeding.Category.countDocuments() > 0 &&   
               await Seeding.Qualification.countDocuments() > 0 &&   
               await Seeding.Consultant.countDocuments() > 0 
          ) 
     ){ 
        await Seeding.seedDatabase();
     }
});
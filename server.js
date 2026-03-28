const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./src/lib/db');
require('dotenv/config');
const userRoute = require('./src/routes/userRoute');
const productRoute = require('./src/routes/productRoute');
const orderRoute = require('./src/routes/orderRoute');
const adminRoute = require('./src/routes/adminRoute');
const cors = require('cors');



const allowedOrigins = [
  "http://localhost:3001",
  "https://swiggy-clone-jade-ten.vercel.app",
];

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
        callback(null, true);
    }else{
        callback(new Error("Not allowed By Cors"));
    }
  },
  credentials: true,
}));

app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api/admin', adminRoute);

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=> {
    console.log(`Server is runing at port ${PORT}`);
    connectDB();
});


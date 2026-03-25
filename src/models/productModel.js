const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ProductSchema = new mongoose.Schema({
   image:{
    type:String,
    require: true
   },
   name:{
    type:String,
    require: true
   },
   restaurant:{
    type:String,
    require: true
   },
   price:{
    type:Number,
    require: true
   },
   location:{
    type:String,
    require: true
   },
   category:{
    type:String,
    require: true
   },
   foodtype:{
    type:String,
    require: true
   },
   description:{
    type:String,
    require: true
   },
   status:{
    type:String,
    require: true
   }   
},
{timestamps: true}
);

module.exports = mongoose.model('Product',ProductSchema);

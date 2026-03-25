const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    number:{
        type:Number,
        require: true
    },
    password:{
    type:String,
    require: true
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
    }
});

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    console.log('New user from model is working');
  
});


module.exports = mongoose.model('User',UserSchema);
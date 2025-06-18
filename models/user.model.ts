import mongoose, { model, models } from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email:{
        type:String,
        required:true
    }

})

export const User = models.User || model('User' , UserSchema)
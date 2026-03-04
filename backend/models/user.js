const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    gift: String,

    onboarded: { type: Boolean, default: false },
    profile: {
        role: { type: String, enum: ['student', 'teacher', 'other'] },
        specialization: String, 
        institution: String,  
        idNumber: String,
        description: String,  
        photo: String,   
        bio: String,
        location: {
            country: String,
            region: String   
        },
        metadata: {
            age: Number,
            dob: Date,
            discoverySource: String,
            intent: String,
            expectations: String,
            favAi: String,
            smartnessRating: Number
        },
        additionalInfo: Map 
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
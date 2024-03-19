import { Schema, model, models } from "mongoose"
const UserSchema = new Schema({
    clerkId: {type: String, required:true, unique:true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    // phoneNumber: { type: String, required: true},
    photo : {type: String, required: false},
    // aadharCard: {type: String, required: true, unique: true}, //?
    // portfolio: [
    //     {
    //         title: { type: String, required: true },
    //         description: { type: String, required: true },
    //         photos: [{ type: String }],
    //         skills: [{ type: String, required: true }],
    //     },
    // ],
    // availability: { type: String, required: true },
    // ratings: { type: Number, default: 0 },
    // reviews: [
    //     {
    //         clientUsername: { type: String, required: true },
    //         comment: { type: String, required: true },
    //         rating: { type: Number, required: true },
    //         createdAt: { type: Date, default: Date.now },
    //     },
    // ],
    // isAvailable: { type: Boolean, default: true },
})
//either get the existing models || create a new model by using the schema
const User = models.User || model('User', UserSchema)

export default User;
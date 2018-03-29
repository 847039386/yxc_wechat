var mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String },
    create_at: { type: Date, default: Date.now },
})

exports.user =  mongoose.model("user", UserSchema);
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true, maxlength:250, trim: true},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
      },
      passwordHash: { type: String, required: true },
      rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' } ]
})

const User = mongoose.model("User", userSchema)


module.exports = User
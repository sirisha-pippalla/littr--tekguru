const mongoose = require('mongoose');

const ZipcodeSchema = mongoose.Schema({
    zipcode : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("pricing", ZipcodeSchema)
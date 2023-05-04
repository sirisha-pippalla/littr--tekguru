const mongoose = require ('mongoose')
const materialSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    categories:[
        {
            name:{
                type:String,
                required:true
            },
            sizes:[
                {
                    type:String,
                    required:true
                }
            ]
        }
    ]
})

module.exports = mongoose.model("materials", materialSchema);
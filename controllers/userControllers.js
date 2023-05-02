const users = require("../model/userModel")


exports.home = (req, res) => {
    res.send("<h1>Hello siri</h1>")
};

//Fetch all users
exports.getUsers = async(req, res)=>{
    try {
        const userList = await users.find();
        res.status(200).json({
            success:true,
            userList
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

//find user by id
exports.getuser = async (req, res) => {
    try {
      const email = req.body.email;
      const user = await users.findOne({ email });
      if (user) {
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        res.status(404).json({
          success: false,
          user: null,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

//create user
exports.createUser = async (req, res)=>{
    try {
        const { email} = req.body;
        //To check all the details
        if(!email){
            throw new Error("please enter email ")
        }
        const userExists = await users.findOne({email});
        if(userExists){
            throw new Error("Email already Exists")
        }
        const user = await users.create({email})
        res.status(200).json({
            success:true,
            message:"user created successfully",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
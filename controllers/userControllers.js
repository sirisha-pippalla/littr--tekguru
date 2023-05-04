const users = require("../model/userModel");
const transactions = require("../model/transactionsModel");
const orders = require("../model/ordersModel");
const country = require("../model/countryDetailsModel");
const zipcodepricing = require("../model/zipcodePricingModel");
const materials = require("../model/materialModel");
exports.home = (req, res) => {
  res.send("<h1>Hello siri</h1>");
};

//Fetch all users(trail)
exports.getUsers = async (req, res) => {
  try {
    const userList = await zipcodepricing.find();
    res.status(200).json({
      success: true,
      userList,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


//find user by email
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


//get zipcode

exports.getZipCode = async (req, res) => {
  try {
    //get data from pricing in db through zipcode
    const zipcode = req.params.id;
    console.log(zipcode);
    const user = await zipcodepricing.findOne({ zipcode });
    // console.log("USER", user);
    let data = JSON.parse(JSON.stringify(user)); //convert user data to json
    objkeys = Object.keys(data); // [13,15,27, _id, zip_code] from zipcode
    // console.log(objkeys)


    // get all material data from db
    const materialcollection = await materials.find();
    let materialData = JSON.parse(JSON.stringify(materialcollection)); //convert materials data to json
    // console.log(materialData)

    // objkeys = Object.keys(data); // [13,15,27, _id, zip_code] from zipcode
    // // console.log(objkeys)

    //for getting only numbers
    const zipcodeFinalPrice = [];
    for(let i=0; i<objkeys.length; i++){
      if( Number(objkeys[i])){
        zipcodeFinalPrice.push(objkeys[i])
      }
    }
    // console.log(zipcodeFinalPrice) // [13,15,27]
    let finalData;
    
    for(let i=0; i<zipcodeFinalPrice.length; i++){
      // console.log(zipcodeFinalPrice[i])
      let data1 = Object.keys(data[zipcodeFinalPrice[i]]) //all material ids from pricings
      // console.log(data1)

      for(let i =0; i<data1.length; i++) {

        let materialFoundObj = materialData.find((item) => item._id === data1[i])

        if(materialFoundObj) {
          let obj123 = {
            name: materialFoundObj.name
          }
          
          // console.log(materialFoundObj)
            for(let j=0;j<materialFoundObj.categories.length; j++) {
              if(data[zipcodeFinalPrice[i]] == '62dacd6df05cb1c8722ef034') {
                console.log(data[zipcodeFinalPrice[i]])
                console.log(materialFoundObj.categories[j]._id)

              }
              // let currentMaterialKey = data[zipcodeFinalPrice[i]][materialFoundObj.categories[j]._id]
              // console.log(currentMaterialKey);
            }
        }
      }
    }

 

    
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//getting all zipcodes date
exports.getallzip = async (req, res) => {
  try {
    const fetchzipdata = await zipcodepricing.find();
    res.send(fetchzipdata);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

//create user
exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    //To check all the details
    if (!email) {
      throw new Error("please enter email ");
    }
    const userExists = await users.findOne({ email });
    if (userExists) {
      throw new Error("Email already Exists");
    }
    const user = await users.create({ email });
    res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

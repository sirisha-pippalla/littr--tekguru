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
    console.log("USER", user);
    if (user) {
      let pricingObj = JSON.parse(JSON.stringify(user)); //convert user data to json
      

      // get all material data from db
      const materialcollection = await materials.find();
      let materialData = JSON.parse(JSON.stringify(materialcollection)); //convert materials data to json
      console.log("pricingObj", pricingObj)

      //for getting only numbers
      let distRes = [];
      for (let item of materialData) {
        let matId = item._id;
        console.log("MATID: ",matId)
        for (let obj of item.categories) {
          // console.log("obj", obj._id)
          let catId = obj._id;
          console.log("////// over /////");
          let key = 1;
          
          let catArr = [];
          for (let data of obj.sizes) {
            // console.log(data)

            let res = pricingObj[data][matId][catId];
            console.log("RES", item.name, data + "GL. " + obj.name, res);
            let newObj = {
              key: key++ + "",
              name: data + "GL. " + obj.name,
              price: res,
            };
            catArr.push(newObj);
          }
          distRes.push(catArr);
        }
      }

      console.log(distRes);
      if (distRes.length > 0) {
        res.status(200).json({
          success: true,
          materialData: distRes,
          user,
        });
      } else {
        res.status(404).json({
          success: false,
          materialData: [],
        });
      }
    } else {
      res.status(404).json({
        success: false,
        materialData: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      materialData: [],
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

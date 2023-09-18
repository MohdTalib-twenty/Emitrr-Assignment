const User = require("../models/userModels");

const getUserController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user) {
      user.password = undefined;
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      next("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      next("Please provide name for updation");
    } else {
      const user = await User.findByIdAndUpdate(req.user.userId, {
        $set: { name: name },
      });
      res.status(200).send({
        success: true,
        message: "Name updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteUserController = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.user.userId);
    if (result) {
      res.status(200).send({
        success: true,
        message: "user deleted successfully",
      });
    } else {
      next("Something went wrong");
    }
  } catch (error) {
    next(error);
  }
};
const quizController=async(req,res,next)=>{
  try {
    const {sub,difficulty,correct,incorrect,score,result}=req.body;
    if(!sub || !difficulty || !correct || !incorrect || !result || !score){
      return next("Please Enter all fields")
    }
    var user = User.findById(req.user.userId);
    if(user){
      const data = await User.findByIdAndUpdate(req.user.userId,{
        $push:{
          quiz:{
            subject : sub,
            difficulty:difficulty,
            correct:correct,
            incorrect:incorrect,
            marks:score,
            result : result
          }
        }
      },{new:true})
      if(data){
        res.status(201).send({
          success : true,
          message : "Result has been submitted "
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getUserController, updateUserController,deleteUserController,quizController };

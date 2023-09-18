const express = require("express")
const userAuth = require("../middlewares/authMiddleware");
const { getUserController, updateUserController, deleteUserController, quizController } = require("../controllers/userController");

const router = express.Router();



router.get('/getUser',userAuth,getUserController);
router.put('/updateUser',userAuth,updateUserController)
router.delete("/deleteUser",userAuth,deleteUserController)
router.post("/submitResult",userAuth,quizController)



module.exports=router
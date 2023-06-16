import express from "express";

import {registerController,bookController,queryController,sendEmailController,resetPassWordToken,resetPassword,resetPassWordUpdate,getReplyController,sendNotificationController,getNotificationController,loginController,queryListController,userbookListController,userDataController,testController, deleteBookController,userUpdateTaskController,getUserTaskController,deleteTaskController,deleteUserTaskController,forgotPasswordController,addUserTaskController,usertaskListController,bookListController,updateProfileController,updateTaskController,registerListController,taskListController,addTaskController,updateStatusController} from '../controllers/authController.js'
import {requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";
//route object
const router = express.Router()
//routing
//Register || method -post
router.post('/register',registerController);

//LOGIN _POST
router.post('/login',loginController);
router.post('/query',queryController);
router.post('/issuebook',bookController);
router.post('/addtasks',addTaskController);
router.post('/send-notification',sendNotificationController)
router.post('/send-email',sendEmailController)
router.post('/useraddtasks',addUserTaskController);
//Forgot Password -post
router.post('/forgot-password',forgotPasswordController)

//test route
router.get('/test',requireSignIn,isAdmin,testController);
router.get('/notification/:receiver',getNotificationController)
router.get('/reply/:email',getReplyController)
router.get('/booklist',bookListController);
router.get('/userdata',userDataController);
router.get('/taskslist',taskListController);
router.get('/querylist',queryListController);
router.get('/usertaskslist',usertaskListController);
router.get("/usertasks/:email",getUserTaskController);
router.get('/booklist/:fname',userbookListController);
router.get('/registerlist',registerListController);
//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
//
/* router.get("/home",requireSignIn,(req,res)=>{
    res.sendStatus(200);
    
}) */
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
router.put("/update-tasks",updateTaskController);
router.put("/update-status/:id",updateStatusController);
router.put("/userupdatetasks",userUpdateTaskController);
router.put("/updateprofile",updateProfileController);
router.delete("/deletetasks/:id", deleteTaskController);
router.delete("/deleteusertasks/:id", deleteUserTaskController);
router.delete("/deletebook/:id",deleteBookController);
//node -mailer--
router.post("/reset-password", resetPassword);
//node-mailer---check
router.get("/reset-password/:id/:token", resetPassWordToken);
////node-mailer---update password
router.post("/reset-password/:id/:token", resetPassWordUpdate);
export default router;



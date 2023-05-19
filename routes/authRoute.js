import express from "express";
import {registerController,bookController,queryController,loginController,testController, userUpdateTaskController,deleteTaskController,deleteUserTaskController,forgotPasswordController,addUserTaskController,usertaskListController,bookListController,updateProfileController,updateTaskController,registerListController,taskListController,addTaskController} from '../controllers/authController.js'
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
router.post('/useraddtasks',addUserTaskController);
//Forgot Password -post
router.post('/forgot-password',forgotPasswordController)

//test route
router.get('/test',requireSignIn,isAdmin,testController);
router.get('/booklist',bookListController);
router.get('/taskslist',taskListController);
router.get('/usertaskslist',usertaskListController);
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
router.put("/userupdatetasks",userUpdateTaskController);
router.put("/update-profile",updateProfileController);
router.delete("/deletetasks/:id", deleteTaskController);
router.delete("/deleteusertasks/:id", deleteUserTaskController);
export default router;



import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { userLogin, userLogout, userProfile, userRegistration } from "../controllers/user.controllers.js";

const router = Router()

router.route("/register").post(upload.single("profilePic"),userRegistration)
router.route("/login").post(userLogin)
router.route("/logout").get(userLogout)
router.route("/profile").get(userProfile)

export { router as userRouter}
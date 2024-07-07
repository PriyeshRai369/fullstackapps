import { fileUpload } from "../middlewares/cloudinary.js";
import { reactUser } from "../models/user.model.js";

async function userRegistration(req, res) {
    const { username, email, fullname, password } = req.body;
    if (!username || !email || !fullname || !password) {
        return res.status(500).json({ error: "All fields are required" });
    }
    try {
        const existingUser = await reactUser.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(500).json({ error: "User already exists" });
        }

        // const profilePicPath = req.file.path;
        const profilePicPath = req.file ? req.file.path : null;
        const profilePicture = await fileUpload(profilePicPath);
        // console.log(profilePicPath);
        // console.log(profilePicture);

        const user = await reactUser.create({
            username,
            email,
            fullname,
            password,
            profilePic: profilePicture.url,
        });

        const isUserCreated = await reactUser.findById(user._id).select("-password");

        if (!isUserCreated) {
            return res.status(500).json({ error: "User not created" });
        }


        return res.status(201).json({ message: 'User registered successfully', user: isUserCreated });

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}


async function userLogin(req, res) {
    const { username, email, password } = req.body;

    if (!(email || username)) {
        return res.status(400).json({ error: "Username or email is required" });
    }

    const user = await reactUser.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (!user) {
        return res.status(404).json({ error: "User not found with this username or email" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: "Password is not correct" });
    }

    const loggedInUser = await reactUser.findById(user._id).select("-password");
    // const options = { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 };

    return res.status(200)
        // .cookie('userID', user._id.toString(), options)
        .json({ user: loggedInUser });
}


async function userLogout(req, res) {
    const options = { httpOnly: true, secure: true };
    const cookId = req.cookies.userID;
    // console.log(cookId);
    if (!cookId) {
        return res.status(400).json({ message: "No User Is login" })
    }
    return res.status(200)
        .clearCookie('userID', options)
        .json({ message: "User logged out" });
}


async function userProfile(req, res) {
    const userID = req.cookies.userID;
    // console.log(userID);
    if (!userID) {
        return res.status(400).json({ message: "No user Found You Have To Login First" });
    }

    try {
        const user = await reactUser.findById(userID).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({userInfo:user });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({ message: "Server error" });
    }
}


export { userRegistration, userLogin, userLogout, userProfile }
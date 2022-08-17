import User from "../models/User";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (!name)
      return res.status(404).json("Please enter a name, name is required!");

    if (!password || password.length < 6) {
      return res.status(404).json("Please enter A proper password");
    }
    if (!secret) {
      return res.status(404).json("Please enter a secret, secret is required!");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(404).json("email has been used before");
    }
    const hasedPW = await hashPassword(password);

    const user = new User({ name, email, password: hasedPW, secret });
    try {
      await user.save();
      return res.json({
        ok: true,
      });
    } catch (error) {
      console.log("Register failed", error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  //gen JWT and send it to front end
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    // check if our db has user with input email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("No user found");
    }

    //if found check for password
    const match = await comparePassword(password, user.password);

    // if not match
    if (!match) return res.status(400).send("Wrong Password!");

    // create signed JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //to not mess around with PW, Secret from user
    user.password = undefined;
    user.secret = undefined;

    // if success
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("error, try again");
  }
};

export const currentUser = async (req, res) => {
  //send token in headers using POSTMAN or INSOMNIA
  //verify token using expressJWT
  //if verified you get a user ID from that token
  // based on the user id find htat user
  // if found send OK

  try {
    const user = await User.findById(req.user._id);
    //res.json(user);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

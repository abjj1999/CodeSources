import User from "../models/User";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
// import { nanoid } from "nanoid";
// import { v4 as uuidv4 } from "uuid";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 6 });

export const register = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (!name)
      return res.json({
        error: "Please enter a name, name is required!",
      });

    if (!password || password.length < 6) {
      return res.json({
        error: "Please enter A proper password",
      });
    }
    if (!secret) {
      return res.json({
        error: "Please enter a secret, secret is required!",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email has been used before",
      });
    }
    const hasedPW = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hasedPW,
      secret,
      username: uid(),
    });
    try {
      await user.save();
      console.log(user);
      return res.json({
        ok: true,
      });
    } catch (error) {
      console.log("Register failed", error);
      return res.json({
        error: "Something went wrong, try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Something went wrong, try again.",
    });
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
      return res.json({
        error: "No user found",
      });
    }

    //if found check for password
    const match = await comparePassword(password, user.password);

    // if not match
    if (!match)
      return res.json({
        error: "Wrong Password!",
      });

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

export const forgotPW = async (req, res) => {
  // console.log(req.body);

  const { email, newPassword, secret } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.json({
      error: "New passward is required and should be more than 6",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We can not verify you with those details",
    });
  }

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats, now you can log in with new password!!",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Something went wrong, try again.",
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    // console.log(req.body);
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: "Password is required and must be 6 chars long",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }
    if (req.body.image) {
      data.image = req.body.image;
    }
    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
    console.log(user);
    user.password = undefined;
    user.secret = undefined;

    res.json(user);
  } catch (error) {
    if (error.code == 11000) {
      return res.json({ error: "username taken!" });
    }
    console.log(error);
  }
};

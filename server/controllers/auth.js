import User from "../models/User";
import { hashPassword, comparePassword } from "../helpers/auth";
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

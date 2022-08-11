import User from "../models/User";

export const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

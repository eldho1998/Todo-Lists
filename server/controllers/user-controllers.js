const User = require('../db/models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Get user
module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ message: 'Get all users', user });
  } catch (error) {
    console.error('Error finding users', error);
    res.status(500).json({ message: 'Error finding users' });
  }
};

// 2. Sign up user

module.exports.userSignup = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res
        .status(403)
        .json({ message: 'Email already used..Try another one' });
    }

    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: 'Passwords not matching!' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);
    const hashedConfirmPassword = await bcrypt.hash(body.confirmPassword, 2);
    body.password = hashedPassword;
    body.confirmPassword = hashedConfirmPassword;

    const newUser = await User.create(body);
    return res
      .status(201)
      .json({ message: 'Thank you for Signing in', newUser });
  } catch (e) {
    return res.status(500).json({ message: 'Error signing in' });
  }
};

// 2. Login User

module.exports.loginUser = async (req, res) => {
  try {
    const body = req.body;

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ message: 'Email or Password incorrect!' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(403).json({ message: 'Email or Password Incorrect!' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: 'USER',
      },
      process.env.USERKEY,
      {
        expiresIn: '365d',
      }
    );

    return res
      .status(200)
      .json({ message: 'Login Success', token, id: user._id });
  } catch (e) {
    return res.status(500).json({ message: 'Error Logging in', e });
  }
};

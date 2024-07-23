import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  console.log("registerrrr")
  const { name, email, password, phone } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' }); // Generic error message for security
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        console.log("hit")
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Include user data in response
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
      res.status(200).json({ token, user: { name: user.name, email: user.email, id: user._id, phone: user.phone } }); // Send relevant user data
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' }); // Generic error message for security
    }
  };
  
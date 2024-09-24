import User from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.status(200).json({token});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email: email, role: role });
  
    if (!user || await bcrypt.compare(password, user.password)) {
      return res.status(201).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, id: user._id }, role });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getUsersList = async (req, res) => {
  const { email, role } = req.params;
  try {
    const user = await User.findOne({ email: email, role: role }).select('-password');
    if(user) {
      res.status(200).json({user});
    }
    else {
      res.status(201).json({message: "User does not exist"});
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  const { phone, address1, address2, name, postcode, email, role } = req.body;
  try {
    const user = await User.findOne({ email: email, role: role });
    if(user) {
      const filter = { _id: user._id }; // E.g., search by _id
      const update = {
        $set: { name: name, address1: address1, address2: address2, postcode: postcode, phone: phone }  // Fields you want to update
      };
      const result = await User.updateOne(filter, update);
      if(result.matchedCount == 1) {
        res.status(200).json({message: "Profile updated successfully", name: name, email: email, updated: 1});
      }
      else {
        res.status(201).json({message: "Error updating profile", updated: 0});
      }
    }
    else {
      res.status(201).json({message: "User does not exist"});
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
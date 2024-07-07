import * as userService from '../services/userService.js';

export const userProfile = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const user = await userService.profile(userEmail);
    res.json(user);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message });
    } 
    else {
      next(error);
    }
  }
}

export const registerUser = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'Email already in use') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json(user);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const updateUserEmail = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const userId = req.user.id;
    const { newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).json({ message: 'New email is required' });
    }

    const updatedUser = await userService.updateEmail(userId,userEmail, newEmail);
    res.json(updatedUser);
  } catch (error) {
    if (error.message === 'Email already in use') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const result = await userService.remove(userEmail);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};
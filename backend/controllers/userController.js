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
    const { email, password } = req.body;
    const user = await userService.register({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    if (error.message === 'Email already in use') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An error occurred during registration' });
    }
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json(result);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await userService.clearRefreshToken(userId);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'An error occurred during logout' });
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


export const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await userService.refreshUserToken(refreshToken);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};


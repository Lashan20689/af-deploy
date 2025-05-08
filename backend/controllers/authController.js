const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Validate environment configuration
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
}

// Registration controller
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Username and password are required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }
  if (password.length > 72) {
    return res.status(400).json({ message: "Password cannot exceed 72 characters." });
  }

  try {
    // Case-insensitive username check
    const existingUser = await User.findOne({ 
      username: username.toLowerCase().trim() 
    });
    
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Create new user
    const newUser = new User({
      username: username.toLowerCase().trim(),
      password: hashedPassword
    });

    await newUser.save();

    // Success response
    res.status(201).json({
      message: "User registered successfully.",
      userId: newUser._id
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      message: "Failed to register user.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Find user (case-insensitive)
    const user = await User.findOne({ 
      username: username.toLowerCase().trim() 
    });

    // Validate credentials
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username 
      },
      SECRET,
      { expiresIn: '1h' }
    );

    // Set secure HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    // Response with user data (exclude sensitive info)
    res.json({
      message: "Login successful",
      userId: user._id,
      username: user.username
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Login failed.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const Model = require("../models/signinModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { options } = require("../routes/route");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require("dotenv").config();
const OtpVerification = require("../models/OtpVerificationModel")
const {
  generateEmailTemplate,
  css,
} = require("../Controllers/GenerateEmailTemplate");
const juice = require("juice");
const { sendEmail } = require("../Controllers/SendEmail");
exports.signUpData = async (req, res) => {
  try {
    const {
      email,
      password,
      mobileNumber,
      cnicNumber,
      fullName,
      fatherName,
      optionalMobileNumber,
      gender,
      kinName,
      kinCnic,
      kinMobileNumber,
      kinAnotherNumber,
      secondkinName,
      secondkinCnic,
      secondkinMobileNumber,
      secondkinAnotherNumber,
    } = req.body;

    // Check if required fields are filled
    if (!fullName || !password || !cnicNumber || !mobileNumber) {
      return res.status(406).json({
        success: false,
        message: "* Fields must be filled",
      });
    }

    // Validate CNIC format
    const validateCNICFormat = (cnic) => /^[0-9]{5}-[0-9]{7}-[0-9]$/.test(cnic);
    if (!validateCNICFormat(cnicNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid CNIC format",
      });
    }

    // Validate password format
    const validatePasswordFormat = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    if (!validatePasswordFormat(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 1 uppercase letter and 1 digit",
      });
    }

    // Check if email or mobile number already exists
    const existingUser = await Model.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already taken",
      });
    }

    const existingUserfromPhoneNumber = await Model.findOne({ mobileNumber });
    if (existingUserfromPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already taken",
      });
    }

    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Model.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "User", // Assigning the role here
      mobileNumber,
      cnicNumber,
      fullName,
      fatherName,
      optionalMobileNumber,
      gender,
      kinName,
      kinCnic,
      kinMobileNumber,
      kinAnotherNumber,
      secondkinName,
      secondkinCnic,
      secondkinMobileNumber,
      secondkinAnotherNumber,
    });
console.log(newUser);
    // Generate token
    const payload = {
      email: newUser.email,
      _id: newUser._id,
      role: newUser.role, // Use the assigned role
      fullName: newUser.fullName,
      mobileNumber: newUser.mobileNumber,
      cnicNumber: newUser.cnicNumber,
      fatherName: newUser.fatherName,
      optionalMobileNumber: newUser.optionalMobileNumber,
      gender: newUser.gender,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2y" });

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      httpOnly: true,
    };

    // Set the token as a cookie
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error.message); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};








exports.login = async (req, res) => {
  try {
    const { email, password, otp_value } = req.body;
    console.log(req.body);
    let user = await Model.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your email or password is incorrect",
      });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Your email or password is incorrect",
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Your account is inactive. Please contact admin.",
      });
    }

    // For members, create token and send response
    if (user.role === "Member") {
      const payload = {
        email: user.email,
        _id: user._id,
        role: user.role,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        cnicNumber: user.cnicNumber,
        fatherName: user.fatherName,
        optionalMobileNumber: user.optionalMobileNumber,
        gender: user.gender,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2y" });

      user = user.toObject();
      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        data: user,
        message: "User logged in successfully",
      });
    }

    // For users that require OTP verification
    if (!otp_value) {
      const otp = generateOTP(6);

      await OtpVerification.findOneAndUpdate(
        { email: email.toLowerCase() },
        { otp },
        { new: true, upsert: true }
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: {
          name: 'Invest Bachat',
          address: process.env.EMAIL_USER,
        },
        to: [email],
        subject: "Your OTP for Invest Bachat",
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      };

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Email sent successfully",
          });
        }
      });
    } else {
      const isOtpValid = await OtpVerification.findOne({
        email: email.toLowerCase(),
        otp: otp_value,
      });

      if (!isOtpValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      // If user role is "User", update it to "Member"
      if (user.role === "User") {
        user = await Model.findOneAndUpdate(
          { email: email.toLowerCase() },
          { $set: { role: "Member" } },
          { new: true }
        );
      }

      const payload = {
        email: user.email,
        _id: user._id,
        role: user.role, // Either "Member" or the existing role
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        cnicNumber: user.cnicNumber,
        fatherName: user.fatherName,
        optionalMobileNumber: user.optionalMobileNumber,
        gender: user.gender,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2y" });

      user = user.toObject();
      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        data: user,
        message: "User logged in successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Helper function to generate OTP
function generateOTP(length) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 9) + 1; // Generate a number from 1 to 9
  }
  return otp;
}





exports.removeUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Model.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    console.error('Error removing user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
 // return res.status(200).json({ message: 'User removed successfully' });
};




// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(406).json({
//         success: false,
//         message: "Fill all the fields",
//       });
//     }

//     let user = await Model.findOne({ email: email.toLowerCase()  });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Your email or password is incorrect",
//       });
//     }


//     const payload = {
//       email: user.email,
//       _id: user._id,
//       role: user.role,
//       fullName: user.fullName,
//       mobileNumber: user.mobileNumber,
//       cnicNumber: user.cnicNumber,
//       fatherName: user.fatherName,
//       optionalMobileNumber: user.optionalMobileNumber,
//       gender: user.gender,
//     };

//     if (await bcrypt.compare(password, user.password)) {
//       let token = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "2y",
//       });
//       user = user.toObject();
//       user.password = undefined;
//       user.token = token;
//       const options = {
//         expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set cookie time for 30 days
//         httpsOnly: true,
//       };
//       if (!user.isActive) {
//         return res.status(400).json({
//           success: false,
//           message: "Your account is inactive please contact admin administrator",
//         });
//       }
//       res.cookie("token", token, options).status(200).json({
//         success: true,
//         token,
//         data: user,
//         message: "User logged in successfully ",
//       });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "Your email or password is incorrect",
//       });
//     }


//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };








exports.resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, password, confirmPassword } = req.body;

    // Validate request body
    if (!email || !oldPassword || !password || !confirmPassword) {
      return res.status(406).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user by email
    let user = await Model.findOne({ email: email.toLowerCase() });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify old password
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email, cnicNumber, password, confirmPassword, otp_value } = req.body;

    // Validate request body
    if (!email || !cnicNumber || !password || !confirmPassword) {
      return res.status(406).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    // Check if the email and CNIC number match
    const user = await Model.findOne({ email: email.toLowerCase(), cnicNumber });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Check Your email and CNIC number",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // If no OTP value is provided, generate and send OTP
    if (!otp_value) {
      const otp = generateOTP(6); // OTP generation function

      // Store OTP for verification, upsert into the collection (create or update)
      await OtpVerification.findOneAndUpdate(
        { email: email.toLowerCase() },
        { otp },
        { new: true, upsert: true }
      );

      // Set up nodemailer for OTP email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      });

      // Send the OTP to the user's email
      const mailOptions = {
        from: {
          name: 'Invest Bachat',
          address: process.env.EMAIL_USER,
        },
        to: [email],
        subject: "Your OTP for Password Reset",
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      };

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email.",
          });
        }
      });
    } else {
      // Verify the OTP
      const isOtpValid = await OtpVerification.findOne({
        email: email.toLowerCase(),
        otp: otp_value,
      });

      if (!isOtpValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Respond with success message
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




exports.getAllUsers = async (req, res) => {
  try {
    const users = await Model.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const {userId, newRole} = req.body;
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.role = newRole;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUserIsActive = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    const user = await Model.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.isActive = isActive;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User isActive updated successfully",
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    const { id, newData } = req.body;
    console.log(req.body)
    const user = await Model.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Update user data
    user.fullName = newData.fullName || user.fullName;
    user.mobileNumber = newData.mobileNumber || user.mobileNumber;
    user.cnicNumber = newData.cnicNumber || user.cnicNumber;
    user.fatherName = newData.fatherName || user.fatherName;
    user.optionalMobileNumber = newData.optionalMobileNumber || user.optionalMobileNumber;
    user.gender = newData.gender || user.gender;
    user.kinName = newData.kinName || user.kinName;
    user.kinCnic = newData.kinCnic || user.kinCnic;
    user.kinMobileNumber = newData.kinMobileNumber || user.kinMobileNumber;
    user.kinAnotherNumber = newData.kinAnotherNumber || user.kinAnotherNumber;
    user.kinEmail = newData.kinEmail || user.kinEmail;
    user.secondkinName = newData.secondkinName || user.secondkinName;
    user.secondkinCnic = newData.secondkinCnic || user.secondkinCnic;
    user.secondkinMobileNumber = newData.secondkinMobileNumber || user.secondkinMobileNumber;
    user.secondkinAnotherNumber = newData.secondkinAnotherNumber || user.secondkinAnotherNumber;
    // Save updated user data
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User data updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.findUserByIdForValidation = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Model.findById(id);
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    res.status(500).json({ error: "Server error" });
  }
};

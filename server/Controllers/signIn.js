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
      role,
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
    console.log(req.body)
    // Check if required fields are filled
    if (!fullName || !password || !cnicNumber || !mobileNumber) {
      return res.status(406).json({
        success: false,
        message: "* Fields must be filled",
      });
    }

    // Validate CNIC format
    const validateCNICFormat = (cnic) => {
      const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/; // CNIC format regex
      return cnicRegex.test(cnic);
    };
    if (!validateCNICFormat(cnicNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid CNIC format",
      });
    }

    // Validate password format
    const validatePasswordFormat = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Password format regex
      return passwordRegex.test(password);
    };
    if (!validatePasswordFormat(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 1 uppercase letter and 1 digit",
      });
    }

    // Check if mobile number already exists
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
        message: "mobile number already taken",
      });
    }
    // Create hashed password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await Model.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
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

    // Generate token
    const payload = {
      email: newUser.email,
      _id: newUser._id,
      role: newUser.role,
      fullName: newUser.fullName,
      mobileNumber: newUser.mobileNumber,
      cnicNumber: newUser.cnicNumber,
      fatherName: newUser.fatherName,
      optionalMobileNumber: newUser.optionalMobileNumber,
      gender: newUser.gender,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2y",
    });

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set cookie time for 30 days
      httpOnly: true, // Cookie accessible only by the server
    };

    // Set the token as a cookie
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      data: newUser,
      message: "User Created successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};







exports.login = async (req, res) => {
  try {
    const { email, password , otp_value } = req.body;
    console.log(req.body)
    let user = await Model.findOne({ email: email.toLowerCase()  });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Your email or password is incorrect",
      });
    }

    // Check password before OTP
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Your email or password is incorrect",
      });
    }

    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Your account is inactive please contact admin administrator",
      });
    }

    if (!otp_value) {
      function generateOTP(length) {
        let otp = '';
        for(let i = 0; i < length; i++) {
          otp += Math.floor(Math.random() * 9) + 1; // Generate a number from 1 to 9
        }
        return otp;
      }
      
      const otp = generateOTP(6);
      
      await OtpVerification.findOneAndUpdate(
        { email: email.toLowerCase() },
        { otp },
        { new: true, upsert: true });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: {
          name: 'Invest bachat',
          address: process.env.EMAIL_USER
        }, // sender address
        to: [email],
        subject: "Your OTP for Invest Bachat",
        text: `Your OTP is: ${otp}`,
        html: `<p>Your OTP is: <strong>${otp}</strong></p>`
      }

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
      // Verify the provided OTP here
      const isOtpValid = await OtpVerification.findOne({email: email.toLowerCase(), otp:otp_value});
      console.log(isOtpValid)
      if (!isOtpValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      if (!email || !password) {
        return res.status(406).json({
          success: false,
          message: "Fill all the fields",
        });
      }

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

      if (await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2y",
        });
        user = user.toObject();
        user.password = undefined;
        user.token = token;
        const options = {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set cookie time for 30 days
          httpsOnly: true,
        };
     
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          data: user,
          message: "User logged in successfully ",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Your email or password is incorrect",
        });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
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
    const { email, cnicNumber, password, confirmPassword } = req.body;

    // Validate request body
    if (!email || !cnicNumber || !password || !confirmPassword) {
      return res.status(406).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    // Check if mobile number and CNIC number match
    const user = await Model.findOne({ email: email.toLowerCase(),cnicNumber });
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

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Password Changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

const moment = require("moment");
const nodemailer = require("nodemailer");
const { generateToken } = require("../utils/generateToken");
const { User } = require("../models/User");

const userController = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const confirmCode = Math.floor(Math.random() * 10000);
    const codeExpire = moment().add(89, "seconds");

    const user = new User({
      name,
      email,
      password,
      confirmCode,
      codeExpire,
    });

    await user.save();

    sendConfirmEmail(email, confirmCode);

    res.json({
      message:
        "Registration is successful. Please check your email for verification code.",
    });
  },
  confirmUser: (req, res) => {
    let confirmCode = req.body.confirmCode;
    let email = req.body.email;

    User.findOne({ email: email }).then((user) => {
      if (user.codeCounter == 0) {
        res.status(500).json({ message: "BLOCK!!!" });
      } else {
        if (user.confirmCode == confirmCode) {
          if (user.codeExpire > moment()) {
            const token = generateToken(res, user._id);

            user.isActive = true;
            user.codeCounter = 3;

            user.save();
            res.status(201).json(token);
          } else {
            res.status(500).json({ message: "Expire Date Error!" });
          }
        } else {
          user.codeCounter = user.codeCounter - 1;

          user.save();
          res.status(404).json({
            "Confirm Code Error:!":
              "You have " + user.codeCounter + " rights left",
          });
        }
      }
    });
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      if (!user.isActive && (await user.matchPassword(password))) {
        const confirmCode = Math.floor(Math.random() * 10000);
        const codeExpire = moment().add(89, "seconds");

        user.confirmCode = confirmCode;
        user.codeExpire = codeExpire;

        user.save();

        sendConfirmEmail(email, confirmCode);
        res.status(203).json({
          message:
            "Login is successful. Please check your email for verification code.",
        });
      } else if (await user.matchPassword(password)) {
        const token = generateToken(res, user._id);
        res.json(token);
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  },
  getUserProfile: async (req, res) => {
    const userId = req?.userId;

    try {
      const user = await User.findById(userId)
        .select("-password")
        .populate({
          path: "boards",
          populate: {
            path: "columns",
          },
        });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  },
  forgotPassword: async (req, res) => {
    const email = req.body.email;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json("User not found");
      }

      transporter.sendMail({
        from: "c8657545@gmail.com",
        to: email,
        subject: "Reset Password Link",
        html: `<p>If you want to change your password, click here <a href="http://localhost:5173/changePassword?userId=${user._id}">change your password</a></p>`,
      });

      return res
        .status(200)
        .json(
          "Email sent successfully. To change your password check the email"
        );
    } catch (error) {
      console.log(error);
    }
  },
  // updateUserProfile: async (req, res) => {
  //   let file = req.files?.photo;
  //   const userId = req.params.id;

  //   const user = await User.findById(userId);

  //   if (user) {
  //     const uploadFile = () => {
  //       return new Promise((resolve, reject) => {
  //         if (!file) {
  //           resolve(null);
  //           return;
  //         }

  //         const path = "userProfileImages/" + file.name;

  //         file.mv(path, function (err) {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(path);
  //           }
  //         });
  //       });
  //     };

  //     const imagePath = await uploadFile();

  //     user.name = req.body.name || user.name;
  //     user.email = req.body.email || user.email;

  //     if (imagePath) {
  //       user.profileImage = imagePath;
  //     }

  //     if (req.body.password) {
  //       user.password = req.body.password;
  //     }

  //     const updatedUser = await user.save();

  //     res.json({
  //       _id: updatedUser._id,
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //       isAdmin: updatedUser.isAdmin,
  //     });
  //   } else {
  //     res.status(404);
  //     throw new Error("User not found");
  //   }
  // },

  // changePassword: async (req, res) => {
  //   const { userId, password } = req.body;

  //   try {
  //     const user = await User.findById(userId);

  //     if (!user) {
  //       res.status(404).json("User not found");
  //     }

  //     user.password = password;

  //     await user.save();
  //     res.status(200).json("Password changed successfully");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: "c8657545@gmail.com",
    pass: "bcozssymjajpqicg",
  },
});

function sendConfirmEmail(to, code) {
  transporter.sendMail({
    from: "c8657545@gmail.com", // Sender address
    to: to, // List of receivers
    subject: "Kanban Task Management App - Email Confirmation", // Subject line
    text: "Your confirmation code is: " + code, // Plain text body
  });
}

module.exports = {
  userController,
};

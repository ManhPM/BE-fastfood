const { Account, Customer, Wishlist, Cart } = require("../models");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const createAccountForCustomer = async (req, res) => {
  const { username, password, name, email, phone, address } = req.body;
  try {
    //tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    //mã hoá salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newAccount = await Account.create({
      username,
      id_role: 1,
      password: hashPassword,
    });
    const customer = await Customer.findOne({
      where: {
        email,
      },
    });
    if (customer) {
      customer.id_account = newAccount.id_account;
      await customer.save();

      const newCart = await Cart.create({
        id_customer: customer.id_customer,
      });

      const newWishList = await Wishlist.create({
        id_customer: customer.id_customer,
      });
    } else {
      const newCustomer = await Customer.create({
        id_account: newAccount.id_account,
        name,
        email,
        phone,
        address,
      });
      const newCart = await Cart.create({
        id_customer: newCustomer.id_customer,
      });
      const newWishList = await Wishlist.create({
        id_customer: newCustomer.id_customer,
      });
      res.status(200).json({
        message: "Đăng ký thành công!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Đăng ký thất bại!",
    });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const account = await Account.findOne({
    where: {
      username,
    },
  });
  if (account.id_role != 2) {
    res.status(400).json({ message: "Tài khoản không có quyền truy cập!" });
  } else {
    const isAuth = bcrypt.compareSync(password, account.password);
    if (isAuth) {
      const token = jwt.sign({ username: account.username }, "manhpham2k1", {
        expiresIn: 6 * 60 * 60,
      });
      res
        .status(200)
        .json({
          message: "Đăng nhập thành công!",
          token,
          expireTime: 6 * 60 * 60,
        });
    } else {
      res.status(400).json({ message: "Sai thông tin đăng nhập!" });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const account = await Account.findOne({
    where: {
      username,
    },
  });
  const isAuth = bcrypt.compareSync(password, account.password);
  if (isAuth) {
    const customer = await Customer.findOne({
      where: {
        id_account: account.id_account,
      },
    });
    const token = jwt.sign({ username: account.username }, "manhpham2k1", {
      expiresIn: 60 * 60 * 24,
    });
    res
      .status(200)
      .json({
        message: "Đăng nhập thành công!",
        token,
        userInfo: customer,
        expireTime: 60 * 60 * 24,
      });
  } else {
    res.status(400).json({ message: "Sai thông tin đăng nhập!" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, repeatPassword } = req.body;
  try {
    const accountUpdate = await Account.findOne({
      where: {
        username: req.username,
      },
    });
    const isAuth = bcrypt.compareSync(oldPassword, accountUpdate.password);
    if (isAuth) {
      if (newPassword == repeatPassword) {
        if (newPassword == oldPassword) {
          res.status(400).json({
            message: "Mật khẩu mới không được giống với mật khẩu cũ!",
          });
        } else {
          //tạo ra một chuỗi ngẫu nhiên
          const salt = bcrypt.genSaltSync(10);
          //mã hoá salt + password
          const hashPassword = bcrypt.hashSync(newPassword, salt);
          if (accountUpdate.active == 0) {
            accountUpdate.active = 1;
          }
          accountUpdate.password = hashPassword;
          await accountUpdate.save();
          res.status(200).json({
            message: "Đổi mật khẩu thành công!",
          });
        }
      } else {
        res.status(400).json({
          message: "Mật khẩu lặp lại không đúng!",
        });
      }
    } else {
      res.status(400).json({
        message: "Mật khẩu không chính xác!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Thao tác thất bại!",
    });
  }
};

const logout = async (req, res, next) => {
  res.removeHeader("access_token");
  res.status(200).json({ message: "Đăng xuất thành công!" });
};

const forgotPassword = async (req, res) => {
  const { username } = req.body;
  try {
    const randomID = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    const isExist = await Account.findOne({
      where: {
        forgot: randomID,
      },
    });
    if (isExist !== null) {
      res.status(400).json({
        message: `Có lỗi xảy ra vui lòng thử lại!`,
      });
    } else {
      const account = await Account.sequelize.query(
        "SELECT CU.email FROM customers as CU, accounts as A WHERE A.id_account = CU.id_account AND A.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );
      await Account.sequelize.query(
        "UPDATE accounts SET forgot = :randomID WHERE username = :username",
        {
          type: QueryTypes.UPDATE,
          replacements: {
            randomID: randomID,
            username: username,
          },
        }
      );
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "n19dccn107@student.ptithcm.edu.vn", // generated ethereal user
          pass: "bqztpfkmmbpzmdxl", // generated ethereal password
        },
      });
      // send mail with defined transport object
      await transporter.sendMail({
        from: "n19dccn107@student.ptithcm.edu.vn", // sender address
        to: `${account[0].email}`, // list of receivers
        subject: "FORGOT PASSWORD", // Subject line
        text: "FORGOT PASSWORD", // plain text body
        html: `Mã xác nhận của bạn là: ${randomID}`, // html body
      });
      var s2 = account[0].email;
      var s1 = s2.substring(0, s2.length - 15);
      var s3 = s2.substring(s2.length - 15, s2.length);
      var email = s1 + s3.replace(/\S/gi, "*");
      res.status(200).json({
        message: `Mã xác minh đã được gửi về email: ${email} vui lòng kiểm tra hòm thư!`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const forgotPassword = async (req, res, next) => {
//   const { username } = req.body;
//   const randomID = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
//   try {
//     const account = await Account.sequelize.query(
//       "SELECT CU.email FROM customers as CU, accounts as A WHERE A.id_account = CU.id_account AND A.username = :username",
//       {
//         type: QueryTypes.SELECT,
//         replacements: {
//           username: username,
//         },
//       }
//     );
//     if (account) {
//       await Account.sequelize.query(
//         "UPDATE account SET forgot = :randomID WHERE username = :username",
//         {
//           type: QueryTypes.UPDATE,
//           replacements: {
//             randomID: randomID,
//             username: username,
//           },
//         }
//       );

//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: "n19dccn107@student.ptithcm.edu.vn", // generated ethereal user
//           pass: "bqztpfkmmbpzmdxl", // generated ethereal password
//         },
//       });
//       // send mail with defined transport object
//       let info = await transporter.jsonMail({
//         from: "n19dccn107@student.ptithcm.edu.vn", // sender address
//         to: `${account[0].email}`, // list of receivers
//         subject: "FORGOT PASSWORD", // Subject line
//         text: "FORGOT PASSWORD", // plain text body
//         html: `Mã xác nhận của bạn là: ${randomID}`, // html body
//       });
//       var s2 = account[0].email
//       var s1 = s2.substring(0, s2.length - 15)
//       var s3 = s2.substring(s2.length - 15, s2.length)
//       var email = s1+s3.replace(/\S/gi, '*');
//       res.status(200).json({
//         message: `Mã xác minh đã được gửi về email: ${email} vui lòng kiểm tra hòm thư!`,
//       });
//     } else {
//       res.status(201).json({
//         message: `Không tìm thấy username!`,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const verify = async (req, res, next) => {
  const { verifyID, username } = req.body;
  const account = await Account.findOne({
    where: {
      forgot: verifyID,
      username
    },
    raw: true,
  });
  if (account) {
    res.status(200).json({
      message: `Mã xác nhận chính xác!`,
      isSuccess: true
    });
  } else {
    res.status(400).json({
      message: `Mã xác nhận không chính xác!`,
      isSuccess: false
    });
  }
};

const accessForgotPassword = async (req, res, next) => {
  const { username, password, repeatPassword } = req.body;
    if (password != repeatPassword) {
      res.status(400).json({
        message: `Mật khẩu lặp lại không chính xác!`,
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      //mã hoá salt + password
      const hashPassword = bcrypt.hashSync(password, salt);
      try {
        const accountUpdate = await Account.findOne({
          where: {
            username,
          },
        });
        accountUpdate.password = hashPassword;
        accountUpdate.forgot = 0;
        if (accountUpdate.active == 0) {
          accountUpdate.active = 1;
        }
        await accountUpdate.save();
        res.status(200).json({
          message: `Lấy lại mật khẩu thành công!`,
        });
      } catch (error) {
        res.status(500).json({
          message: `Lấy lại mật khẩu thất bại!`,
        });
      }
    }
};


const updateProfile = async (req, res) => {
  try {
    const {name, phone, address} = req.body
    const account = await Account.findOne({
      where: {
        username: req.username
      }
    })
    await Account.sequelize.query(
      "UPDATE customers SET name = :name, phone = :phone, address = :address WHERE id_account = :id_account",
      {
        replacements: { name: `${name}`, phone: `${phone}`, address: `${address}`, id_account: account.id_account},
        type: QueryTypes.UPDATE,
        raw: true,
      }
    );
    res.status(200).json({message: "Cập nhật thông tin thành công!"})
  } catch (error) {
    res.status(500).json({message: "Cập nhật thông tin thất bại!"})
  }
};

const uploadAvatar = async (req, res) => {
  const {image} = req.body
  try {
    const account = await Account.findOne({
      where: {
        username: req.username
      }
    })
    const update = await Customer.findOne({
      where: {
        id_account: account.id_account
      }
    })
    update.image = image
    await update.save();
    res.status(200).json({message: "Cập nhật ảnh đại diện thành công!"})
  } catch (error) {
    res.status(500).json({message: "Đã có lỗi xảy ra!"})
  }
};

module.exports = {
  // getDetailTaiKhoan,
  login,
  loginAdmin,
  logout,
  createAccountForCustomer,
  uploadAvatar,
  updateProfile,
  // information,
  // create,
  changePassword,
  // edit,
  // logout,
  forgotPassword,
  // getforgot,
  // formlogin,
  verify,
  accessForgotPassword,
};

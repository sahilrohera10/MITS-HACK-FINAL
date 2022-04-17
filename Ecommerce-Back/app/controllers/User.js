"use strict";
const { UserTable, forum } = require("../../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const BaseRepo = require("../Repository/BaseRepository");
const nodemailer = require("nodemailer");

module.exports = {
  Register,
  verifyOtp,
  Forum,
  Getforum,
};

async function Register(req, res, next) {
  try {
    let email = req.body.Email;
    const domain = email.split("@");

    if ("gmail.com" === domain[1]) {
      const salt = await bcrypt.genSalt(10);

      const Secpassword = await bcrypt.hash(req.body.Password, salt);

      const val = Math.floor(1000 + Math.random() * 9000);

      const data = await UserTable.create({
        Email: req.body.Email,
        Name: req.body.Name,
        Password: Secpassword,
        otp: {},
      });

      const otpUpdate = await UserTable.update(
        { Otp: val },
        {
          where: {
            Email: req.body.Email,
          },
        }
      );

      //   const data = {
      //     Name: req.body.Name,
      //     Email: req.body.Email,
      //     Password: Secpassword,
      //   };

      //   const FormedData = await BaseRepo.baseCreate(UsersTable, data);

      console.log("data entered :", data);
      //   res.status(200).json("data sent successfully");
      //   return next();
      // }

      const tranporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "sahilrohera10@gmail.com",
          pass: "ntpdfzxidhwqvppx",
        },
      });

      const mailOptions = {
        from: "sahilrohera10@gmail.com",
        to: req.body.Email,
        subject: "otp for password verification",
        text: `please enter this otp ${val} with your given email id.`,
      };

      tranporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("send");
          res.send("success");
        }
      });

      // console.log("data entered : ", data);

      res.status(200).json("mail sent succesfully");
      return next();
    }
    res.status(400).json("mail id is not valid");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const vOtp = req.body.Otp;
    // const email = req.body.Email;
    console.log("otp entered is : ", vOtp);
    // const DATA = await UserTable.findAll({ where: { Email: email } });
    const DATA = await UserTable.findOne({ where: { Otp: vOtp } });

    console.log("DATA => ", DATA);
    // console.log("DATA.otp => ", DATA.Otp);

    if (DATA) {
      console.log("otp verified");
      res.status(200).json("otp verified successfully");
    } else {
      console.log("otp not verified");
      res.status(200).json("otp not verified");
    }

    return next();
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function Forum(req, res, next) {
  try {
    const data = await forum.create({
      name: req.body.name,
      request: req.body.request,
      //   Password: Secpassword,
      otp: {},
    });

    console.log("DATA => ", data);
    // console.log("DATA.otp => ", DATA.Otp);

    res.status(200).json("Success");

    return next();
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function Getforum(req, res, next) {
  try {
    const data = await forum.findAll();

    console.log("DATA => ", data);
    // console.log("DATA.otp => ", DATA.Otp);

    res.status(200).json({ data });

    return next();
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

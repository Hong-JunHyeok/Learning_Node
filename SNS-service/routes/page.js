const express = require("express");

const router = express.Router();

router.get("/profile", (req, res) => {
  res.render("profile", {
    title: "내 정보 - SNS",
    user: null, //? 추후에 user정보를 넣을 예정.
  });
});

router.get("/join", (req, res) => {
  res.render("join", {
    title: "회원가입 - SNS",
    user: null,
    joinError: req.flash("joinError"), //* 일회성 메세지
  });
});

router.get("/", (req, res, next) => {
  res.render("main", {
    title: "SNS",
    twits: [],
    user: null,
    loginError: req.flash("loginError"),
  });
});

module.exports = router;

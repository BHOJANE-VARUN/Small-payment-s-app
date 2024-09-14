const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User ,Bank} = require("../db");
const JWT_SCRECT = require("../config.js");
const router = express.Router();
const jwtverification = require("../middlewares/userauth.js");

const user = zod.object({
  username: zod.string().min(2).max(30),
  password: zod.string().min(8),
  firstname: zod.string().max(50),
  lastname: zod.string().max(50),
});
router.post("/signup", async (req, res) => {
  const data = req.body;
  const decode = user.safeParse(data);
  const usersfind = await User.findOne({ username: data.username });
  if (!decode.success) {
    return res.status(411).json({
      message: "Invalid input",
    });
  }
  if(usersfind)
  {
    return res.status(411).json({
      message:"Username already exists",
    })
  }
  const newuser = await User.create({
    username: data.username,
    password: data.password,
    firstname: data.firstname,
    lastname: data.lastname,
  });
  const Bankaccount = await Bank.create({
    user_id:newuser._id,
    Balance: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,    
  })
  return res.status(200).json({
    message: "User created successfully",
    user:newuser,
    Bankaccount:Bankaccount,
  });
});

router.post("/signin", async (req, res) => {
  const userfind = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!userfind) {
    return res.status(411).json({
      message: "invalid email or password",
    });
  }
  const token = jwt.sign({ username: req.body.username,userid:userfind._id }, JWT_SCRECT);
  res.json({
    token: `Bearer ${token}`,
  });
});
router.use(jwtverification);
const updatebody = zod.object({
  firstname: zod.string().optional(),
  password: zod.string().optional(),
  lastname: zod.string().optional(),
});
router.put("/update", async (req, res) => {
  const success = updatebody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "invalid input",
    });
  }
  await User.updateOne({ username: req.body.username }, req.body);
  return res.status(200).json({
    message: "User information udpated sccussfully",
  });
});
router.get("/bulk", async (req, res) => {
  const filter = req.headers.filter || "";
  const data = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  const users = data.map((e) => ({
    username: e.username,
    firstname: e.firstname,
    lastname: e.lastname,
    user_id:e._id
  }));
  res.json({
    users: users,
  });
});

module.exports = router;

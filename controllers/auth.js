import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import UserModel from '../model/User.model.js';
import ENV from '../config.js';

const router = express.Router();

// Middleware for verifying user existence
/* router.use(async (req, res, next) => {
  try {
    const { username } = req.method === 'GET' ? req.query : req.body;
    const exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}); */

// POST: http://localhost:8080/api/register
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      password,
      confirmedPassword,

    } = req.body;

    // Check for existing email
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) return res.status(400).send({ error: "Please use a unique Email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmedPassword = await bcrypt.hash(confirmedPassword, 10);

    const user = new UserModel({
      firstName,
      lastName,  
      email,
      mobile,
      password: hashedPassword,
      confirmedPassword: hashedConfirmedPassword,
      
    
    });

    user.save()
      .then(() => res.status(201).send({ msg: "User Registered Successfully" }))
      const token = jwt.sign({  userId: user._id

      }, Process.env.JWT_SECRET, { expiresIn: "24h" });
      return res.status(200).send({
        msg: "Registration Successful...!",
        firstName, lastName, email, mobile, 
        token,
      });
      
      
  } catch (error) {
    return res.status(500).send(error);
  }
});

// POST: http://localhost:8080/api/login
/*router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send({ error: "Username not Found" });

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) return res.status(400).send({ error: "Password does not Match" });

    const token = jwt.sign({
      userId: user._id,
      username: user.username,
    }, ENV.JWT_SECRET, { expiresIn: "24h" });

    return res.status(200).send({
      msg: "Login Successful...!",
      username: user.username,
      token,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// GET: http://localhost:8080/api/user/example123
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username });

    if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

    const { password, ...rest } = user.toJSON();

    return res.status(201).send(rest);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
});

// PUT: http://localhost:8080/api/updateuser
router.put('/updateuser', async (req, res) => {
  try {
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      UserModel.updateOne({ _id: userId }, body, (err) => {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
});

// GET: http://localhost:8080/api/generateOTP
router.get('/generateOTP', async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
});

// GET: http://localhost:8080/api/verifyOTP
router.get('/verifyOTP', async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // Reset the OTP value
    req.app.locals.resetSession = true; // Start session for reset password
    return res.status(201).send({ msg: 'Verify Successfully!' });
  }
  return res.status(400).send({ error: "Invalid OTP" });
});

// GET: http://localhost:8080/api/createResetSession
router.get('/createResetSession', async (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
});

// PUT: http://localhost:8080/api/resetPassword
router.put('/resetPassword', async (req, res) => {
  try {
    if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).send({ error: "Username not Found" });

    const hashedPassword = await bcrypt.hash(password, 10);

    UserModel.updateOne({ username: user.username }, { password: hashedPassword }, (err) => {
      if (err) throw err;
      req.app.locals.resetSession = false; // Reset session
      return res.status(201).send({ msg: "Record Updated...!" });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
});*/

export default router;

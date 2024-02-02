const User = require("../models/User");

//Handle errros
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // Validation erros
  if (err.message.includes("user validation failed")) {
    //console.log("Erros", err);
    Object.values(err.errors).forEach(({ properties }) => {
      //console.log("VAL", val);
      //console.log("Properties", properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.send("user login");
};
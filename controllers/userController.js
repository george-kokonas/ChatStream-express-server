// descr : Register new user
// route : users/register
// req   : POST
const registerUser = (req, res) => {
  res.send({ message: "register user" });
};

// descr : Authenticate user
// route : users/login
// req   : POST
const loginUser = (req, res) => {
  res.send({ message: "login user" });
};

// descr : Get user data
// route : users/myData
// req   : GET
const myData = (req, res) => {
  res.send({ message: "users data" });
};

module.exports = { registerUser, loginUser, myData };

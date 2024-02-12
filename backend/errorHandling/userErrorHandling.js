const handleSignInError = (error) => {
  if (error.message === "username doesnot exist") {
    throw { status: 401, message: "Invalid username" };
  } else if (error.message === "password is not valid") {
    throw { status: 401, message: "Invalid password" };
  } else {
    throw { status: 500, message: "Internal server error" };
  }
};

const handleSignUpError = (error) => {
  if (error.message.includes("unique constraint")) {
    throw { status: 400, message: "Username or email already exists" };
  } else {
    throw { status: 500, message: "Internal server error" };
  }
};

const handlePasswordChangeError = (error) => {
  if (error.message === "email doesnot match") {
    errorMessage = "Email does not match with the provided username";
    throw { status: 400, message: errorMessage };
  } else {
    throw { status: 500, message: "Internal server error" };
  }
};

module.exports = {
  handleSignInError,
  handleSignUpError,
  handlePasswordChangeError,
};

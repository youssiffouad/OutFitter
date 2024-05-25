const handleSignInError = (error) => {
  console.log("here is the error at error handling", error.message);
  if (error.message === "username doesnot exist") {
    return { status: 401, message: "Invalid username" };
  } else if (error.message === "password is not valid") {
    return { status: 401, message: "Invalid password" };
  } else {
    return { status: 500, message: "Internal server error" };
  }
};

const handleSignUpError = (error) => {
  if (error.includes("unique constraint")) {
    return { status: 400, message: "Username or email already exists" };
  } else {
    return { status: 500, message: "Internal server error" };
  }
};

const handlePasswordChangeError = (error) => {
  if (error.message === "email doesnot match") {
    errorMessage = "Email does not match with the provided username";
    return { status: 400, message: errorMessage };
  } else {
    return { status: 500, message: "Internal server error" };
  }
};

module.exports = {
  handleSignInError,
  handleSignUpError,
  handlePasswordChangeError,
};

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import backport from "./backendport";
import { useEffect, useState } from "react";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [valid, setvalid] = useState(true);
  /*
   *** fn to fetch token to verify it is not expired
   */
  const fetchToken = async () => {
    try {
      const payload = { token };
      const response = await fetch(
        `http://localhost:${backport}/user/getToken`,
        {
          method: "POST",
          headers: { authorization: token, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
      setvalid(data.valid);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);
  return valid ? (
    props.children
  ) : (
    <div className="overlay">
      {" "}
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center text-bg-danger">please login first</h1>
        <button
          className="btn bg-body-secondary"
          onClick={() => navigate("/login")}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default ProtectedRoute;

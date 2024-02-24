import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const userlogged = useSelector((state) => state.user.token);
  console.log(userlogged);
  return userlogged ? (
    props.children
  ) : (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center text-bg-danger">please login first</h1>
      <button
        className="btn bg-body-secondary"
        onClick={() => navigate("/login")}
      >
        Go to Login Page
      </button>
    </div>
  );
};

export default ProtectedRoute;
